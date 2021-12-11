import { Transform } from 'konva/lib/Util'
// @ts-ignore
import _ from 'lodash'
import { optimize } from 'svgo/lib/svgo'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
import './xml'
interface KonvaFormat {
  attrs: any
  className: string
  children?: KonvaFormat[]
}
interface SVGXMLElement {
  elements?: SVGXMLElement[]
  type?: string
  name?: string
  attributes: any
}
interface LinearGradient {
  svgID: string
  type: string
  gradient: {
    fillLinearGradientStartPoint: any
    fillLinearGradientEndPoint: any
    fillLinearGradientColorStops: any[]
  }
}
interface RadialGradient {
  svgID: string
  type: string
  gradient: {
    fillRadialGradientStartPoint: { x: number; y: number }
    fillRadialGradientEndPoint: { x: number; y: number }
    fillRadialGradientColorStops: any[]
    fillRadialGradientStartRadius: number
    fillRadialGradientEndRadius: number
  }
}

interface Matrix {
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
}

let defs: KonvaFormat[] = []
let gradient: (LinearGradient | RadialGradient)[] = []
let clip_path: KonvaFormat[] = []
let data = null

export function ImportSvg(svg: string): Object {
  //console.log('this is svgo', svgo(svg))
  data = JSON.parse(xmlToJson(svgo(svg)))
  let temp: any = {}
  defs = converDefsToKonvaFormat(data)
  clip_path = converClipPathToKonvaFormat(data)
  gradient = converLinearGradientToKonvaFormat(data)
  gradient = gradient.concat(converRadialGradientToKonvaFormat(data))
  data.elements.forEach((item) => {
    const gItem = generateItem(item)
    if (gItem) temp = Object.assign(temp, gItem)
  })
  //console.log(temp, 'this is temp')
  //console.log(JSON.stringify(stage), 'this is temp json')
  return temp
  //return JSON.stringify(temp)
}

function generateItem(item: SVGXMLElement): KonvaFormat {
  switch (item.name) {
    case 'svg':
      return svg(item)
    case 'path':
      return path(item)
    case 'circle':
      return circle(item)
    case 'text':
      return text(item)
    case 'g':
      return group(item)
    case 'line':
      return line(item)
    case 'polyline':
      return polyline(item)
    case 'ellipse':
      return ellipse(item)
    case 'rect':
      return rectangle(item)
    case 'polygon':
      return polygon(item)
    case 'use':
      return use(item)
    case 'image':
      return image(item)
    default:
      return null
  }
}

function generateName(typeName = '', prefix = 'element'): string {
  let name = ''
  if (prefix != '') {
    name += prefix + '_'
  }
  name += typeName + '_' + useGenerateUniqueID()
  return name
}

function findAllElementByName(svgxml: SVGXMLElement, name: string): SVGXMLElement[] {
  let shape: SVGXMLElement[] = []
  svgxml.elements?.forEach((element) => {
    if (element.name == name) {
      shape.push(element)
    } else {
      if (element.elements) {
        const temp: SVGXMLElement[] = findAllElementByName(element, name)
        shape = shape.concat(temp)
      }
    }
  })
  return shape
}

function converDefsToKonvaFormat(svgxml: SVGXMLElement): KonvaFormat[] {
  const defs = findAllElementByName(svgxml, 'defs')
  const temp: KonvaFormat[] = []
  defs.forEach((element) => {
    element.elements?.forEach((el) => {
      const gItem = generateItem(el)
      if (gItem) temp.push(gItem)
    })
  })
  return temp
}

function converLinearGradientToKonvaFormat(svgxml: SVGXMLElement): LinearGradient[] {
  const linerGradinat = findAllElementByName(svgxml, 'linearGradient')
  const temp: LinearGradient[] = []
  linerGradinat.forEach((element) => {
    temp.push(linearGradient(element))
  })
  return temp
}

