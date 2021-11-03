import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import ViteComponents, {
  AntDesignVueResolver,
  VueUseComponentsResolver,
} from 'vite-plugin-components'
import { initLessVars } from './build/initLessVars'

// @ts-ignore
export default defineConfig({
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.ts'],
    alias: {
      '/^~/': '',
      /* '@': resolve(__dirname, './src'),*/
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
      // Relative paths to the directory to search for components.
      dirs: ['src/components', '@icon-park/vue-next'],
      // Valid file extensions for components.
      extensions: ['vue'],
      // Search for subdirectories
      deep: true,
      customComponentResolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
        VueUseComponentsResolver(),
        // example of importing Vant
        /* (name) => {
                    // where `name` is always CapitalCase
                    if (name.startsWith('Icon'))
                        return { importName: name.slice(3), path: 'vant' }
                }*/
      ],
    }),
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
