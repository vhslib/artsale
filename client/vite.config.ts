import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import imagemin from 'vite-plugin-imagemin'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, ssrBuild }) => {
    const plugins: PluginOption[] = []

    plugins.push(viteCommonjs())
    plugins.push(vue())

    if (command === 'build' && ssrBuild === false) {
        plugins.push(ViteWebfontDownload([
            'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
        ]))

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        plugins.push(imagemin())

        plugins.push(compression({
            algorithm: 'brotliCompress',
            ext: 'br',
            threshold: 0,
            filter: /\.(css|js|svg)$/i
        }))

        plugins.push(visualizer({
            brotliSize: true,
            filename: 'dist/bundle-visualizer.html'
        }))
    }

    return {
        plugins,
        server: {
            hmr: {
                port: 3002
            }
        }
    }
})