function svg(svg: SVGXMLElement) {
  const viewbox = _.get(svg, 'attributes.viewBox', '0 0 300 300').split(' ')
  const width = parseFloat(viewbox[2])
  const height = parseFloat(viewbox[3])
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(svg, 'attributes.id', ''),
      width: width,
      height: height,
      opacity: parseFloat(_.get(svg, 'attributes.opacity', 1)),
      clipX: 0,
      clipY: 0,
      //clipWidth: parseFloat(viewbox[2]),
      //clipHeight: parseFloat(viewbox[3]),
      clipWidth: width,
      clipHeight: height,
      name: 'main_group',
    },
    className: 'Group',
    children: [],
  }

  const background: KonvaFormat = {
    attrs: {
      name: 'background',
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: '#fff',
      preventDefault: false,
      listening: true,
    },
    className: 'Rect',
  }

  const stage: KonvaFormat = {
    attrs: {
      name: generateName('stage', ''),
      //width: width,
      //height: height,
      docWidth: width,
      docHeight: height,
    },
    className: 'Stage',
    children: [],
  }
  const layer: KonvaFormat = {
    attrs: {
      name: 'layer',
    },
    className: 'Layer',
    children: [],
  }
  stage.children?.push(layer)
  if (svg.elements) {
    item.children = []
    item.children.push(background)
    svg.elements?.forEach((element) => {
      const gItem = generateItem(element)
      if (gItem) item.children?.push(gItem)
    })
  }
  layer.children?.push(item)

  return stage
}

function path(path: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Path', 'path', path)
  Object.assign(commonAttr.attrs, {
    data: _.get(path, 'attributes.d', ''),
  })
  return clipPath(path, commonAttr)
}

function circle(circle: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Circle', 'circle', circle)
  Object.assign(commonAttr.attrs, {
    x: parseFloat(_.get(circle, 'attributes.cx', 0)),
    y: parseFloat(_.get(circle, 'attributes.cy', 0)),
    radius: parseFloat(_.get(circle, 'attributes.r', 0)),
  })
  return clipPath(circle, commonAttr)
}

function rectangle(rectangle: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Rect', 'rectangle', rectangle)
  //Object.assign(commonAttr.attrs, {})
  return clipPath(rectangle, commonAttr)
}

function clipPath(element: SVGXMLElement, shape: KonvaFormat): KonvaFormat {
  if (!element.attributes) {
    return shape
  }
  const attr = element.attributes['clip-path']
  if (attr) {
    const id = attr.substring(5, attr.length - 1)
    const clip = clip_path.find((item) => item.attrs.svgID == id)
    if (clip) {
      if (shape.className == 'Group') {
        Object.assign(shape.attrs, {
          name: generateName('group_clip'),
          attr_clip: clip,
        })
      } else {
        const group: KonvaFormat = {
          className: 'Group',
          attrs: {
            name: generateName('group_clip'),
            draggable: true,
            attr_clip: clip,
          },
          children: [shape],
        }
        return group
      }
    }
  }
  return shape
}

