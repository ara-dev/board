import { namespace } from '../../themeConfig'

export function useDesign(scope: string) {
  return {
    prefixCls: `${namespace}-${scope}`,
    prefixVar: namespace,
  }
}
