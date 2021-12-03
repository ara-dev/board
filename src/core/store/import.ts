import _ from 'lodash'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
import data from './data2'

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
  gradient: {
    fillLinearGradientStartPoint: any
    fillLinearGradientEndPoint: any
    fillLinearGradientColorStops: any[]
  }
}
interface RadialGradient {
  svgID: string
  gradient: {
    fillRadialGradientStartPoint: any
    fillRadialGradientColorStops: any[]
    fillRadialGradientStartRadius: number
  }
}

let defs: KonvaFormat[] = []
let gradient: (LinearGradient | RadialGradient)[] = []

export function Import() {
  let temp: object = {}
  defs = converDefsToKonvaFormat(data)
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
    default:
      return {
        attrs: {},
        className: '',
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
  const viewbox = _.get(svg, 'attributes.viewBox', '0 0 0 0').split(' ')
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
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(path, 'attributes.id', ''),
      name: generateName('path'),
      draggable: true,
      data: _.get(path, 'attributes.d', ''), //.replaceAll(' ', ','),
      stroke: _.get(path, 'attributes.stroke', 'red'),
      strokeWidth: parseFloat(_.get(path, 'attributes.stroke-width', 1)),
    },
    className: 'Path',
  }
  /*if (path.attributes?.fill && path.attributes?.fill != 'none') {
    if (path.attributes.fill.startsWith('url')) {
      const key: string = path.attributes.fill.substring(5, path.attributes.fill.length - 1)
      const grd = gradient.find((item) => item.svgID == key)
      if (grd) {
        Object.assign(item.attrs, grd.gradient)
      }
    } else {
      item.attrs.fill = _.get(path, 'attributes.fill', 'black')
    }
  }*/
  return item
}

function circle(circle: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(circle, 'attributes.id', ''),
      name: generateName('circle'),
      draggable: true,
      x: parseFloat(_.get(circle, 'attributes.cx', 0)),
      y: parseFloat(_.get(circle, 'attributes.cy', 0)),
      radius: parseFloat(_.get(circle, 'attributes.r', 0)),
      fill: _.get(circle, 'attributes.fill', ''),
      stroke: _.get(circle, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(circle, 'attributes.stroke-width', 0)),
      opacity: parseFloat(_.get(circle, 'attributes.opacity', 1)),
    },
    className: 'Circle',
  }
  return item
}

function rectangle(rectangle: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      name: generateName('rectangle'),
    },
    className: 'Rect',
  }
  commonAttributes(item, rectangle)
  console.log('this is common', item)
  return item
}

function commonAttributes(konvaShape: KonvaFormat, element: SVGXMLElement) {
  const attrs = {
    svgID: _.get(element, 'attributes.id', ''),
    draggable: true,
    x: parseFloat(_.get(element, 'attributes.x', 0)),
    y: parseFloat(_.get(element, 'attributes.y', 0)),
    width: parseFloat(_.get(element, 'attributes.width', 0)),
    height: parseFloat(_.get(element, 'attributes.height', 0)),
    stroke: _.get(element, 'attributes.stroke', ''),
    strokeWidth: parseFloat(_.get(element, 'attributes.stroke-width', 1)),
    opacity: parseFloat(_.get(element, 'attributes.opacity', 1)),
  }
  if (element.attributes?.fill && element.attributes?.fill != 'none') {
    if (element.attributes.fill.startsWith('url')) {
      const key: string = element.attributes.fill.substring(5, element.attributes.fill.length - 1)
      const grd = gradient.find((item) => item.svgID == key)
      console.log('this is grd', grd)
      if (grd) {
        Object.assign(attrs, grd.gradient)
      }
    } else {
      Object.assign(attrs, { fill: _.get(rectangle, 'attributes.fill', 'black') })
    }
  }
  /*  if(element.attributes?.stroke){
    Object.assign(attrs, {
      stroke: _.get(element, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(element, 'attributes.stroke-width', 0)),
    })
  }*/

  Object.assign(konvaShape.attrs, attrs)
}

