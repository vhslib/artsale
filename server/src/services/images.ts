import { unlink } from 'fs/promises'
import path from 'path'
import type { Sharp } from 'sharp'
import sharp from 'sharp'
import { getConfig } from '../config.js'
import { detectMime, execFile } from '../util/promisified.js'
import { createSuperRandomId } from '../util/super-random-id.js'
import { tuple } from '../util/tuple.js'

export async function storeImages(imagesBase64: string[]) {
    const imageNames = await Promise.all(imagesBase64.map(storeImage))

    if (imageNames.some((n) => n === undefined)) {
        return
    }

    return imageNames as string[]
}

async function storeImage(imageBase64: string): Promise<string | undefined> {
    const buffer = Buffer.from(imageBase64, 'base64')
    const format = await getFormat(buffer)

    if (!isAllowed(format)) {
        return
    }

    const originalImg = sharp(buffer)
    const originalMeta = await originalImg.metadata()

    const [bigImg, bigWidth, bigHeight] = createBigImage(originalImg, originalMeta.width!, originalMeta.height!)
    const [mediumImg] = createMediumImage(bigImg, bigWidth, bigHeight)
    const [smallImg] = createSmallImage(bigImg, bigWidth, bigHeight)

    const imageId = createSuperRandomId(15)

    await Promise.all([
        bigImg.toFile(getFileStoragePath(`big-${imageId}.${format}`)),
        mediumImg.toFile(getFileStoragePath(`medium-${imageId}.${format}`)),
        smallImg.toFile(getFileStoragePath(`small-${imageId}.${format}`))
    ])

    await Promise.all([
        convertToWebp(`big-${imageId}`, format),
        convertToWebp(`medium-${imageId}`, format),
        convertToWebp(`small-${imageId}`, format)
    ])

    return imageId + '.webp'
}

async function getFormat(data: Buffer) {
    const mime = await detectMime(data)

    const [_type, subtype] = mime.split('/')

    if (subtype === undefined) {
        throw new Error()
    }

    return subtype
}

function isAllowed(format: string) {
    return ['png', 'jpeg', 'webp'].includes(format)
}

function createBigImage(img: Sharp, width: number, height: number) {
    const THRESHOLD = 1000

    if (width > height && width > THRESHOLD) {
        const newHeight = Math.ceil(THRESHOLD / width * height)
        const newImg = img.clone().resize(THRESHOLD, newHeight)
        return tuple(newImg, THRESHOLD, newHeight)
    }

    if (height > width && height > THRESHOLD) {
        const newWidth = Math.ceil(THRESHOLD / height * width)
        const newImg = img.clone().resize(newWidth, THRESHOLD)
        return tuple(newImg, newWidth, THRESHOLD)
    }

    return tuple(img, width, height)
}

function createMediumImage(img: Sharp, width: number, height: number) {
    const THRESHOLD = 465

    if (width > THRESHOLD) {
        const newHeight = Math.ceil(THRESHOLD / width * height)
        const newImg = img.clone().resize(THRESHOLD, newHeight)
        return tuple(newImg, THRESHOLD, newHeight)
    }

    return tuple(img, width, height)
}

function createSmallImage(img: Sharp, width: number, height: number) {
    const THRESHOLD = 100

    if (width > THRESHOLD) {
        const newHeight = Math.ceil(THRESHOLD / width * height)
        const newImg = img.clone().resize(THRESHOLD, newHeight)
        return tuple(newImg, THRESHOLD, newHeight)
    }

    return tuple(img, width, height)
}

function getFileStoragePath(filename: string) {
    return path.join(getConfig().IMAGE_STORAGE, filename)
}

async function convertToWebp(imageId: string, format: string) {
    const input = getFileStoragePath(imageId + '.' + format)
    const output = getFileStoragePath(imageId + '.webp')
    await execFile('cwebp', [input, '-o', output])
    await unlink(input)
}
