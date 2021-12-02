import _ from 'lodash'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
import data from './data2'

interface KonvaFormat {
  attrs: object
  className: string
  children?: KonvaFormat[]
}
interface SVGXMLElement {
  elements?: SVGXMLElement[]
  type?: string
  name?: string
  attributes: object
}

export function Import() {
  let temp = {}
  const t = getAlldefs(data)
  console.log(converDefsToKonvaFormat(t))
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

function getAlldefs(svgxml: SVGXMLElement): SVGXMLElement[] {
  let defs: object[] = []
  svgxml.elements?.forEach((element) => {
    if (element.name == 'defs') {
      defs.push(element)
    } else {
      if (element.elements) {
        const temp: object[] = getAlldefs(element)
        defs = defs.concat(temp)
      }
    }
  })
  return defs
}

function converDefsToKonvaFormat(defs: SVGXMLElement[]): KonvaFormat[] {
  const temp: KonvaFormat[] = []
  defs.forEach((element) => {
    element.elements?.forEach((el) => {
      temp.push(generateItem(el))
    })
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
      fill: _.get(path, 'attributes.fill', 'black'),
    },
    className: 'Path',
  }
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
      svgID: _.get(rectangle, 'attributes.id', ''),
      name: generateName('rectangle'),
      draggable: true,
      x: parseFloat(_.get(rectangle, 'attributes.x', 0)),
      y: parseFloat(_.get(rectangle, 'attributes.y', 0)),
      width: parseFloat(_.get(rectangle, 'attributes.width', 0)),
      height: parseFloat(_.get(rectangle, 'attributes.height', 0)),
      fill: _.get(rectangle, 'attributes.fill', ''),
      stroke: _.get(rectangle, 'attributes.stroke', ''),
      strokeWidth: parseFloat(_.get(rectangle, 'attributes.stroke-width', 0)),
      opacity: parseFloat(_.get(rectangle, 'attributes.opacity', 1)),
    },
    className: 'Rect',
  }
  return item
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

function converStyleToAttribute(stringStyle: string): object {
  const attribute: object = {}
  const temp: string[] = stringStyle.split(';')
  temp.forEach((item) => {
    const keyValue: string[] = item.split(':')
    Object.assign(attribute, { [keyValue[0]]: keyValue[1] })
  })
  return attribute
}

//Polygons
//used
//image
//transform matrix
//tspan in text
//clipPath
//style
//svg style
//pattern
//linearGradient
//redial gradiant
