import { generate } from '@ant-design/colors'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { resolve } from 'path'
import * as themeConfig from '../themeConfig'

type GenerateTheme = 'default' | 'dark'

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  })
}

export function initLessVars(dark = false) {
  const palettes = generateAntColors(themeConfig.primaryColor)
  const primary = palettes[5]

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index]
  }

  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/assets/css/var.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    ...themeConfig.lessVars,
  }
}
