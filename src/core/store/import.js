import { Transform } from 'konva/lib/Util';
import _ from 'lodash';
import { optimize } from 'svgo/lib/svgo';
import { useGenerateUniqueID } from '../../utils/useGenerateUniqueID';
import data from './1';
import './xml';
let defs = [];
let gradient = [];
let clip_path = [];
export function Import() {
    var _a, _b;
    //const svgJson = xmlToJson(svgo(data))
    //console.log('10000', svgJson)
    let temp = {};
    defs = converDefsToKonvaFormat(data);
    clip_path = converClipPathToKonvaFormat(data);
    gradient = converLinearGradientToKonvaFormat(data);
    gradient = gradient.concat(converRadialGradientToKonvaFormat(data));
    const stage = {
        attrs: {
            name: generateName('stage', ''),
            width: 750,
            height: 500,
        },
        className: 'Stage',
        children: [],
    };
    const layer = {
        attrs: {
            name: 'layer',
        },
        className: 'Layer',
        children: [],
    };
    (_a = stage.children) === null || _a === void 0 ? void 0 : _a.push(layer);
    //d
    //data.e
    //data.elements.reverse()
    data.elements.forEach((item) => {
        const gItem = generateItem(item);
        if (gItem)
            temp = Object.assign(temp, gItem);
    });
    (_b = layer.children) === null || _b === void 0 ? void 0 : _b.push(temp);
    //console.log(stage, 'this is temp')
    //console.log(JSON.stringify(stage), 'this is temp json')
    return JSON.stringify(stage);
}
function generateItem(item) {
    switch (item.name) {
        case 'svg':
            return svg(item);
        case 'path':
            return path(item);
        case 'circle':
            return circle(item);
        case 'text':
            return text(item);
        case 'g':
            return group(item);
        case 'line':
            return line(item);
        case 'polyline':
            return polyline(item);
        case 'ellipse':
            return ellipse(item);
        case 'rect':
            return rectangle(item);
        case 'polygon':
            return polygon(item);
        case 'use':
            return use(item);
        case 'image':
            return image(item);
        default:
            return null;
    }
}
function generateName(typeName = '', prefix = 'element') {
    let name = '';
    if (prefix != '') {
        name += prefix + '_';
    }
    name += typeName + '_' + useGenerateUniqueID();
    return name;
}
function findAllElementByName(svgxml, name) {
    var _a;
    let shape = [];
    (_a = svgxml.elements) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
        if (element.name == name) {
            shape.push(element);
        }
        else {
            if (element.elements) {
                const temp = findAllElementByName(element, name);
                shape = shape.concat(temp);
            }
        }
    });
    return shape;
}
function converDefsToKonvaFormat(svgxml) {
    const defs = findAllElementByName(svgxml, 'defs');
    const temp = [];
    defs.forEach((element) => {
        var _a;
        (_a = element.elements) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
            const gItem = generateItem(el);
            if (gItem)
                temp.push(gItem);
        });
    });
    return temp;
}
function converLinearGradientToKonvaFormat(svgxml) {
    const linerGradinat = findAllElementByName(svgxml, 'linearGradient');
    const temp = [];
    linerGradinat.forEach((element) => {
        temp.push(linearGradient(element));
    });
    return temp;
}
function svg(svg) {
    var _a;
    const viewbox = _.get(svg, 'attributes.viewBox', '0 0 300 300').split(' ');
    const item = {
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
    };
    if (svg.elements) {
        item.children = [];
        (_a = svg.elements) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
            var _a;
            const gItem = generateItem(element);
            if (gItem)
                (_a = item.children) === null || _a === void 0 ? void 0 : _a.push(gItem);
        });
    }
    return item;
}
function path(path) {
    const commonAttr = commonAttributes('Path', 'path', path);
    Object.assign(commonAttr.attrs, {
        data: _.get(path, 'attributes.d', ''),
    });
    if (!commonAttr.attrs.fill) {
        Object.assign(commonAttr, { fill: '#000' });
    }
    return clipPath(path, commonAttr);
}
function circle(circle) {
    const commonAttr = commonAttributes('Circle', 'circle', circle);
    Object.assign(commonAttr.attrs, {
        x: parseFloat(_.get(circle, 'attributes.cx', 0)),
        y: parseFloat(_.get(circle, 'attributes.cy', 0)),
        radius: parseFloat(_.get(circle, 'attributes.r', 0)),
    });
    return clipPath(circle, commonAttr);
}
function rectangle(rectangle) {
    const commonAttr = commonAttributes('Rect', 'rectangle', rectangle);
    Object.assign(commonAttr.attrs, {
    /* fill: 'red',
    rotation: 0,
    scaleX: 0,
    scaleY: 0,*/
    });
    return clipPath(rectangle, commonAttr);
}
function clipPath(element, shape) {
    if (!element.attributes) {
        return shape;
    }
    const attr = element.attributes['clip-path'];
    if (attr) {
        const id = attr.substring(5, attr.length - 1);
        //if (id == '3_svg__A') debugger
        //console.log(shape, 'this is shape for clip path')
        const clip = clip_path.find((item) => item.attrs.svgID == id);
        if (clip) {
            if (shape.className == 'Group') {
                Object.assign(shape.attrs, {
                    name: generateName('group_clip'),
                    attr_clip: clip,
                });
            }
            else {
                const group = {
                    className: 'Group',
                    attrs: {
                        name: generateName('group_clip'),
                        draggable: true,
                        attr_clip: clip,
                    },
                    children: [shape],
                };
                return group;
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
    return shape;
}
function commonAttributes(className, typeName, element) {
    var _a, _b, _c, _d;
    const item = {
        attrs: {
            svgID: _.get(element, 'attributes.id', ''),
            name: generateName(typeName),
            draggable: true,
            opacity: parseFloat(_.get(element, 'attributes.opacity', 1)),
        },
        className: className,
    };
    if (!element.attributes) {
        return item;
    }
    if ((_a = element.attributes) === null || _a === void 0 ? void 0 : _a.x) {
        Object.assign(item.attrs, { x: parseFloat(element.attributes.x) });
    }
    if ((_b = element.attributes) === null || _b === void 0 ? void 0 : _b.y) {
        Object.assign(item.attrs, { y: parseFloat(element.attributes.y) });
    }
    if ((_c = element.attributes) === null || _c === void 0 ? void 0 : _c.width) {
        Object.assign(item.attrs, { width: parseFloat(element.attributes.width) });
    }
    if ((_d = element.attributes) === null || _d === void 0 ? void 0 : _d.height) {
        Object.assign(item.attrs, { height: parseFloat(element.attributes.height) });
    }
    if (element.attributes.transform) {
        if (element.attributes.transform.startsWith('matrix')) {
            const matrix = decomposeMatrix(element.attributes.transform);
            Object.assign(item.attrs, matrix);
        }
        if (element.attributes.transform.startsWith('translate')) {
            Object.assign(item.attrs, translateToXY(element.attributes.transform));
        }
        if (element.attributes.transform.startsWith('rotate')) {
            Object.assign(item.attrs, rotate(item, element.attributes.transform));
        }
    }
    if (element.attributes['stroke-linecap']) {
        Object.assign(item.attrs, { lineCap: element.attributes['stroke-linecap'] });
    }
    if (element.attributes['stroke-dasharray']) {
        Object.assign(item.attrs, {
            dash: element.attributes['stroke-dasharray'].split(',').map((point) => parseFloat(point)),
        });
    }
    if (element.attributes.fill && element.attributes.fill != 'none') {
        if (element.attributes.fill.startsWith('url')) {
            const key = element.attributes.fill.substring(5, element.attributes.fill.length - 1);
            const grd = gradient.find((item) => item.svgID == key);
            if (grd) {
                if (grd.type == 'radial') {
                    Object.assign(grd.gradient, {
                        fillRadialGradientStartPoint: { x: item.attrs.width / 2, y: item.attrs.height / 2 },
                        fillRadialGradientEndPoint: { x: item.attrs.width / 2, y: item.attrs.height / 2 },
                    });
                }
                Object.assign(item.attrs, grd.gradient);
            }
        }
        else {
            Object.assign(item.attrs, { fill: element.attributes.fill });
        }
    }
    if (element.attributes.stroke) {
        Object.assign(item.attrs, { stroke: element.attributes.stroke });
        Object.assign(item.attrs, {
            strokeWidth: parseFloat(_.get(element, 'attributes.stroke-width', 1)),
        });
    }
    return item;
}
function ellipse(ellipse) {
    const commonAttr = commonAttributes('Ellipse', 'ellipse', ellipse);
    //override common attribute
    Object.assign(commonAttr.attrs, {
        x: parseFloat(_.get(ellipse, 'attributes.cx', 0)),
        y: parseFloat(_.get(ellipse, 'attributes.cy', 0)),
        radiusX: parseFloat(_.get(ellipse, 'attributes.rx', 0)),
        radiusY: parseFloat(_.get(ellipse, 'attributes.ry', 0)),
    });
    return clipPath(ellipse, commonAttr);
}
function text(text) {
    const commonAttr = commonAttributes('Text', 'text', text);
    Object.assign(commonAttr.attrs, {
        fontFamily: _.get(text, 'attributes.font-family', ''),
        fontSize: parseFloat(_.get(text, 'attributes.font-size', 16)),
        //rotation: 0.642,
        //text: _.get(text, 'elements[0].text', ''),
        //x: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).x,
        // y: translateToXY(_.get(text, 'attributes.transform', 'translate(0 0)')).y,
    });
    let temp_text = '';
    if (text.elements && text.elements.length > 0) {
        if (text.elements[0].type == 'text') {
            temp_text = _.get(text, 'elements[0].text', '');
        }
        else {
            text.elements.forEach((item) => {
                temp_text += _.get(item, 'elements[0].text', '');
            });
        }
    }
    Object.assign(commonAttr.attrs, { text: temp_text });
    return clipPath(text, commonAttr);
}
function image(image) {
    const commonAttr = commonAttributes('Image', 'image', image);
    /*const item: KonvaFormat = {
      attrs: {
        name: generateName('group_image'),
      },
      className: 'Group',
      children: [],
    }*/
    const href = image.attributes['xlink:href'];
    if (href) {
        if (href.startsWith('data')) {
            Object.assign(commonAttr.attrs, { dataSrc: href });
        }
        else {
            Object.assign(commonAttr.attrs, { href: href });
        }
    }
    //item.children.push(commonAttr)
    //return item
    return commonAttr;
}
function line(line) {
    const commonAttr = commonAttributes('Line', 'line', line);
    Object.assign(commonAttr.attrs, {
        points: [
            parseFloat(_.get(line, 'attributes.x1', 0)),
            parseFloat(_.get(line, 'attributes.y1', 0)),
            parseFloat(_.get(line, 'attributes.x2', 0)),
            parseFloat(_.get(line, 'attributes.y2', 0)),
        ],
    });
    return clipPath(line, commonAttr);
}
function polyline(polyline) {
    const commonAttr = commonAttributes('Line', 'polyline', polyline);
    Object.assign(commonAttr.attrs, {
        points: _.get(polyline, 'attributes.points', '')
            .replaceAll(' ', ',')
            .split(',')
            .map((point) => parseFloat(point)),
        closed: true,
    });
    return clipPath(polyline, commonAttr);
}
function group(group) {
    const item = {
        attrs: {
            svgID: _.get(group, 'attributes.id', ''),
            name: generateName('group'),
            opacity: parseFloat(_.get(group, 'attributes.opacity', 1)),
        },
        className: 'Group',
    };
    if (group.elements) {
        item.children = [];
        group.elements.forEach((element) => {
            var _a;
            const gItem = generateItem(element);
            if (gItem)
                (_a = item.children) === null || _a === void 0 ? void 0 : _a.push(gItem);
        });
    }
    return clipPath(group, item);
    //return item
}
function polygon(polygon) {
    const commonAttr = commonAttributes('Line', 'polygon', polygon);
    Object.assign(commonAttr.attrs, {
        points: _.get(polygon, 'attributes.points', '')
            .replaceAll(' ', ',')
            .split(',')
            .map((point) => parseFloat(point)),
        closed: true,
        //fill: 'red',
    });
    return clipPath(polygon, commonAttr);
}
function linearGradient(linear_gradient) {
    var _a;
    const linearGradient = {
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
    };
    (_a = linear_gradient.elements) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        linearGradient.gradient.fillLinearGradientColorStops.push(parseFloat(_.get(item, 'attributes.offset', 0)));
        linearGradient.gradient.fillLinearGradientColorStops.push(_.get(item, 'attributes.stop-color', 'black'));
    });
    return linearGradient;
}
function converRadialGradientToKonvaFormat(svgxml) {
    const radial_Gradient = findAllElementByName(svgxml, 'radialGradient');
    const temp = [];
    radial_Gradient.forEach((element) => {
        temp.push(radialGradient(element));
    });
    return temp;
}
function radialGradient(radial_gradient) {
    var _a;
    //const x = parseFloat(_.get(radial_gradient, 'attributes.cx', 0))
    //const y = parseFloat(_.get(radial_gradient, 'attributes.cy', 0))
    const radialGradient = {
        svgID: _.get(radial_gradient, 'attributes.id', ''),
        type: 'radial',
        gradient: {
            fillRadialGradientStartPoint: { x: 0, y: 0 },
            fillRadialGradientEndPoint: { x: 0, y: 0 },
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndRadius: parseFloat(_.get(radial_gradient, 'attributes.r', 0)),
            fillRadialGradientColorStops: [],
        },
    };
    (_a = radial_gradient.elements) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        radialGradient.gradient.fillRadialGradientColorStops.push(parseFloat(_.get(item, 'attributes.offset', 0)));
        radialGradient.gradient.fillRadialGradientColorStops.push(_.get(item, 'attributes.stop-color', 'black'));
    });
    return radialGradient;
}
function converClipPathToKonvaFormat(svgxml) {
    const clip = findAllElementByName(svgxml, 'clipPath');
    const temp = [];
    clip.forEach((element) => {
        var _a;
        (_a = element.elements) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
            const item = generateItem(el);
            if (item) {
                item.attrs.svgID = _.get(element, 'attributes.id', '');
                temp.push(item);
            }
            //temp.push(Object.assign(.attrs, { svgID: _.get(el, 'attributes.id', '') }))
        });
    });
    return temp;
}
function use(use) {
    const commonAttr = commonAttributes('Group', 'use', use);
    const href = use.attributes['xlink:href'];
    if (href) {
        const id = href.substring(1, href.length);
        const item = defs.find((element) => element.attrs.svgID == id);
        if (item) {
            const clone_obj = _.cloneDeep(item);
            Object.assign(clone_obj.attrs, commonAttr.attrs);
            return clone_obj;
        }
    }
    return commonAttr;
}
/*function convertTransform(transform: string) {}*/
function getCenter(shape) {
    return {
        x: shape.x +
            (shape.width / 2) * Math.cos(shape.rotation) +
            (shape.height / 2) * Math.sin(-shape.rotation),
        y: shape.y +
            (shape.height / 2) * Math.cos(shape.rotation) +
            (shape.width / 2) * Math.sin(shape.rotation),
    };
}
function translateToXY(translate) {
    //translate(113.55 395.714)
    const xy = translate.substring(10, translate.length - 1).split(' ');
    return { x: parseFloat(xy[0]), y: parseFloat(xy[1]) };
}
/*function multiplyMatrices(matrixA, matrixB) {
  const aNumRows = matrixA.length
  const aNumCols = matrixA[0].length
  const bNumRows = matrixB.length
  const bNumCols = matrixB[0].length
  const newMatrix = new Array(aNumRows)

  for (let r = 0; r < aNumRows; ++r) {
    newMatrix[r] = new Array(bNumCols)

    for (let c = 0; c < bNumCols; ++c) {
      newMatrix[r][c] = 0

      for (let i = 0; i < aNumCols; ++i) {
        newMatrix[r][c] += matrixA[r][i] * matrixB[i][c]
      }
    }
  }

  return newMatrix
}*/
function rotateAroundPoint(shape, angleDegrees, point) {
    const angleRadians = (angleDegrees * Math.PI) / 180; // sin + cos require radians
    const shapeX = _.get(shape, 'attrs.x', 0);
    const shapeY = _.get(shape, 'attrs.y', 0);
    const shapeRotation = _.get(shape, 'attrs.rotation', 0);
    const x = point.x +
        (shapeX - point.x) * Math.cos(angleRadians) -
        (shapeY - point.y) * Math.sin(angleRadians);
    const y = point.y +
        (shapeX - point.x) * Math.sin(angleRadians) +
        (shapeY - point.y) * Math.cos(angleRadians);
    //shape.position({x: x, y: y});  // move the rotated shape in relation to the rotation point.
    //shape.rotation(shape.rotation()+angleDegrees); // rotate the shape in place around its natural rotation point
    //shape.moveToTop()
    return { position: { x, y }, rotation: shapeRotation + angleDegrees };
}
function rotate(shape, rotate) {
    const rot = rotate
        .substring(7, rotate.length - 1)
        .split(' ')
        .map((p) => parseFloat(p));
    return rotateAroundPoint(shape, rot[0], { x: rot[1], y: rot[2] });
}
function decomposeMatrix(matrix) {
    const mat = matrix
        .substring(7, matrix.length - 1)
        .split(' ')
        .map((point) => parseFloat(point));
    return new Transform(mat).decompose();
}
function svgo(svg = '') {
    const result = optimize(svg, {
        // optional but recommended field
        path: 'path-to.svg',
        /*js2svg: {
          indent: 2, // string with spaces or number of spaces. 4 by default
          pretty: true, // boolean, false by default
        },*/
        // all config fields are also available here
        multipass: true,
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        // customize options for plugins included in preset
                        inlineStyles: {
                            onlyMatchedOnce: false,
                        },
                        // or disable plugins
                        removeDoctype: false,
                        convertShapeToPath: false,
                        moveElemsAttrsToGroup: false,
                        moveGroupAttrsToElems: false,
                        mergePaths: false,
                        //convertTransform:false,
                    },
                },
            },
            {
                name: 'convertStyleToAttrs',
                params: {},
            },
            // enable builtin plugin not included in default preset
            'prefixIds',
            // enable and configure builtin plugin not included in preset
            {
                name: 'sortAttrs',
                params: {
                    xmlnsOrder: 'alphabetical',
                },
            },
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
    });
    return result.data;
}
function xmlToJson(xml = '') {
    return xml2json(xml);
}
//# sourceMappingURL=import.js.map