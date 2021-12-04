import _ from 'lodash'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
import data from './data4'
/*enum GRADIENT{
  Linear,
  Radial
}*/
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

let defs: KonvaFormat[] = []
let gradient: (LinearGradient | RadialGradient)[] = []
let clipPath: KonvaFormat[] = []

export function Import() {
  let temp: object = {}
  defs = converDefsToKonvaFormat(data)
  clipPath = converClipPathToKonvaFormat(data)
  console.log('this is clip path', clipPath)
  gradient = converLinearGradientToKonvaFormat(data)
  gradient = gradient.concat(converRadialGradientToKonvaFormat(data))
  const stage: KonvaFormat = {
    attrs: {
      width: 600,
      height: 480,
    },
    className: 'Stage',
    children: [],
  }
  const layer: KonvaFormat = {
    attrs: {},
    className: 'Layer',
    children: [],
  }
  stage.children?.push(layer)
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
      name: generateName('group', ''), //'group_' + useGenerateUniqueID(),
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
    //stroke: '#000',
    //strokeWidth: 3,
  })
  return commonAttr
}

function circle(circle: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Circle', 'circle', circle)
  Object.assign(commonAttr.attrs, {
    x: parseFloat(_.get(circle, 'attributes.cx', 0)),
    y: parseFloat(_.get(circle, 'attributes.cy', 0)),
    radius: parseFloat(_.get(circle, 'attributes.r', 0)),
  })
  return commonAttr
}

function rectangle(rectangle: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Rect', 'rectangle', rectangle)
  return commonAttr
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
      width: parseFloat(_.get(element, 'attributes.width', 0)),
      height: parseFloat(_.get(element, 'attributes.height', 0)),
      x: parseFloat(_.get(element, 'attributes.x', 0)),
      y: parseFloat(_.get(element, 'attributes.y', 0)),
      opacity: parseFloat(_.get(element, 'attributes.opacity', 1)),
    },
    className: className,
  }

  /*if (element.attributes.width) {
    Object.assign(item.attrs, { width: parseFloat(element.attributes.width) })
  }

  if (element.attributes.height) {
    Object.assign(item.attrs, { height: parseFloat(element.attributes.height) })
  }*/

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
  return commonAttr
}

function text(text: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Text', 'text', text)
  Object.assign(commonAttr.attrs, {
    fontFamily: _.get(text, 'attributes.font-family', ''),
    fontSize: parseFloat(_.get(text, 'attributes.font-size', 16)),
    text: _.get(text, 'elements[0].text', ''),
  })
  return commonAttr
  /*const item: KonvaFormat = {
    attrs: {
      x: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).x,
      y: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).y,
    },
  }
  return item*/
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
  return commonAttr
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

function polyline(polyline: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Line', 'polyline', polyline)
  Object.assign(commonAttr.attrs, {
    points: _.get(polygon, 'attributes.points', '')
      .replaceAll(' ', ',')
      .split(',')
      .map((point: string) => parseFloat(point)),
    closed: true,
  })
  return commonAttr
}

function translateToXY(translate: string) {
  //translate(113.55 395.714)
  const xy = translate.substring(10, translate.length - 1).split(' ')
  return { x: parseFloat(xy[0]), y: parseFloat(xy[1]) }
}

function group(group: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(group, 'attributes.id', ''),
      name: generateName('group'),
      opacity: parseFloat(_.get(group, 'attributes.opacity', 1)),
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
  return item
}

function polygon(polygon: SVGXMLElement): KonvaFormat {
  const commonAttr = commonAttributes('Line', 'polygon', polygon)
  Object.assign(commonAttr.attrs, {
    points: _.get(polygon, 'attributes.points', '')
      .replaceAll(' ', ',')
      .split(',')
      .map((point: string) => parseFloat(point)),
    closed: true,
  })
  return commonAttr
}

/*function converStyleToAttribute(stringStyle: string): object {
  const attribute: object = {}
  const temp: string[] = stringStyle.split(';')
  temp.forEach((item) => {
    const keyValue: string[] = item.split(':')
    Object.assign(attribute, { [keyValue[0]]: keyValue[1] })
  })
  return attribute
}*/

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
      temp.push(generateItem(el))
    })
  })

  return temp
}

//image
//transform  translate(x-value, y-value) matrix transform="rotate(x, y, z)"  scale(x-axis,y-axis) Skew
//transform="matrix(a,b,c,d,e,f)"
//tspan in text
//clipPath
//style
//svg style
//pattern