function commonAttributes(
  className: string,
  typeName: string,
  element: SVGXMLElement,
): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(element, 'attributes.id', ''),
      name: generateName(typeName),
      draggable: true,
      opacity: parseFloat(_.get(element, 'attributes.opacity', 1)),
    },
    className: className,
  }

  if (!element.attributes) {
    return item
  }

  if (element.attributes?.x) {
    Object.assign(item.attrs, { x: parseFloat(element.attributes.x) })
  }

  if (element.attributes?.y) {
    Object.assign(item.attrs, { y: parseFloat(element.attributes.y) })
  }

  if (element.attributes?.width) {
    Object.assign(item.attrs, { width: parseFloat(element.attributes.width) })
  }

  if (element.attributes?.height) {
    Object.assign(item.attrs, { height: parseFloat(element.attributes.height) })
  }

  if (element.attributes.transform) {
    if (element.attributes.transform.startsWith('matrix')) {
      const matrix: Matrix = decomposeMatrix(element.attributes.transform)
      Object.assign(item.attrs, matrix)
    }

    if (element.attributes.transform.startsWith('translate')) {
      Object.assign(item.attrs, translateToXY(element.attributes.transform))
    }

    if (element.attributes.transform.startsWith('rotate')) {
      Object.assign(item.attrs, rotate(item, element.attributes.transform))
    }
  }

  if (element.attributes['stroke-linecap']) {
    Object.assign(item.attrs, { lineCap: element.attributes['stroke-linecap'] })
  }

  if (element.attributes['stroke-dasharray']) {
    Object.assign(item.attrs, {
      dash: element.attributes['stroke-dasharray'].split(',').map((point) => parseFloat(point)),
    })
  }

  if (element.attributes.fill && element.attributes.fill != 'none') {
    if (element.attributes.fill.startsWith('url')) {
      const key: string = element.attributes.fill.substring(5, element.attributes.fill.length - 1)
      const grd = gradient.find((item) => item.svgID == key)
      if (grd) {
        if (grd.type == 'radial') {
          Object.assign(grd.gradient, {
            fillRadialGradientStartPoint: {
              x: _.get(item, 'attrs.width', 0) / 2,
              y: _.get(item, 'attrs.height', 0) / 2,
            },
            fillRadialGradientEndPoint: {
              x: _.get(item, 'attrs.width', 0) / 2,
              y: _.get(item, 'attrs.height', 0) / 2,
            },
          })
        }
        Object.assign(item.attrs, grd.gradient)
      }
    } else {
      Object.assign(item.attrs, { fill: element.attributes.fill })
    }
  }

  if (!element.attributes.fill) {
    Object.assign(item.attrs, { fill: '#000' })
  }

  if (element.attributes.stroke) {
    Object.assign(item.attrs, { stroke: element.attributes.stroke })
    Object.assign(item.attrs, {
      strokeWidth: parseFloat(_.get(element, 'attributes.stroke-width', 1)),
    })
  }
  return item
}

function ellipse(ellipse: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Ellipse', 'ellipse', ellipse)
  //override common attribute
  Object.assign(commonAttr.attrs, {
    x: parseFloat(_.get(ellipse, 'attributes.cx', 0)),
    y: parseFloat(_.get(ellipse, 'attributes.cy', 0)),
    radiusX: parseFloat(_.get(ellipse, 'attributes.rx', 0)),
    radiusY: parseFloat(_.get(ellipse, 'attributes.ry', 0)),
  })
  return clipPath(ellipse, commonAttr)
}

function text(text: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Text', 'text', text)
  Object.assign(commonAttr.attrs, {
    font_id: null,
    //rotation: 0.642,
    //text: _.get(text, 'elements[0].text', ''),
    //x: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).x,
    // y: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).y,
  })
  let temp_text = ''
  if (text.elements && text.elements.length > 0) {
    if (text.elements[0].type == 'text') {
      temp_text = _.get(text, 'elements[0].text', '')
      Object.assign(commonAttr.attrs, {
        fontFamily: _.get(text, 'attributes.font-family', ''),
        fontSize: parseFloat(_.get(text, 'attributes.font-size', 16)),
        fill: _.get(text, 'attributes.fill', '#000'),
      })
    } else {
      Object.assign(commonAttr.attrs, {
        fontFamily: _.get(text.elements[0], 'attributes.font-family', ''),
        fontSize: parseFloat(_.get(text.elements[0], 'attributes.font-size', 16)),
        fill: _.get(text.elements[0], 'attributes.fill', '#000'),
      })
      text.elements.forEach((item) => {
        temp_text += _.get(item, 'elements[0].text', '')
      })
    }
  }
  Object.assign(commonAttr.attrs, { text: temp_text })
  return clipPath(text, commonAttr)
}

function image(image: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Image', 'image', image)
  const href: string = image.attributes['xlink:href']
  if (href) {
    if (href.startsWith('data')) {
      Object.assign(commonAttr.attrs, { dataSrc: href })
    } else {
      Object.assign(commonAttr.attrs, { href: href })
    }
  }
  if (commonAttr.attrs.fill) {
    delete commonAttr.attrs.fill
  }
  return commonAttr
}

function line(line: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Line', 'line', line)
  Object.assign(commonAttr.attrs, {
    points: [
      parseFloat(_.get(line, 'attributes.x1', 0)),
      parseFloat(_.get(line, 'attributes.y1', 0)),
      parseFloat(_.get(line, 'attributes.x2', 0)),
      parseFloat(_.get(line, 'attributes.y2', 0)),
    ],
  })
  return clipPath(line, commonAttr)
}

