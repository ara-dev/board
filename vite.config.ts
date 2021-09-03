import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, {AntDesignVueResolver} from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ViteComponents({
            customComponentResolvers: [AntDesignVueResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                'primary-color': '#4338CA',
                javascriptEnabled: true,
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#4338CA',
                        'link-color': '#4338CA',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    cssPreprocessOptions: { //css预处理
        less: {
            modifyVars: {
                'primary-color': '#4338CA',
                'link-color': '#4338CA',
                'info-color': '#4338CA'
            },
            javascriptEnabled: true
        }
    },
})