function ellipse(ellipse: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(ellipse, 'attributes.id', ''),
      name: generateName('ellipse'),
      draggable: true,
      x: parseFloat(_.get(ellipse, 'attributes.cx', 0)),
      y: parseFloat(_.get(ellipse, 'attributes.cy', 0)),
      radiusX: parseFloat(_.get(ellipse, 'attributes.rx', 0)),
      radiusY: parseFloat(_.get(ellipse, 'attributes.ry', 0)),
      fill: _.get(ellipse, 'attributes.fill', ''),
      stroke: _.get(ellipse, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(ellipse, 'attributes.stroke-width', 0)),
      opacity: parseFloat(_.get(ellipse, 'attributes.opacity', 1)),
    },
    className: 'Ellipse',
  }
  return item
}

function text(text: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(text, 'attributes.id', ''),
      name: generateName('text'),
      x: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).x,
      y: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).y,
      fontFamily: _.get(text, 'attributes.font-family', ''),
      fontSize: parseFloat(_.get(text, 'attributes.font-size', 16)),
      text: _.get(text, 'elements[0].text', ''),
      //fill: 'black',
      draggable: true,
    },
    className: 'Text',
  }
  return item
}

function line(line: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(line, 'attributes.id', ''),
      name: generateName('line'),
      draggable: true,
      //x: parseFloat(_.get(line, 'attributes.x', 0)),
      //y: parseFloat(_.get(line, 'attributes.y', 0)),
      points: [
        parseFloat(_.get(line, 'attributes.x1', 0)),
        parseFloat(_.get(line, 'attributes.y1', 0)),
        parseFloat(_.get(line, 'attributes.x2', 0)),
        parseFloat(_.get(line, 'attributes.y2', 0)),
      ],
      fill: _.get(line, 'attributes.fill', ''),
      stroke: _.get(line, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(line, 'attributes.stroke-width', 0)),
      opacity: parseFloat(_.get(line, 'attributes.opacity', 1)),
    },
    className: 'Line',
  }
  return item
}

function polyline(polyline: SVGXMLElement): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(polyline, 'attributes.id', ''),
      name: generateName('line'),
      draggable: true,
      //x: parseFloat(_.get(line, 'attributes.x', 0)),
      //y: parseFloat(_.get(line, 'attributes.y', 0)),
      points: _.get(polyline, 'attributes.points', '').split(','),
      fill: _.get(polyline, 'attributes.fill', ''),
      stroke: _.get(polyline, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(polyline, 'attributes.stroke-width', 0)),
      opacity: parseFloat(_.get(polyline, 'attributes.opacity', 1)),
    },
    className: 'Line',
  }
  return item
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
  const item: KonvaFormat = {
    attrs: {
      svgID: _.get(polygon, 'attributes.id', ''),
      name: generateName('polygon'),
      draggable: true,
      points: _.get(polygon, 'attributes.points', '')
        .replaceAll(' ', ',')
        .split(',')
        .map((point: string) => parseFloat(point)),
      closed: true,
      fill: _.get(polygon, 'attributes.fill', 'black'),
      stroke: _.get(polygon, 'attributes.stroke', 'red'),
      strokeWidth: parseFloat(_.get(polygon, 'attributes.stroke-width', 1)),
    },
    className: 'Line',
  }
  return item
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
    gradient: {
      fillRadialGradientStartPoint: {
        x: parseFloat(_.get(radial_gradient, 'attributes.cx', 0)),
        y: parseFloat(_.get(radial_gradient, 'attributes.cy', 0)),
      },
      fillRadialGradientStartRadius: parseFloat(_.get(radial_gradient, 'attributes.r', 0)),
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

//used
//image
//transform matrix
//tspan in text
//clipPath
//style
//svg style
//pattern
//redial gradiant
