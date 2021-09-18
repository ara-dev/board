/*
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
*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import path from 'path'
import ViteComponents, { AntDesignVueResolver,VueUseComponentsResolver } from 'vite-plugin-components'

// @ts-ignore
export default defineConfig({
    resolve: {
        extensions: ['*', '.js', '.vue', '.json', '.ts'],
        alias: {
            '/^~/': '',
            '@': '/src',
            //'~': path.resolve(__dirname, '/node_modules'),
        },
    },
    server: {
        fs: {
            allow: ['..'],
        },
    },
    plugins: [
        ViteComponents({
            customComponentResolvers: [
                AntDesignVueResolver({
                    importStyle: 'less',
                }),
                VueUseComponentsResolver(),
            ],
        }),
        vue(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#4338CA',
                    'link-color': ' #4338CA',
                    //'card-padding-base': '8px',
                    //'border-radius-base': '4px',
                },
                javascriptEnabled: true,
            },
        },
    },
})
