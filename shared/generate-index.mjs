#!/bin/env -S zx --experimental
// @ts-check

import { readdir, stat } from 'fs/promises'

let result = ''

await processDir('./src')

console.log(result)

/**
 * @param {string} dir
 */
async function processDir(dir) {
    const nodes = await readdir(dir)

    for (const node of nodes) {
        const fullPath = `${dir}/${node}`
        const stats = await stat(fullPath)

        if (stats.isDirectory()) {
            await processDir(fullPath)
        }
        else {
            await processFile(fullPath)
        }
    }
}

/**
 * @param {string} file
 */
async function processFile(file) {
    if (file.endsWith('.d.ts')) {
        return
    }

    // file.ts -> file.js
    const withJsExtension = replaceCharAtIndex(file, file.length - 2, 'j')
    result += `export * from '${removeSrcPart(withJsExtension)}'\n`
}

/**
 * @param {string} string
 * @param {number} index
 * @param {string} char
 */
function replaceCharAtIndex(string, index, char) {
    const array = string.split('')
    array[index] = char
    return array.join('')
}

/**
 * @param {string} file
 */
function removeSrcPart(file) {
    // ./src/requests/register.js -> ./requests/register.js

    const segments = file.split('/')
    segments.splice(1, 1)
    return segments.join('/')
}