function polyline(polyline: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Line', 'polyline', polyline)
  Object.assign(commonAttr.attrs, {
    points: _.get(polyline, 'attributes.points', '')
      .replaceAll(' ', ',')
      .split(',')
      .map((point: string) => parseFloat(point)),
    closed: true,
  })
  return clipPath(polyline, commonAttr)
}

function group(group: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(group, 'attributes.id', ''),
      name: generateName('group'),
      opacity: parseFloat(_.get(group, 'attributes.opacity', 1)),
    },
    className: 'Group',
  }
  if (group.elements) {
    item.children = []
    group.elements.forEach((element) => {
      const gItem = generateItem(element)
      if (gItem) item.children?.push(gItem)
    })
  }
  return clipPath(group, item)
  //return item
}

function polygon(polygon: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Line', 'polygon', polygon)
  Object.assign(commonAttr.attrs, {
    points: _.get(polygon, 'attributes.points', '')
      .replaceAll(' ', ',')
      .split(',')
      .map((point: string) => parseFloat(point)),
    closed: true,
    //fill: 'red',
  })
  return clipPath(polygon, commonAttr)
}

function linearGradient(linear_gradient: SVGXMLElement): LinearGradient {
  const linearGradient: LinearGradient = {
    svgID: _.get(linear_gradient, 'attributes.id', ''),
    type: 'linear',
    gradient: {
      fillLinearGradientStartPoint: {
        x: parseFloat(_.get(linear_gradient, 'attributes.x1', 0)),
        y: parseFloat(_.get(linear_gradient, 'attributes.y1', 0)),
      },
      fillLinearGradientEndPoint: {
        x: parseFloat(_.get(linear_gradient, 'attributes.x2', 0)),
        y: parseFloat(_.get(linear_gradient, 'attributes.y2', 0)),
      },
      fillLinearGradientColorStops: [],
    },
  }
  linear_gradient.elements?.forEach((item: SVGXMLElement) => {
    linearGradient.gradient.fillLinearGradientColorStops.push(
      parseFloat(_.get(item, 'attributes.offset', 0)),
    )
    linearGradient.gradient.fillLinearGradientColorStops.push(
      _.get(item, 'attributes.stop-color', 'black'),
    )
  })
  return linearGradient
}

function converRadialGradientToKonvaFormat(svgxml: SVGXMLElement): RadialGradient[] {
  const radial_Gradient = findAllElementByName(svgxml, 'radialGradient')
  const temp: RadialGradient[] = []
  radial_Gradient.forEach((element) => {
    temp.push(radialGradient(element))
  })
  return temp
}

function radialGradient(radial_gradient: SVGXMLElement): RadialGradient {
  const radialGradient: RadialGradient = {
    svgID: _.get(radial_gradient, 'attributes.id', ''),
    type: 'radial',
    gradient: {
      fillRadialGradientStartPoint: { x: 0, y: 0 },
      fillRadialGradientEndPoint: { x: 0, y: 0 },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndRadius: parseFloat(_.get(radial_gradient, 'attributes.r', 0)),
      fillRadialGradientColorStops: [],
    },
  }
  radial_gradient.elements?.forEach((item: SVGXMLElement) => {
    radialGradient.gradient.fillRadialGradientColorStops.push(
      parseFloat(_.get(item, 'attributes.offset', 0)),
    )
    radialGradient.gradient.fillRadialGradientColorStops.push(
      _.get(item, 'attributes.stop-color', 'black'),
    )
  })
  return radialGradient
}

function converClipPathToKonvaFormat(svgxml: SVGXMLElement): KonvaFormat[] {
  const clip = findAllElementByName(svgxml, 'clipPath')
  const temp: KonvaFormat[] = []
  clip.forEach((element) => {
    element.elements?.forEach((el) => {
      const item = generateItem(el)
      if (item) {
        item.attrs.svgID = _.get(element, 'attributes.id', '')
        temp.push(item)
      }
    })
  })
  return temp
}

