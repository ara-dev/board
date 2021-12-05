import Konva from 'konva'
import _ from 'lodash'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
import data from './3'
import Transform = Konva.Transform
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
    fillRadialGradientStartPoint: any
    fillRadialGradientEndPoint: any
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

export function Import() {
  let temp: object = {}
  defs = converDefsToKonvaFormat(data)
  clip_path = converClipPathToKonvaFormat(data)
  //console.log('this is clip path', clip_path)
  gradient = converLinearGradientToKonvaFormat(data)
  gradient = gradient.concat(converRadialGradientToKonvaFormat(data))
  const stage: KonvaFormat = {
    attrs: {
      name: generateName('stage', ''),
      width: 600,
      height: 480,
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
  //d
  //data.e
  //data.elements.reverse()
  data.elements.forEach((item) => {
    temp = Object.assign(temp, generateItem(item))
  })
  layer.children?.push(temp)
  //console.log(stage, 'this is temp')
  //console.log(JSON.stringify(stage), 'this is temp json')
  return JSON.stringify(stage)
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
      return {
        attrs: {},
        className: 'Group',
      }
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
      temp.push(generateItem(el))
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
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(svg, 'attributes.id', ''),
      width: parseFloat(viewbox[2]),
      height: parseFloat(viewbox[3]),
      opacity: parseFloat(_.get(svg, 'attributes.opacity', 1)),
      //clipX: 0,
      //clipY: 0,
      //clipWidth: parseFloat(viewbox[2]),
      //clipHeight: parseFloat(viewbox[3]),
      name: 'main_group', //'group_' + useGenerateUniqueID(),
    },
    className: 'Group',
  }
  if (svg.elements) {
    item.children = []
    svg.elements?.forEach((element) => {
      item.children?.push(generateItem(element))
    })
  }
  return item
}

function path(path: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Path', 'path', path)
  Object.assign(commonAttr.attrs, {
    data: _.get(path, 'attributes.d', ''), //.replaceAll(' ', ','),
    //fill: 'red',
    //stroke: '#000',
    //strokeWidth: 3,
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
  Object.assign(commonAttr.attrs, {
    /* fill: 'red',
    rotation: 0,
    scaleX: 0,
    scaleY: 0,*/
  })
  return clipPath(rectangle, commonAttr)
}

function clipPath(element: SVGXMLElement, shape: KonvaFormat): KonvaFormat {
  if (!element.attributes) {
    return shape
  }
  const attr = element.attributes['clip-path']
  if (attr) {
    //debugger
    const id = attr.substring(5, attr.length - 1)
    //if (id == '300_svg__d') debugger
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
      /*const group: KonvaFormat = {
        className: 'Group',
        attrs: {
          name: generateName('group_clip'),
          draggable: true,
          attr_clip: clip,
        },
        children: [shape],
      }
      return group*/
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
      //width: parseFloat(_.get(element, 'attributes.width', 0)),
      //height: parseFloat(_.get(element, 'attributes.height', 0)),
      //x: parseFloat(_.get(element, 'attributes.x', 0)),
      //y: parseFloat(_.get(element, 'attributes.y', 0)),
      //scaleX
      //scaleY
      //rotation
      //skewY
      //skewX
      opacity: parseFloat(_.get(element, 'attributes.opacity', 1)),
    },
    className: className,
  }

  if (!element.attributes) {
    return item
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
      //console.log(rotate(element.attributes.transform))
      //Object.assign(item.attrs, rotate(element.attributes.transform))
    }
  }

  //console.log('this is common', element)

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
            fillRadialGradientStartPoint: { x: item.attrs.width / 2, y: item.attrs.height / 2 },
            fillRadialGradientEndPoint: { x: item.attrs.width / 2, y: item.attrs.height / 2 },
          })
        }
        Object.assign(item.attrs, grd.gradient)
      }
    } else {
      Object.assign(item.attrs, { fill: element.attributes.fill })
    }
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
    fontFamily: _.get(text, 'attributes.font-family', ''),
    fontSize: parseFloat(_.get(text, 'attributes.font-size', 16)),
    //rotation: 0.642,
    //text: _.get(text, 'elements[0].text', ''),
    //x: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).x,
    // y: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).y,
  })
  let temp_text = ''
  if (text.elements && text.elements.length > 0) {
    if (text.elements[0].type == 'text') {
      temp_text = _.get(text, 'elements[0].text', '')
    } else {
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
      //fill: 'red',
      //width: 400,
      //height: 400,
    },
    className: 'Group',
  }
  if (group.elements) {
    item.children = []
    group.elements.forEach((element) => {
      item.children?.push(generateItem(element))
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
  //const x = parseFloat(_.get(radial_gradient, 'attributes.cx', 0))
  //const y = parseFloat(_.get(radial_gradient, 'attributes.cy', 0))
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
      item.attrs.svgID = _.get(element, 'attributes.id', '')
      temp.push(item)
      //temp.push(Object.assign(.attrs, { svgID: _.get(el, 'attributes.id', '') }))
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

/*function convertTransform(transform: string) {}*/

function translateToXY(translate: string) {
  //translate(113.55 395.714)
  const xy = translate.substring(10, translate.length - 1).split(' ')
  return { x: parseFloat(xy[0]), y: parseFloat(xy[1]) }
}

function rotate(rotate: string) {
  const rot = rotate.substring(7, rotate.length - 1).split(' ').map((point)=> parseFloat(point))
  return { rotation: rot[0],offset:{x:rot[1], y: rot[2]},offsetX:rot[1], offsetY: rot[2] }
  //offsetX:rot[1], offsetY: rot[2]
}

function decomposeMatrix(matrix: string): Matrix {
  const mat = matrix
    .substring(7, matrix.length - 1)
    .split(' ')
    .map((point) => parseFloat(point))
  return new Transform(mat).decompose()
  /*const m = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 }
  if (matrix.length) {
    m.a = mat[0]
    m.b = mat[1]
    m.c = mat[2]
    m.d = mat[3]
    m.e = mat[4]
    m.f = mat[5]
  }
  const E = (m.a + m.d) / 2
  const F = (m.a - m.d) / 2
  const G = (m.c + m.b) / 2
  const H = (m.c - m.b) / 2
  const Q = Math.sqrt(E * E + H * H)
  const R = Math.sqrt(F * F + G * G)
  const a1 = Math.atan2(G, F)
  const a2 = Math.atan2(H, E)
  const theta = (a2 - a1) / 2
  const phi = (a2 + a1) / 2
  // The requested parameters are then theta,
  // sx, sy, phi,
  return {
    x: m.e,
    y: m.f,
    rotation: (-phi * 180) / Math.PI,
    scaleX: Q + R,
    scaleY: Q - R,
    skewX: 0,
    skewY: 0,
    //skew: (-theta * 180) / Math.PI,
  }*/
}

/*function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}*/

/*function converStyleToAttribute(stringStyle: string): object {
  const attribute: object = {}
  const temp: string[] = stringStyle.split(';')
  temp.forEach((item) => {
    const keyValue: string[] = item.split(':')
    Object.assign(attribute, { [keyValue[0]]: keyValue[1] })
  })
  return attribute
}*/

//tspan in text and text path
//style
//svg style
//pattern
