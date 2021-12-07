import { optimize } from 'svgo/lib/svgo'
export function svgo(svg: string) {
  const result = optimize(svg, {
    // optional but recommended field
    path: 'path-to.svg',
    // all config fields are also available here
    multipass: true,
  })
  return result.data
}
