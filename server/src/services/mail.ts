import { readFile } from 'fs/promises'
import { template } from 'lodash-es'
import path from 'path'
import type Prisma from '@prisma/client'
import { getConfig } from '../config.js'
import { sendmail } from '../util/promisified.js'

export async function sendEmail(user: Prisma.User, subject: string, html: string) {
    if (getConfig().NODE_ENV === 'development') {
        console.log(`sendEmail (${user.firstName} ${user.lastName}):`)
        console.log(html)
        return true
    }

    try {
        await sendmail({
            from: 'noreply@artsale.ru',
            to: user.email,
            subject,
            html
        })
    }
    catch (e) {
        if (!(e instanceof Error) || !e.message.includes('SMTP')) {
            throw e
        }

        return false
    }

    return true
}

async function loadTemplate<Data extends object>(name: string): Promise<(data: Data) => string> {
    const content = await readFile(path.join('./mail-templates', name + '.html'), 'utf-8')

    return template(content, {
        interpolate: /{{([\s\S]+?)}}/g,
        escape: /{{{([\s\S]+?)}}}/g,
        evaluate: /%%([\s\S]+?)%%/g
    })
}

const templates = {
    confirmation: await loadTemplate<{ user: Prisma.User, code: string }>('confirmation'),
    passwordReset: await loadTemplate<{ user: Prisma.User, code: string }>('password-reset')
}

export function sendEmailWithTemplate<Template extends keyof typeof templates>(user: Prisma.User, subject: string, template: Template, data: Parameters<typeof templates[Template]>[0]) {
    return sendEmail(user, subject, templates[template](data))
}