function use(use: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Group', 'use', use)
  const href = use.attributes['xlink:href']
  if (href) {
    const id = href.substring(1, href.length)
    const item = defs.find((element) => element.attrs.svgID == id)
    if (item) {
      const clone_obj = _.cloneDeep(item)
      Object.assign(clone_obj.attrs, commonAttr.attrs)
      return clone_obj
    }
  }
  return commonAttr
}

function translateToXY(translate: string) {
  //translate(113.55 395.714)
  const xy = translate.substring(10, translate.length - 1).split(' ')
  return { x: parseFloat(xy[0]), y: parseFloat(xy[1]) }
}

function rotateAroundPoint(
  shape: KonvaFormat,
  angleDegrees: number,
  point: { x: number; y: number },
) {
  const angleRadians = (angleDegrees * Math.PI) / 180 // sin + cos require radians
  const shapeX = _.get(shape, 'attrs.x', 0)
  const shapeY = _.get(shape, 'attrs.y', 0)
  const shapeRotation = _.get(shape, 'attrs.rotation', 0)
  const x =
    point.x +
    (shapeX - point.x) * Math.cos(angleRadians) -
    (shapeY - point.y) * Math.sin(angleRadians)
  const y =
    point.y +
    (shapeX - point.x) * Math.sin(angleRadians) +
    (shapeY - point.y) * Math.cos(angleRadians)
  //shape.position({x: x, y: y});  // move the rotated shape in relation to the rotation point.
  //shape.rotation(shape.rotation()+angleDegrees); // rotate the shape in place around its natural rotation point
  //shape.moveToTop()
  return { position: { x, y }, rotation: shapeRotation + angleDegrees }
}
function rotate(shape: KonvaFormat, rotate: string) {
  const rot = rotate
    .substring(7, rotate.length - 1)
    .split(' ')
    .map((p) => parseFloat(p))
  return rotateAroundPoint(shape, rot[0], { x: rot[1], y: rot[2] })
}
function decomposeMatrix(matrix: string): Matrix {
  const mat = matrix
    .substring(7, matrix.length - 1)
    .split(' ')
    .map((point) => parseFloat(point))
  return new Transform(mat).decompose()
}

function svgo(svg = '') {
  const result = optimize(svg, {
    //multipass: true, // boolean. false by default
    //datauri: 'enc', // 'base64', 'enc' or 'unenc'. 'base64' by default
    /* js2svg: {
      indent: 2, // string with spaces or number of spaces. 4 by default
      pretty: true, // boolean, false by default
    },*/
    plugins: [
      /* {
         name: 'preset-default',
         params: {
           overrides: {
             // customize options for plugins included in preset
             inlineStyles: {
               onlyMatchedOnce: false,
             },
             // or disable plugins
             //removeDoctype: false,
             //convertShapeToPath:false,
             //moveElemsAttrsToGroup:false,
             //moveGroupAttrsToElems:false,
             //mergePaths:false,
             //convertTransform:false,
           },
         },
       },
       {
           name:'convertStyleToAttrs',
           params: {

           }
       },*/
      // enable builtin plugin not included in default preset
      //'prefixIds',
      // enable and configure builtin plugin not included in preset
      {
        name: 'inlineStyles',
        params: {
          onlyMatchedOnce: false,
          /*overrides: {
            // customize options for plugins included in preset
            inlineStyles: {
              onlyMatchedOnce: false,
            },
          },*/
        },
      },
      {
        name: 'sortAttrs',
        params: {
          xmlnsOrder: 'alphabetical',
        },
      },
      {
        name: 'convertStyleToAttrs',
        //active: false,
        /*params: {
         active: true,
        keepImportant: true,
       },*/
      },
      {
        name: 'cleanupAttrs',
      },
      {
        name: 'removeDoctype',
      },
      {
        name: 'removeComments',
      },
      {
        name: 'removeEmptyAttrs',
      },
      {
        name: 'removeEmptyText',
      },
      {
        name: 'convertTransform',
      },
      /*{
        name: 'moveGroupAttrsToElems',
      },*/
      /* {
         name: 'convertShapeToPath',
         active:true,
         params: {
           active:true,
           overrides: {
             active:true
           }
           //active:false
         },
       },*/
    ],
  })
  return result.data
}

function xmlToJson(xml = '') {
  // @ts-ignore
  return xml2json(xml)
}
