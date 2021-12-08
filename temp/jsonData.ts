//extra
//group
//clip , mask

enum Type {
  text,
  image, //*.svg *.png  *.jgp
  path, //shape path
}

/*interface Shape{
}*/

interface children {
  id: string
  type: Type
  x: number
  y: number
  draggable: boolean
  offset_x: number
  offset_y: number
  opacity: number
  rotation: number
  visible: boolean
  locked: boolean
  width: number
  height: number
  border_color: string
  border_size: number
  crop_x: number
  crop_y: number
  crop_width: number
  crop_height: number
  flip_x: boolean
  flip_y: boolean
  //for text
  text: string
  placeholder: string
  font_size: number
  font_family: string
  font_style: string
  font_weight: string
  text_decoration: string
  fill: string //color string
  line_height: number
  letter_spacing: number
  align: string
  stroke_width: number //sample 0
  stroke: string //sample 'black'
  lang: string //sample 'fa|en'
  numeric_type: string //sample 'fa|en'
  //for svg
  colors_replace: object // sample  {"#dd051d": "rgba(236,123,137,1)", "#a60416": "rgba(39,10,13,1)","#fccd1d": "rgba(126,211,33,1)","#f9a215": "rgba(80,227,194,1)"}
  //effect
  blur_enabled: boolean //sample false
  blur_radius: number //sample 10
  brightness_enabled: boolean //sample false
  brightness: number //smaple 0
  sepia_enabled: boolean //sample false
  grayscale_enabled: boolean //sample false
  shadow_enabled: boolean //sample false
  shadow_blur: number //smaple 5
  shadow_offset_x: number //sample 0
  shadow_offset_y: number //sample 0
  shadow_color: string
  selectable: boolean
  show_in_export: boolean
  //only for image
  corner_radius: number
  src: string //sample "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBzdHJva2U9InJnYmEoOTgsIDE5NywgMjU1LCAxKSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiAvPjwvc3ZnPg==",
  path: string // "M 029"
  //clipSrc: "",
  //extra
  //always_on_top: boolean
}

interface page {
  id: string | number
  width: number
  height: number
  name: string
  background: string //color(reg-code-gradiant) or image(src image)
  background_type: string
  print_type: string
  childrens: children[]
}

interface model {
  id: string | number
  author: string | number
  price_per_page: number
  created_at: string
  updated_at: string
  last_modifiy: string
  fonts: []
  pages: page[]
}
