import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { initLessVars } from './build/initLessVars'

console.log('path.resolve(__dirname, ) ===>', path.resolve(__dirname, 'src'))
export default defineConfig({
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.ts'],
    alias: [
      {
        find: '/^~/',
        replacement: '',
      },
      {
        find: /@b\//,
        replacement: path.resolve(__dirname, 'src') + '/',
      },
      {
        find: /\/~\//,
        replacement: path.resolve(__dirname, 'node_modules') + '/',
      },
    ],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  plugins: [
    // ViteComponents({
    //   // Relative paths to the directory to search for components.
    //   dirs: ['src/components', '@icon-park/vue-next'],
    //   // Valid file extensions for components.
    //   extensions: ['vue'],
    //   // Search for subdirectories
    //   deep: true,
    //   customComponentResolvers: [
    //     AntDesignVueResolver({
    //       importStyle: 'less',
    //     }),
    //     VueUseComponentsResolver(),
    //     // example of importing Vant
    //     /* (name) => {
    //                 // where `name` is always CapitalCase
    //                 if (name.startsWith('Icon'))
    //                     return { importName: name.slice(3), path: 'vant' }
    //         }*/
    //   ],
    // }),
    WindiCSS(),
    vue(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: initLessVars(),
        javascriptEnabled: true,
      },
    },
  },
})
