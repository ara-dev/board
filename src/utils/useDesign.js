import { namespace } from '../../themeConfig';
export function useDesign(scope) {
    return {
        prefixCls: `${namespace}-${scope}`,
        prefixVar: namespace,
    };
}
//# sourceMappingURL=useDesign.js.map