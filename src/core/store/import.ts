import _ from 'lodash'
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID'
const data = {
  elements: [
    {
      type: 'element',
      name: 'svg',
      attributes: {
        'xml:space': 'preserve',
        viewBox: '0 0 640 480',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      elements: [
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#c15959',
            d: 'M0 0h640v480H0z',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#212529',
            d: 'm342 198-13 8-13-8v-14h26z',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#dd051d',
            d: 'M337 184v17.08l-8 4.92-8-4.92V184z',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#a60416',
            d: 'm328.81 206.21 6.49-4a21.37 21.37 0 0 0-13 0l6.51 4z',
          },
        },
        {
          type: 'element',
          name: 'circle',
          attributes: {
            cx: '328.81',
            cy: '222.71',
            r: '19.5',
            fill: '#fccd1d',
          },
        },
        {
          type: 'element',
          name: 'circle',
          attributes: {
            cx: '328.81',
            cy: '222.71',
            r: '14.5',
            fill: '#f9a215',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#fccd1d',
            d: 'm330.18 215.21 1.52 2.63c.22.4.61.68 1.06.76l3.05.61c.83.14 1.39.94 1.25 1.77-.05.3-.19.57-.4.79l-2.1 2.22c-.31.33-.46.77-.4 1.22l.36 3c.09.86-.55 1.63-1.41 1.72-.28.03-.56-.02-.81-.14l-2.81-1.27a1.6 1.6 0 0 0-1.32 0l-2.81 1.27c-.78.37-1.72.04-2.09-.74-.13-.26-.18-.55-.15-.84l.36-3c.06-.45-.09-.89-.4-1.22l-2.1-2.22a1.53 1.53 0 0 1 .83-2.56l3-.59c.45-.08.84-.36 1.06-.76l1.57-2.65c.45-.76 1.42-1.01 2.18-.56.23.13.42.33.56.56z',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            d: 'M227.02 62.45c-1.93 0-1.93 3 0 3s1.94-3 0-3z',
          },
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            'font-family': 'Calibri',
            'font-size': '12',
            transform: 'translate(113.55 395.714)',
          },
          elements: [
            {
              type: 'text',
              text: 'asdasdasdasdasd',
            },
          ],
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            'font-family': 'Calibri',
            'font-size': '12',
            transform: 'translate(113.55 357.714)',
          },
          elements: [
            {
              type: 'text',
              text: 'asdasdasdasdasd',
            },
          ],
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            d: 'M342.25 53.87c1.37 1.69-1.46 5.06-2.38 6.38-1.38 1.97-2.9 3.83-4.52 5.61-3.31 3.62-7.01 6.87-10.86 9.91-7.72 6.12-16.03 11.46-23.6 17.78-4.3 3.59-8.34 7.51-11.78 11.95-.5.65-.62 1.49 0 2.12.51.52 1.63.64 2.12 0 12.95-16.72 33.54-24.97 47.31-40.85 1.9-2.19 3.68-4.52 5.22-6.97 1.56-2.48 2.64-5.52.6-8.04-1.2-1.52-3.31.62-2.11 2.11z',
          },
        },
        {
          type: 'element',
          name: 'g',
          attributes: {
            opacity: '.53',
          },
          elements: [
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ff0',
                d: 'M414.5 139.5h156v74h-156z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                d: 'M570 140v73H415v-73h155m1-1H414v75h157v-75z',
              },
            },
          ],
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#29abe2',
            d: 'M443.2 413h-93.4c-11.49 0-20.8-9.31-20.8-20.8v-93.4c0-11.49 9.31-20.8 20.8-20.8h93.41c11.49 0 20.8 9.31 20.8 20.8v93.41C464 403.69 454.69 413 443.2 413z',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#f15a24',
            d: 'M607.2 419h-93.4c-11.49 0-20.8-9.31-20.8-20.8v-93.4c0-11.49 9.31-20.8 20.8-20.8h93.41c11.49 0 20.8 9.31 20.8 20.8v93.41C628 409.69 618.69 419 607.2 419z',
          },
        },
      ],
    },
  ],
}

interface KonvaFormat {
  attrs: object
  className: string
  children?: KonvaFormat[]
}

export function Import() {
  let temp = {}
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
  console.log(stage, 'this is temp')
  console.log(JSON.stringify(stage), 'this is temp json')
  return JSON.stringify(stage)
}

function generateItem(item: object): KonvaFormat {
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

function svg(svg: object) {
  const viewbox = _.get(svg, 'attributes.viewBox', '0 0 0 0').split(' ')
  const item: KonvaFormat = {
    attrs: {
      width: parseFloat(viewbox[2]),
      height: parseFloat(viewbox[3]),
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
    svg.elements.forEach((element) => {
      //console.log('sdfsdfsdf', item)
      item.children?.push(generateItem(element))
      //item.children.push(generateItem(element))
    })
  }
  return item
}

function path(path: object): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      name: generateName('path'),
      draggable: true,
      data: _.get(path, 'attributes.d', '').replaceAll(' ', ','),
      fill: _.get(path, 'attributes.fill', 'black'),
    },
    className: 'Path',
  }
  return item
}

function circle(circle: object): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
      name: generateName('circle'),
      draggable: true,
      x: parseFloat(_.get(circle, 'attributes.cx', 0)),
      y: parseFloat(_.get(circle, 'attributes.cy', 0)),
      radius: parseFloat(_.get(circle, 'attributes.r', 0)),
      fill: _.get(circle, 'attributes.fill', ''),
      //stroke: 'black',
      //strokeWidth: 4,
    },
    className: 'Circle',
  }
  return item
}

function text(text: object): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
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

function translateToXY(translate: string) {
  //translate(113.55 395.714)
  const xy = translate.substring(10, translate.length - 1).split(' ')
  return { x: parseFloat(xy[0]), y: parseFloat(xy[1]) }
}

function group(group: object): KonvaFormat {
  const item: KonvaFormat = {
    attrs: {
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

//Ellipses
//Rectangles
//Polygons
//Lines
//Polylines
//used
//image
//transform matrix
//tspan in text
//defs
//clipPath
//style
//svg style
//pattern
//linearGradient
