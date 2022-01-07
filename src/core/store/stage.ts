import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import Konva from 'konva'
import { Group } from 'konva/lib/Group'
import { Layer } from 'konva/lib/Layer'
import { Shape } from 'konva/lib/Shape'
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'
import { Transformer } from 'konva/lib/shapes/Transformer'
import { Stage } from 'konva/lib/Stage'
import { Vector2d } from 'konva/lib/types'
// @ts-ignore
import _ from 'lodash'
import { reactive, readonly } from 'vue'
import { ImportSvg } from './import'
import { Color, guide, LineGuideStops, Snapping, SnappingEdges, TextOption } from './types'
import { uiStore } from './ui'
import {Design} from "../../model/design";
import {userStore} from "../../model/user";
import {baseURL, baseURLApi} from "../../../themeConfig";
interface ModelPage {
  docWidth: number
  docHeight: number
  stage: Object
}

export interface StageModel {
  pages: ModelPage[]
  fonts: number[]
  //price: number
  pageSize: { width: number; height: number }[]
  pageCount: number
}

interface Page {
  docWidth: number
  docHeight: number
  stage: Stage
}

interface StageOption {
  //Text Option
  textOption: TextOption
  //Layer Option
  layerLock: boolean
  opacity: number
  //common Option
  design?:Design
  selectedElements: Shape[]
  currentPage: number
  pages: Page[]
  copyElements: Shape[]
  currentColor: Color
  container: HTMLDivElement | string | null
}

export default class StageOptionStore {
  private lastPointerPosition: Vector2d
  private lastWidthHeightMainBoard: { width: number; height: number }
  private scale: number
  private scaleFactor: number
  //private inZoom: boolean

  constructor() {
    this._init()
    this.lastPointerPosition = { x: 0, y: 0 }
    this.lastWidthHeightMainBoard = { width: 0, height: 0 }
    this.scale = 1
    //this.inZoom = false
    this.scaleFactor = 1.2
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<StageOption>

  get state(): DeepReadonly<StageOption> {
    return readonly(this._state)
  }

  get currentColor(): Color {
    return this._state.currentColor
  }

  set currentColor(color: Color) {
    this._state.currentColor = color
    this.applyColor()
  }

  get opacity(): number {
    return this._state.opacity * 100
  }

  set opacity(opacity: number) {
    this._state.opacity = opacity / 100
  }

  get layerLock(): boolean {
    return this._state.layerLock
  }

  /*get pages(): UnwrapRef<StageOption['pages']> {
    return this._state.pages
  }*/

  /* get selectedElements(): UnwrapRef<StageOption['selectedElements']> {
    return this._state.selectedElements
  }*/

  set selectedElements(shapes: Shape[]) {
    //console.log('this is selected elements', shapes)
    if (shapes.length == 0) {
      uiStore.deActiveElementWhenNoneSelected()
      return
    }
    uiStore.ActiveElementWhenSelected()

    if (shapes.length == 1) {
      const selectedShape = shapes[0]
      //set common option
      this._state.opacity = selectedShape.opacity()
      this._state.layerLock = !selectedShape.draggable()
      //no common sample image not color
      //this._state.currentColor = _colorChange(selectedShape.fill())
      if (selectedShape.getClassName() == 'Text') {
        this.setTextOptions(selectedShape as Text)
        uiStore.show('ui.text_option')
      } else {
        uiStore.hide('ui.text_option')
      }
    } else {
      //uiStore.hide('ui.text_option');
    }
    this._state.selectedElements = shapes
  }

  get textOption(): TextOption {
    return this._state.textOption
  }

  /* setContainer(container: HTMLDivElement | string): void {
    this._state.container = container
  }*/

  addPage(
    docWidth: number,
    docHeight: number,
    width: number,
    height: number,
    container: HTMLDivElement | string,
  ): void {
    // const state = this._state
    // const w = docWidth > width ? docWidth : width
    // const h = docHeight > height ? docHeight : height
    const stage = new Stage({
      container: container, //this._state.container
      width: width,
      height: height,
      name: 'stage',
      //docWidth: w,
      //docheight: h,
      //width: window.innerWidth,
      //height: window.innerHeight
    })
    //stage.zIndex(5000);
    const page: Page = {
      stage,
      docWidth,
      docHeight,
    }
    this._state.pages.push(page)
    this._state.currentPage++
    this.initStage(page)
  }

  resizePage(newWidth: number, newHeight: number): void {
    //return
    /*if (this.inZoom) {
      return
    }*/
    //console.log('new width height', newWidth, newHeight)
    /*console.log(
      'new last width height',
      this.lastWidthHeightMainBoard.width,
      this.lastWidthHeightMainBoard.height,
    )*/
    this.lastWidthHeightMainBoard.width = newWidth
    this.lastWidthHeightMainBoard.height = newHeight
    const page = this.getCurrentPage()
    if (page) {
      const w = newWidth / page.docWidth //
      const h = (newHeight - 25) / page.docHeight //
      const min = Math.min(w, h)
      this.scale = min
      this.changeScale(min)
    }
    //page.stage.width(newWidth)
    //page.stage.height(newHeight)
    //const group: Group = this.getMainGroup(page.stage)
    /* if (!this.inZoom) {

    } else {
      //this.inZoom = false
    }*/
    /*page.stage.width(2000)
    page.stage.height(800)*/
    /*group.x(page.stage.width() / 2 - (page.docWidth * min) / 2)
    group.y(page.stage.height() / 2 - (page.docHeight * min) / 2)
    group.scale({
      x: min,
      y: min,
    })*/
  }

  changeScale(scale: number) {
    const page: Page = this.getCurrentPage()
    const group: Group = this.getMainGroup()
    //console.log('this is %', scale * 100)
    //console.log('this page width , height', page.docWidth * scale, page.docHeight * scale)
    const a =
      page.docWidth * scale > this.lastWidthHeightMainBoard.width
        ? page.docWidth * scale + 100
        : this.lastWidthHeightMainBoard.width
    const b =
      page.docHeight * scale > this.lastWidthHeightMainBoard.height
        ? page.docHeight * scale + 100
        : this.lastWidthHeightMainBoard.height
    //console.log('this is a b', a, b)
    page.stage.width(a)
    page.stage.height(b)
    group.scale({
      x: scale,
      y: scale,
    })
    group.x(page.stage.width() / 2 - (page.docWidth * scale) / 2)
    group.y(page.stage.height() / 2 - (page.docHeight * scale) / 2)
  }

  applyOpacity(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      item.opacity(this._state.opacity)
    })
  }

  applyDelete(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      item.destroy()
    })
    const shapes: Shape[] = this.getAllShapes()
    if (shapes.length != 0) {
      const lastShape: Shape = shapes[shapes.length - 1]
      this.setShapesToTransformer([lastShape])
    } else {
      this.setShapesToTransformer([])
    }
  }

  applyRotateDegrees(degrees: number): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      const clientRect = item.getClientRect({ skipTransform: true })
      /*console.log("this is client rect with skip",clientRect)
      console.log("this is client rect with skip",item.getClientRect())
      console.log("this is width",item.width())
      console.log("this is height",item.height())
      console.log("this is x",item.x())
      console.log("this is y",item.y())
      console.log("this is absoult postion",item.getAbsolutePosition())
      console.log("this is self rect",item.getSelfRect())*/

      const box = item.getClientRect()
      const x = box.x + box.width / 2
      const y = box.y + box.height / 2

      const main = this.getMainGroup()
      const circle = new Konva.Circle({
        x: x,
        y: y,
        radius: 5,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
      })

      main.add(circle)

      /*let angleRadians = degrees * Math.PI / 180; // sin + cos require radians

      console.log(clientRect)
      const center=this.getCenter(item);
      console.log(center)
      //const _x=clientRect.width /2;
      //const _y=clientRect.height /2

     */

      /*  const x =
          _x +
          (item.x() - _x) * Math.cos(angleRadians) -
          (item.y() - _y) * Math.sin(angleRadians);
      const y =
          _y +
          (item.x() - _x) * Math.sin(angleRadians) +
          (item.y() - _y) * Math.cos(angleRadians);*/

      //item.position({x: x, y: y});  // move the rotated shape in relation to the rotation point.
      //item.rotation(item.rotation() + degrees); // rotate the shape in place around its natural rotation point
      /* const shapeX = item.x();
      const shapeY = item.y();
      const shapeRotation = item.rotation
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
      return { position: { x, y }, rotation: shapeRotation + angleDegrees }*/
      //item.rotation(item.rotation()+degrees);
      //item.setAttr('rotation',item.rotation()+degrees)
      /*item.setAttrs({
        offset: {
          x: item.width()/2,
          y: item.height()/2,
        },
      })*/

      //console.log("this is client rect",)
      //console.log("this is width",item.width())
      //console.log("this is heigth",item.height())

      //item.offsetX(clientRect.width /2);
      //item.offsetY(clientRect.height/2);
      //item.rotate(degrees);
    })
  }

  /*getCenter(shape : any) {
    return {
      x:
          shape.x() +
          (shape.width() / 2) * Math.cos(shape.rotation()) +
          (shape.height() / 2) * Math.sin(-shape.rotation()),
      y:
          shape.y() +
          (shape.height() / 2) * Math.cos(shape.rotation()) +
          (shape.width() / 2) * Math.sin(shape.rotation())
    };
  }*/

  applyFontSize(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      ;(item as Text).fontSize(this._state.textOption.fontSize)
    })
  }

  applyTextAlign(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      ;(item as Text).align(this._state.textOption.align)
    })
  }

  applyDuplicate(): void {
    const group: Group = this.getMainGroup()
    const tempShape: Shape[] = []
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      const copy = item.clone({
        x: item.x() + 20,
        y: item.y() + 20,
      })
      group.add(copy)
      tempShape.push(copy)
    })
    this.setShapesToTransformer(tempShape)
  }

  applyToggleLockUnlock(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      //debugger
      const locked = item.getAttr('locked')
      if (locked != undefined) {
        item.setAttr('locked', !locked)
      } else {
        item.setAttr('locked', true)
      }
      item.draggable(!item.draggable())
    })
    this._state.layerLock = !this._state.layerLock
    this.changeResizeRotateEnableTransformer(!this._state.layerLock)
  }

  applyFlipVertical(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      item.scaleY(-item.scaleY())
    })
  }

  applyFlipHorizontal(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      item.scaleX(-item.scaleX())
    })
  }

  applyCopy(): void {
    //this._state.copyElements = this._state.selectedElements.slice();
    this._state.copyElements = this._state.selectedElements.map((item) => {
      return item.clone()
    })
  }

  applyPaste(): void {
    const shapes: Shape[] = this._state.copyElements.map((item) => {
      return item.setAttrs({
        x: this.lastPointerPosition.x,
        y: this.lastPointerPosition.y,
      })
    })
    this.addShapeToGroup(shapes)
    this.setShapesToTransformer(shapes)
    //this._state.copyElements=[];
  }

  enablePaste(): boolean {
    if (this._state.copyElements.length > 0) return true
    return false
  }

  applyDeleteAll(): void {
    this.getAllShapes().forEach((item: Shape) => {
      item.destroy()
    })
  }

  applySelectAll(): void {
    const shapes: Shape[] = this.getAllShapes().filter((item) => {
      return item.draggable()
    })
    this.setShapesToTransformer(shapes)
  }

  applyTest(): void {
    ///console.log(data)
    /* const matrix = []
    for (let i = 0; i <= 999; i++) {
      const temp = []
      for (let j = 0; j <= 999; j++) {
        temp.push(0)
      }
      matrix.push(temp)
    }
    // console.log(matrix[0], 'tttttt')

    data.forEach((item) => {
      matrix[item[0]][item[1]] = item[2]
    })

    const temp = []
    matrix.forEach((item, index) => {
      const count = item.filter((i) => i > 0).length
      let sum = 0
      item.forEach((i) => (sum += i))

      temp.push([index, count, sum, sum / count])
    })
    console.log('this is temp', temp)

    console.log('this is matrix', matrix)*/
    //console.log(matrix)
    /*  const tr=this.getTransFormer();
            //const group=this.getGroup();
            const background=this.getBackground().getClientRect().x;
            //let temp=[];
            const temp : number[] = this._state.selectedElements.map((item)=>{
                return item.getClientRect().x;
            });
            console.log("this is temp",temp);
            console.log("this is min",Math.min(...temp));
            const distance=Math.min(...temp) - background;
            //const temp= tr.getClientRect({ skipStroke:true,skipTransform:true }).x - background.getClientRect().x ;
            //console.log("this is temp",temp);
            //console.log("this is group",group.getClientRect());
            //console.log("this is relative",tr.getClientRect({relativeTo: background }));
            //console.log("this is transformer",tr.getClientRect({ skipStroke:true,skipTransform:true}));
           // console.log("this is background",background.getClientRect());
            this._state.selectedElements.forEach((item)=>{
                //console.log("this is item x",item.x());
                //console.log("this is item",item.getClassName(),item.getClientRect());
                item.setAttrs({
                    x : item.x() - distance
                })
            })
            /*/
  }

  applyAlignLeft(): void {
    const backgroundDistance = this.getBackground().getClientRect().x
    const distanceX: number[] = this._state.selectedElements.map((item) => {
      return item.getClientRect().x
    })
    const distance = Math.min(...distanceX) - backgroundDistance
    this._state.selectedElements.forEach((item) => {
      item.setAttrs({
        x: item.x() - distance,
      })
    })
  }

  applyAlignRight(): void {
    /*const backgroundDistance = this.getBackground().getClientRect().x
    const distanceX: number[] = this._state.selectedElements.map((item) => {
      const rect = item.getClientRect()
      return rect.x + rect.width
    })
    const distanceFromStart = Math.max(...distanceX) - backgroundDistance
    const distance = this._state.docWidth - distanceFromStart
    this._state.selectedElements.forEach((item) => {
      item.setAttrs({
        x: item.x() + distance,
      })
    })*/
  }

  applyZIndexTop(): void {
    this._state.selectedElements.forEach((item) => {
      item.moveToTop()
    })
  }

  applyZIndexBottom(): void {
    const background = this.getBackground()
    this._state.selectedElements.forEach((item) => {
      item.moveToBottom()
    })
    background.moveToBottom()
  }

  applyZIndexUp(): void {
    this._state.selectedElements.forEach((item) => {
      item.moveUp()
    })
  }

  applyZIndexDown(): void {
    const background = this.getBackground()
    this._state.selectedElements.forEach((item) => {
      item.moveDown()
    })
    background.moveToBottom()
  }

  applyColor(): void {
    this._state.selectedElements.forEach((item) => {
      item.fill(this.currentColor.hex8)
    })
  }

  async convertSvgToDesignModel(svg: string): Promise<Design> {

    const design: Design = {
      title: [''],
      code: '',
      creator: '',
      owners: [],
      tags: [],
      type: 1,
      data: {},
      files: [],
      options:{},
      status: 1,
      price: {},
      show: true,
    }

    const _model: StageModel = {
      fonts: [],
      pageSize: [],
      pages: [],
      pageCount: 1,
    }
    const stage :  {data:object,files:string[]}  = await ImportSvg(svg)
    _model.pages.push({
      stage: stage.data ,
      docWidth: _.get(stage.data, 'attrs.docWidth', 0),
      docHeight: _.get(stage.data, 'attrs.docHeight', 0),
    })
    _model.pageSize.push({
      width:_.get(stage.data, 'attrs.docWidth', 0),
      height: _.get(stage.data, 'attrs.docHeight', 0),
    })

    design.data = _model;
    design.files=stage.files

    return design;


  }

  async importFromSvg(svg: string, container: HTMLDivElement | string) {
    const _design= await this.convertSvgToDesignModel(svg)
    this.importFromJson(_design, container)
  }

  importFromJson(design: Design, container: HTMLDivElement | string) {
   this._state.pages= []
    const _container = document.getElementById('container');
    //console.log('dddddddd', _container)
    //console.log('this is model', model)
    //debugger
    (design.data as StageModel).pages.forEach((item) => {
      const stage: Stage = Konva.Node.create(item.stage, _container)
      const page: Page = {
        stage,
        docWidth: item.docWidth,
        docHeight: item.docHeight,
      }
      this._state.pages.push(page)
      //this._state.currentPage++
      const layer: Layer = this.getBaseLayer(stage)
      const group: Group = this.getMainGroup(stage)
      this.setTransformer(stage, layer)
      this.setSnapping(stage, layer, group)
      this.setContextMenu(stage, group)
      this.setEditableText(stage)
      //this.hoyKey()
      //load images
      const images = stage.find((node: any) => {
        //console.log('node.name() ====> ', node.name())
        return node.name().startsWith('element_image')
      })
      //console.log('dsafdsfsdf', images)
      //debugger
      images.forEach((item) => {
        const attr = item.attrs
        const data = attr.file_id ? baseURLApi+attr.file_storage+attr.file_name : attr.dataSrc
        const parent = item.getParent()
        //console.log('asdasdas', data)
        Konva.Image.fromURL(data, function (image: any) {
          image.setAttrs(attr)
          parent.add(image)
          image.zIndex(item.zIndex())
        })
      })
      //end load images
      //render clip
      const children: Group[] = stage.find((node: any) => {
        return node.name().startsWith('element_group_clip') as Group
      })
      //console.log('this is children', children)
      children.forEach((item) => {
        const shape = item.attrs.attr_clip

        if (shape.className == 'circle') {
          //console.log('this is clip path circle')
        }

        if (shape.className == 'Rect') {
          item.clipFunc(function (ctx) {
            ctx.rect(
              _.get(shape, 'attrs.x', 0),
              _.get(shape, 'attrs.y', 0),
              _.get(shape, 'attrs.width', 0),
              _.get(shape, 'attrs.height', 0),
            )
          })
        }

        if (shape.className == 'Line') {
          item.clipFunc(function (ctx) {
            const points = _.get(shape, 'attrs.points', [])
            ctx.beginPath()
            for (let i = 0; i < points.length; i = i + 2) {
              ctx.lineTo(points[i], points[i + 1])
            }
            ctx.closePath()
          })
        }

        /* if (shape.className == 'Path') {
          item.clipFunc(function (ctx) {
            //method 1
            const path = new Konva.Path({
              data: shape.attrs.data,
            })
            // @ts-ignore
            path.sceneFunc().call(path, ctx, path)
            //method 2
            //ctx.rect(0, 0, 4000, 2000)
            //const path2D = new Path2D(shape.attrs.data)
            //path2D.rect(70, 70, 120, 80);
            //ctx._context.clip(path2D)
          })
        }*/

        if (shape.className == 'Path') {
          //console.log('this is shape for clip path', shape)
          item.clipFunc(function (ctx) {
            //method 1
            /* const path = new Konva.Path({
              data: shape.attrs.data,
            })
            path.sceneFunc().call(path, ctx, path)*/
            //method 2
            ctx.rect(0, 0, page.docWidth, page.docHeight)
            const path2D = new Path2D(shape.attrs.data)
            //path2D.rect(70, 70, 120, 80);
            // @ts-ignore
            ctx._context.clip(path2D)
          })
        }
      })
      //end render clip

      const groups: Group[] = stage.find((node: any) => {
        return node.name().startsWith('element_group')
      })

      groups.forEach((item) => {
        item.children?.forEach((child) => {
          if (!child.name().startsWith('element_group')) {
            child.draggable(false)
          }
        })
      })






      //console.log('this is groups', groups)
    })
    this._state.currentPage = 1
    this.resizePage(this.lastWidthHeightMainBoard.width, this.lastWidthHeightMainBoard.height)
  }

  /*exportToImage(){
    const stage = this.exportToJson()
    const dataURL = stage.toDataURL();
    console.log("data url",dataURL)
    this.downloadURI(dataURL, 'stage.png');
  }*/

  downloadURI(uri : string, name : string) {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //delete link;
  }

  async createImageFromSvg(file : File,width:number=256,height:number=256) : Promise<string>{
    const container= document.createElement('div');
    container.style.display='none';
    document.body.appendChild(container)
    const stage = new Konva.Stage({
      container: container,
      width,
      height,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    const promise = new Promise((resolve, reject)  => {
      Konva.Image.fromURL(URL.createObjectURL(file), (imageNode : any) => {
        imageNode.setAttrs({
          width,
          height,
        });
        layer.add(imageNode);
        //console.log(stage.toDataURL(),"data url")
        //stageStore.downloadURI(stage.toDataURL({quality:1}),"this is dddddd.png")
        const dataURl=stage.toDataURL({quality:1})
        document.body.removeChild(container)
        resolve(dataURl);
      })
      //reject(new Error('Failed Load File'));
    })
    return await promise  as string
  }

  exportToJson(): string {
   /* const _export: Model = {
      pages: [],
      pageSize: [],
      fonts: [],
      pageCount: 0,
    }
    _export.pageCount = this._state.pages.length
    this._state.pages.forEach((item) => {
     //const ctx = console.log("tttttth is is data url",item.stage.toCanvas())
      //ctx.
      //this.downloadURI(item.stage.toDataURL({ pixelRatio: 5 }),"sdd.png")
      _export.pages.push({
        docWidth: item.docWidth,
        docHeight: item.docHeight,
        stage: item.stage.toObject(),
      })
      _export.pageSize.push({ width: item.docWidth, height: item.docHeight })
    })
    return JSON.stringify(_export)*/
    return ''
  }

  applyZoomIn() {
    this.scale *= this.scaleFactor
    this.changeScale(this.scale)
  }

  applyZoomOut() {
    this.scale /= this.scaleFactor
    this.changeScale(this.scale)
  }

  applyFitScreen() {
    this.resizePage(this.lastWidthHeightMainBoard.width, this.lastWidthHeightMainBoard.height)
  }

  /* setCenter() {
    const page: Page = this.getCurrentPage()
    const group: Group = this.getMainGroup(page.stage)
    group.x(page.stage.width() / 2 - page.docWidth / 2)
    group.y(page.stage.height() / 2 - page.docHeight / 2)
  }*/

  private _init() {
    this._state = {
      textOption: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontStyle: 'normal',
        fontVariant: 'normal',
        textDecoration: '',
        align: 'right',
        verticalAlign: 'top',
        padding: 0,
        lineHeight: 1,
        letterSpacing: 0,
        wrap: 'word',
        ellipsis: false,
      },
      layerLock: false,
      opacity: 1,
      selectedElements: [],
      currentPage: 0,
      pages: [],
      //docWidth: 1000,
      //docHeight: 1400,
      copyElements: [],
      currentColor: {
        hsl: {
          h: 0,
          s: 0.45761970701843896,
          l: 0.32011092999999996,
          a: 1,
        },
        hex: '#772C2C',
        hex8: '#772C2CFF',
        rgba: {
          r: 119,
          g: 44,
          b: 44,
          a: 1,
        },
        hsv: {
          h: 0,
          s: 0.6279,
          v: 0.46659999999999996,
          a: 1,
        },
        oldHue: 0,
        source: 'hsva',
        a: 1,
      },
      container: null,
    }
    //this.lastPointerPosition = {x:0,y:0};
    uiStore.deActiveElementWhenNoneSelected()
  }

  private initStage(page: Page) {
    //const state = this._state
    const layer = new Layer({
      name: 'layer',
    })
    page.stage.add(layer)
    const group = new Group({
      x: page.stage.width() / 2 - page.docWidth / 2,
      y: page.stage.height() / 2 - page.docHeight / 2,
      width: page.docWidth,
      height: page.docHeight,
      clipX: 0,
      clipY: 0,
      clipWidth: page.docWidth,
      clipHeight: page.docHeight,
      name: 'main_group',
    })
    layer.add(group)
    const background = new Rect({
      name: 'background',
      x: 0,
      y: 0,
      width: page.docWidth,
      height: page.docHeight,
      fill: '#fff',
      /*shadowBlur: 0,
            shadowOffset: { x: 0, y: 0 },
            shadowOpacity: 1,
            shadowColor: 'black',*/
      preventDefault: false,
      //fillLinearGradientStartPoint: { x: 0, y: 0 },
      //fillLinearGradientEndPoint: { x: stage.width(), y: stage.height() },
      // gradient into transparent color, so we can see CSS styles
      /*fillLinearGradientColorStops: [
                    0,
                    'yellow',
                    0.5,
                    'blue',
                    0.6,
                    'rgba(0, 0, 0, 0)',
                  ],*/
      // remove background from hit graph for better perf
      // because we don't need any events on the background
      listening: true,
    })
    group.add(background)
    //background.zIndex(-1);
    this.setTransformer(page.stage, layer)
    //start drag and drop on stage
    /* const stageContainer = stage.container()
        stageContainer.addEventListener('dragover', function (e) {
          console.log('stage container drag over', e)
          e.preventDefault() // !important
        })

        stageContainer.addEventListener('drop', function (e) {
          console.log('stage container drop', e)
          // @ts-ignore
          const data = e.dataTransfer.getData('text')
          console.log('this is data', data)
          //const element = document.getElementById(data)
          //console.log('this is element', element)
          stage.setPointersPositions(e)

          Konva.Image.fromURL(data, function (image) {
            group.add(image)
            image.position(stage.getPointerPosition())
            //image.name('element')
            image.setAttrs({
              //x: 200,
              // y: 50,
              //scaleX: 0.5,
              // scaleY: 0.5,
              href: data,
            })
            //image.h
            //image.draggable(true)
          })

          e.preventDefault()
          // now we need to find pointer position
          // we can't use stage.getPointerPosition() here, because that event
          // is not registered by Konva.Stage
          // we can register it manually:
        })*/

    //end drag and drop on stage

    //start test

    const rect1 = new Konva.Rect({
      x: 0,
      y: 0,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'element_rectangle_5152',
      draggable: true,
      //offsetX :   - 50 ,
      //offsetY : -80 ,
    })
    //background.add
    group.add(rect1)

    const rect2 = new Konva.Rect({
      x: 250,
      y: 100,
      width: 150,
      height: 90,
      fill: 'green',
      name: 'element_rectangle_858693',
      draggable: true,
      //offsetX: 150 / 2,
      //offsetY: 90 / 2,
    })

    group.add(rect2)

    const circle = new Konva.Circle({
      name: 'element_circle_dsfsdfsdf',
      x: 230,
      y: 100,
      radius: 60,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
    })

    group.add(circle)

    const triangle = new Konva.RegularPolygon({
      name: 'element',
      x: 80,
      y: 120,
      sides: 3,
      radius: 80,
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
      // offsetX: 80 / 2,
      // offsetY: 120 / 2,
    })

    group.add(triangle)

    const grp = new Konva.Group({
      draggable: true,
    })

    const text = new Konva.Text({
      name: 'element_text_5252',
      x: 30,
      y: 30,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: 'this is text',
      //fill: 'black',
      draggable: true,
      fill: 'blue',
    })
    grp.add(text)
    //group.add(text)

    const text2 = new Konva.Text({
      name: 'element_text_5525',
      x: 10,
      y: 10,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: 'نمونه متن فارسی',
      fill: 'black',
      fontSrc: 'henzagold.com',
      draggable: true,
    })
    grp.add(text2)
    //group.add(text2)

    group.add(grp)

    const path = new Konva.Path({
      name: 'element',
      draggable: true,
      x: 0,
      y: 0,
      data: 'M0,0h640v480H0z',
      fill: '#c15959',
      /* scale: {
              x: 2,
              y: 2,
            },*/
    })

    group.add(path)

    this.setSnapping(page.stage, layer, group)
    this.setContextMenu(page.stage, group)
    this.setEditableText(page.stage)
    this.hoyKey()

    /* const path2 = new Konva.Path({
      name: 'element',
      draggable: true,
      data: 'm330.18 215.21 1.52 2.63c.22.4.61.68 1.06.76l3.05.61c.83.14 1.39.94 1.25 1.77-.05.3-.19.57-.4.79l-2.1 2.22c-.31.33-.46.77-.4 1.22l.36 3c.09.86-.55 1.63-1.41 1.72-.28.03-.56-.02-.81-.14l-2.81-1.27a1.6 1.6 0 0 0-1.32 0l-2.81 1.27c-.78.37-1.72.04-2.09-.74-.13-.26-.18-.55-.15-.84l.36-3c.06-.45-.09-.89-.4-1.22l-2.1-2.22a1.53 1.53 0 0 1 .83-2.56l3-.59c.45-.08.84-.36 1.06-.76l1.57-2.65c.45-.76 1.42-1.01 2.18-.56.23.13.42.33.56.56z'
      fill: '#fccd1d',
      /!* scale: {
              x: 2,
              y: 2,
            },*!/
    })
    group.add(path2)*/

    //const imageObj = new Image()

    //console.log(imageObj, 'dasfsfsdf')

    /*imageObj.onload = function () {
          const yoda = new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            width: 200,
            height: 300,
          })

          // add the shape to the layer
          group.add(yoda)
        }
        imageObj.src = 'https://picsum.photos/200/300'

        Konva.Image.fromURL('https://picsum.photos/200/300?1', function (darthNode) {
          darthNode.setAttrs({
            x: 200,
            y: 50,
            // scaleX: 0.5,
            // scaleY: 0.5,
          })
          group.add(darthNode)
        })*/

    //end test
  }

  // were can we snap our objects?
  private getLineGuideStops(stage: Stage, skipShape: Shape): LineGuideStops {
    // we can snap to stage borders and the center of the stage
    const vertical: Array<number> = [0, stage.width() / 2, stage.width()]
    const horizontal: Array<number> = [0, stage.height() / 2, stage.height()]

    // and we snap over edges and center of each object on the canvas
    stage.find('.element').forEach((guideItem) => {
      if (guideItem === skipShape) {
        return
      }
      const box = guideItem.getClientRect()
      // and we can snap to all edges of shapes
      vertical.push(...[box.x, box.x + box.width, box.x + box.width / 2])
      horizontal.push(...[box.y, box.y + box.height, box.y + box.height / 2])
    })
    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    }
  }

  // but we will enable all edges and center
  private getObjectSnappingEdges(node: Shape): SnappingEdges {
    const box = node.getClientRect()
    const absPos = node.absolutePosition()

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: 'end',
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: 'end',
        },
      ],
    }
  }

  private getGuides(lineGuideStops: LineGuideStops, itemBounds: SnappingEdges): guide[] {
    const GUIDELINE_OFFSET = 5
    const resultV: Array<{ lineGuide: number; diff: number; snap: string; offset: number }> = []
    const resultH: Array<{ lineGuide: number; diff: number; snap: string; offset: number }> = []

    lineGuideStops.vertical.forEach((lineGuide: number) => {
      itemBounds.vertical.forEach((itemBound: Snapping) => {
        const diff = Math.abs(lineGuide - itemBound.guide)
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          })
        }
      })
    })

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide)
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          })
        }
      })
    })

    const guides: guide[] = []

    // find closest snap
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0]
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0]
    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      })
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      })
    }
    return guides
  }

  private drawGuides(layer: Layer, guides: guide[]) {
    guides.forEach((lg: guide) => {
      if (lg.orientation === 'H') {
        const line = new Konva.Line({
          points: [-6000, 0, 6000, 0],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        })
        layer.add(line)
        line.absolutePosition({
          x: 0,
          y: lg.lineGuide,
        })
      } else if (lg.orientation === 'V') {
        const line = new Konva.Line({
          points: [0, -6000, 0, 6000],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        })
        layer.add(line)
        line.absolutePosition({
          x: lg.lineGuide,
          y: 0,
        })
      }
    })
  }

  private getCurrentPage(): Page {
    return <Page>this._state.pages[this._state.currentPage - 1]
  }

  private setShapesToTransformer(shapes: Shape[]): void {
    const transformer: Transformer = this.getTransformer()
    transformer.nodes(shapes)
    this.selectedElements = shapes
  }

  private getAllShapes(): Shape[] {
    const stage: Stage = this.getCurrentPage().stage
    const shapes: Shape[] = stage.find((node: any) => {
      return node.name().startsWith('element')
    })
    return shapes
  }

  private getMainGroup(stage?: Stage): Group {
    const _stage = stage ? stage : this.getCurrentPage().stage
    const group: Group = _stage.findOne('.main_group')
    return group
  }

  private changeResizeRotateEnableTransformer(isEnable = true, transformer?: Transformer): void {
    if (transformer) {
      transformer.resizeEnabled(isEnable)
      transformer.rotateEnabled(isEnable)
    } else {
      const tr: Transformer = this.getTransformer()
      tr.resizeEnabled(isEnable)
      tr.rotateEnabled(isEnable)
    }
  }

  private getTransformer(stage?: Stage): Transformer {
    const _stage: Stage = stage ? stage : this.getCurrentPage().stage
    return _stage.findOne('.transformer')
  }

  private addShapeToGroup(shapes: Shape[]): void {
    const group: Group = this.getMainGroup()
    group.add(...shapes)
  }

  private getBackground(): Rect {
    const stage: Stage = this.getCurrentPage().stage
    return stage.findOne('.background')
  }

  private setTextOptions(text: Text): void {
    const textOption = this._state.textOption
    textOption.fontFamily = text.fontFamily()
    textOption.fontSize = text.fontSize()
    textOption.fontStyle = text.fontStyle()
    textOption.fontVariant = text.fontVariant()
    textOption.textDecoration = text.textDecoration()
    textOption.align = text.align()
    textOption.verticalAlign = text.verticalAlign()
    textOption.padding = text.padding()
    textOption.lineHeight = text.lineHeight()
    textOption.letterSpacing = text.letterSpacing()
    textOption.wrap = text.wrap()
    textOption.ellipsis = text.ellipsis()
  }

  private setTransformer(stage: Stage, layer: Layer) {
    const transformer = new Transformer({
      name: 'transformer',
      nodes: [],
      keepRatio: false,
      //enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
      //padding : 15,
      // flipEnabled : false,
    })
    layer.add(transformer)

    const selectionRectangle = new Rect({
      fill: 'rgba(0, 161, 255,0.3)', //rgba(0,0,255,0.5)
      visible: false,
    })

    layer.add(selectionRectangle)

    let x1: number, y1: number, x2: number, y2: number

    const mouseMove = (e: MouseEvent | TouchEvent) => {
      stage.setPointersPositions(e)
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return
      }

      let pointerPosition: Vector2d = { x: 0, y: 0 }
      if (stage.getPointerPosition() != null) {
        pointerPosition = stage.getPointerPosition() as Vector2d
      }
      x2 = pointerPosition.x
      y2 = pointerPosition.y

      selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      })
    }

    const mouseUp = (e: MouseEvent | TouchEvent) => {
      //console.log(e, 'this is mouse up')
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return
      }
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false)
      })

      const shapes: Shape[] = stage.find((node: any) => {
        return node.name().startsWith('element')
      }) //stage.find('.element')
      const box = selectionRectangle.getClientRect()
      const selected: Shape[] = shapes.filter(
        (shape) => Konva.Util.haveIntersection(box, shape.getClientRect()) && shape.draggable(), // no select element that tragable is false(locked)
      )
      this.changeResizeRotateEnableTransformer(true, transformer)
      this.setShapesToTransformer(selected)
      //transformer.nodes(selected)
      //this.selectedElements = selected
    }

    stage.on('mousedown touchstart', (e) => {
      //console.log('this is mouse down', e.target.parent)
      // do nothing if we mousedown on any shape
      if (e.target !== stage && e.target.name() !== 'background') {
        return
      }

      let pointerPosition: Vector2d = { x: 0, y: 0 }
      if (stage.getPointerPosition() != null) {
        pointerPosition = stage.getPointerPosition() as Vector2d
      }

      x1 = pointerPosition.x
      y1 = pointerPosition.y
      x2 = pointerPosition.x
      y2 = pointerPosition.y

      selectionRectangle.visible(true)
      selectionRectangle.width(0)
      selectionRectangle.height(0)
    })

    window.addEventListener('mousemove', (e) => {
      mouseMove(e)
    })

    window.addEventListener('touchmove', (e) => {
      mouseMove(e)
    })

    /* stage.on('mousemove touchmove', (e) => {

                e.evt.cancelBubble=false;
                // do nothing if we didn't start selection
                if (!selectionRectangle.visible()) {
                    return;
                }

                let pointerPosition: Vector2d = {x: 0, y: 0};
                if (stage.getPointerPosition() != null) {
                    pointerPosition = stage.getPointerPosition() as Vector2d;
                }

                x2 = pointerPosition.x;
                y2 = pointerPosition.y;

                selectionRectangle.setAttrs({
                    x: Math.min(x1, x2),
                    y: Math.min(y1, y2),
                    width: Math.abs(x2 - x1),
                    height: Math.abs(y2 - y1),
                });
            });*/

    window.addEventListener('mouseup', (e) => {
      mouseUp(e)
    })

    window.addEventListener('touchend', (e) => {
      mouseUp(e)
    })

    // clicks should select/deselect shapes or //click tap
    stage.on('mousedown touchstart', (e) => {
      //console.log('this is target', e.target)
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        return
      }

      // if click on empty area - remove all selections
      if (e.target === stage || e.target.name() == 'background') {
        transformer.nodes([])
        this.selectedElements = []
        return
      }

      // do nothing if clicked NOT on our rectangles
      // .hasName('element')
      if (!e.target.name().startsWith('element')) {
        return
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
      //old method
      //const isSelected = transformer.nodes().indexOf(e.target) >= 0
      //new method
      const isSelected = transformer.nodes().findIndex((item) => item._id == e.target._id) > -1
      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        const locked: boolean =
          e.target.getAttr('locked') != undefined ? !e.target.getAttr('locked') : true
        // debugger
        if (e.target.parent?.name().startsWith('element_group')) {
          //const parentGroup = this.getBaseGroup(e.target)
          //console.log(e.target)
          //console.log(e.target.parent?.getChildren())
          transformer.nodes([e.target])
          this.changeResizeRotateEnableTransformer(locked, transformer)
          this.selectedElements = [e.target as Shape]
        } else {
          // debugger
          transformer.nodes([e.target])
          this.changeResizeRotateEnableTransformer(locked, transformer)
          this.selectedElements = [e.target as Shape]
        }
        //console.log('')
        //deselect shape that draggable is false (locked)
      } else if (metaPressed && isSelected) {
        //debugger
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        this.changeResizeRotateEnableTransformer(true, transformer)
        let nodes = transformer.nodes().slice() // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1)
        nodes = nodes.filter((item) => {
          return item.draggable()
        })
        transformer.nodes(nodes)
        this.selectedElements = nodes as Shape[]
      } else if (metaPressed && !isSelected) {
        //debugger
        this.changeResizeRotateEnableTransformer(true, transformer)
        // add the node into selection
        //filter shape that is draggable is false (locked)
        let nodes = transformer.nodes().slice()
        nodes = nodes.filter((item) => {
          return item.draggable()
        })
        //add shape to nodes if draggable is true
        if (e.target.draggable()) {
          nodes.push(e.target)
        }
        transformer.nodes(nodes)
        this.selectedElements = nodes as Shape[]
      }
    })
  }

  /*private getBaseGroup(shape: Shape | Group): any {
    //debugger
    //console.log()
    const parent = shape.getParent()
    if (
      parent.parent?.name() == 'main_group' ||
      !parent.parent?.name().startsWith('element_group')
    ) {
      return parent
    } else {
      return this.getBaseGroup(parent)
    }
    /!*if(parent.parent?.name()=='main_group'){
      return
    }*!/

    /!*parent.children?.forEach((child)=>{
      if()
    })*!/
    //return parent
    //parent.chil
    //parent.getParent()
    //shape.children
  }*/

  private getBaseLayer(stage?: Stage): Layer {
    const _stage: Stage = stage ? stage : this.getCurrentPage().stage
    return _stage.findOne('.layer')
  }

  private setSnapping(stage: Stage, layer: Layer, group: Group): void {
    group.on('dragmove', (e) => {
      // clear all previous lines on the screen
      layer.find('.guid-line').forEach((l) => l.destroy())

      // find possible snapping lines
      const lineGuideStops: LineGuideStops = this.getLineGuideStops(stage, e.target as Shape)
      // find snapping points of current object
      const itemBounds: SnappingEdges = this.getObjectSnappingEdges(e.target as Shape)

      // now find where can we snap current object
      const guides: guide[] = this.getGuides(lineGuideStops, itemBounds)

      // do nothing of no snapping
      if (!guides.length) {
        return
      }

      this.drawGuides(layer, guides)

      const absPos = e.target.absolutePosition()
      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case 'start': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset
                break
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset
                break
              }
            }
            break
          }
          case 'center': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset
                break
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset
                break
              }
            }
            break
          }
          case 'end': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset
                break
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset
                break
              }
            }
            break
          }
        }
      })
      e.target.absolutePosition(absPos)
    })

    group.on('dragend', (e) => {
      // clear all previous lines on the screen
      layer.find('.guid-line').forEach((l) => l.destroy())
    })
  }

  private setContextMenu(stage: Stage, group: Group): void {
    //start context-menu
    const backgroundContextMenu: HTMLElement | null =
      document.getElementById('background-context-menu')
    const shapeContextMenu: HTMLElement | null = document.getElementById('shape-context-menu')
    stage.on('contextmenu', (e) => {
      /* let pos: Vector2d = {x: 0, y: 0};
                  const stage: Stage = this.currentStage();
                  if (stage.getPointerPosition() != null) {
                      pos = stage.getPointerPosition() as Vector2d;
                  }*/

      this.lastPointerPosition = group.getRelativePointerPosition()
      /*var shape = new Konva.Circle({
                      x: pos.x,
                      y: pos.y,
                      fill: 'red',
                      radius: 20,
                  });*/

      //group.add(shape);

      //this.lastPointerPosition=pointerPosition;

      if (backgroundContextMenu != null) {
        backgroundContextMenu.style.display = 'none'
      }

      if (shapeContextMenu != null) {
        shapeContextMenu.style.display = 'none'
      }

      // prevent default behavior
      e.evt.preventDefault()

      if (e.target === stage) {
        // if we are on empty place of the stage we will do nothing
        return
      }

      if (e.target.name() == 'background') {
        if (backgroundContextMenu != null) {
          backgroundContextMenu.style.display = 'initial'
          backgroundContextMenu.style.top = e.evt.clientY + 5 + 'px'
          backgroundContextMenu.style.left = e.evt.clientX + 5 + 'px'
        }
      }

      if (e.target.name().startsWith('element')) {
        if (shapeContextMenu != null) {
          shapeContextMenu.style.display = 'initial'
          shapeContextMenu.style.top = e.evt.clientY + 5 + 'px'
          shapeContextMenu.style.left = e.evt.clientX + 5 + 'px'
        }
      }
    })

    window.addEventListener('click', () => {
      // hide menu
      if (backgroundContextMenu != null) {
        backgroundContextMenu.style.display = 'none'
      }

      if (shapeContextMenu != null) {
        shapeContextMenu.style.display = 'none'
      }
    })
    //end context-menu
  }

  private setEditableText(stage: Stage) {
    stage.on('dblclick dbltap', (e) => {
      if (e.target.name().startsWith('element_text')) {
        const leftSideWidth = document.getElementById('board-left-side')?.clientWidth || 0
        const text: Text = e.target as Text
        const transformer: Transformer = this.getTransformer(stage)

        // hide text node and transformer:
        text.hide()
        transformer.hide()

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        const textPosition = text.absolutePosition()

        // so position of textarea will be the sum of positions above:
        const areaPosition = {
          x: textPosition.x + leftSideWidth, //stage.container().offsetLeft + textPosition.x,
          y: textPosition.y, //stage.container().offsetTop + textPosition.y,
        }

        // create textarea and style it
        const textarea = document.createElement('textarea')
        document.body.appendChild(textarea)

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = text.text()
        textarea.style.position = 'absolute'
        textarea.style.top = areaPosition.y - 5 + 'px'
        textarea.style.left = areaPosition.x + 'px'
        textarea.style.width = text.width() * 2 - text.padding() * 2 + 20 + 'px'
        textarea.style.height = text.height() - text.padding() * 2 + 5 + 'px'
        textarea.style.fontSize = text.fontSize() * this.scale + 'px'
        textarea.style.border = 'none'
        textarea.style.padding = '0px'
        textarea.style.margin = '0px'
        textarea.style.overflow = 'hidden'
        textarea.style.background = 'none'
        textarea.style.outline = 'none'
        textarea.style.resize = 'none'
        textarea.style.lineHeight = text.lineHeight().toString()
        textarea.style.fontFamily = text.fontFamily()
        textarea.style.transformOrigin = 'left top'
        textarea.style.textAlign = text.align()
        textarea.style.color = text.fill()
        const rotation = text.rotation()
        let tr = ''
        if (rotation) {
          tr += 'rotateZ(' + rotation + 'deg)'
        }
        let px = 0
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
        if (isFirefox) {
          px += 2 + Math.round(text.fontSize() / 20)
        }
        tr += 'translateY(-' + px + 'px)'

        textarea.style.transform = tr

        // reset height
        textarea.style.height = 'auto'
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px'

        textarea.focus()

        const handleOutsideClick = (e: any) => {
          if (e.target !== textarea) {
            text.text(textarea.value)
            removeTextarea()
          }
        }

        const removeTextarea = () => {
          textarea.parentNode?.removeChild(textarea)
          window.removeEventListener('click', handleOutsideClick)
          text.show()
          transformer.show()
          transformer.forceUpdate()
        }

        const setTextareaWidth = (newWidth: number) => {
          if (!newWidth) {
            // set width for placeholder
            newWidth = text.fontSize() //* text.placeholder.length
          }
          // some extra fixes on different browsers
          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
          const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth)
          }

          /*const isEdge = document.documentMode || /Edge/.test(navigator.userAgent)
          if (isEdge) {
            newWidth += 1
          }*/
          textarea.style.width = newWidth + 'px'
        }

        textarea.addEventListener('keydown', (e) => {
          // hide on enter
          // but don't hide on shift + enter
          /* if (e.keyCode === 13 && !e.shiftKey) {
            text.text(textarea.value)
            removeTextarea()
          }*/
          // on esc do not set value back to node
          //console.log(e.key)
          //console.log(e.keyCode)
          if (e.key == 'Escape') {
            removeTextarea()
          }
        })

        textarea.addEventListener('keydown', (e) => {
          const scale = text.getAbsoluteScale().x
          setTextareaWidth(text.width() * scale)
          textarea.style.height = 'auto'
          textarea.style.height = textarea.scrollHeight + text.fontSize() * this.scale + 'px'
        })

        setTimeout(() => {
          window.addEventListener('click', handleOutsideClick)
        })
      }
    })
  }

  private hoyKey() {
    const page = this.getCurrentPage()
    const container = page.stage.container()
    const delta = 4
    container.tabIndex = 1
    container.focus()
    container.addEventListener('keydown', (e) => {
      //console.log(e.key)
      if (e.key == 'ArrowDown') {
        this._state.selectedElements.forEach((item) => {
          item.y(item.y() + delta)
        })
      }

      if (e.key == 'ArrowUp') {
        this._state.selectedElements.forEach((item) => {
          item.y(item.y() - delta)
        })
      }

      if (e.key == 'ArrowLeft') {
        this._state.selectedElements.forEach((item) => {
          item.x(item.x() - delta)
        })
      }

      if (e.key == 'ArrowRight') {
        this._state.selectedElements.forEach((item) => {
          item.x(item.x() + delta)
        })
      }

      if (e.key == 'Delete') {
        this.applyDelete()
      }

      if (e.ctrlKey && e.key == 'a') {
        this.applySelectAll()
        e.preventDefault()
      }

      if (e.ctrlKey && e.key == 'c') {
        this.applyCopy()
      }

      if (e.ctrlKey && e.key == 'v') {
        this.applyDuplicate()
      }
    })

    container.addEventListener(
      'mousewheel',
      (event) => {
        // console.log(event as WheelEvent)
        const mouseEvent = event as WheelEvent
        //e.ctrlKey
        //console.log(e.ctrlKey)
        if (mouseEvent.ctrlKey == true) {
          event.preventDefault()
          if (mouseEvent.deltaY > 0) {
            //console.log('Down')
            this.applyZoomOut()
          } else {
            this.applyZoomIn()
            //console.log('Up')
          }
        }
      },
      { passive: false },
    )

    /*window.addEventListener(
      'mousewheel',
      (e) => {
        const mouse = e as MouseEvent
        //e.ctrlKey
        console.log(e.ctrlKey)
        if (mouse.ctrlKey == true) {
          e.preventDefault()
        }
      },
      { passive: false },
    )*/

    /* document.addEventListener(
      'mousewheel',
      (event) => {
        console.log(`wheel`)
        if (event.ctrlKey == true) {
          event.preventDefault()
          if (event.deltaY > 0) {
            console.log('Down')
          } else {
            console.log('Up')
          }
        }
      },
      { passive: false },
    )*/

    //console.log('this is container', page.stage.container())
    //console.log('active element', document.activeElement)
    /*page.stage.addEventListener('click', () => {
      console.log('active', document.activeElement)
      //console.log('key board')
      //alert('asdasdsad')
    })*/
    //page.stage.container().focus()
    //return
    /* window.addEventListener('click', (e) => {
      //console.log(e.target.focus())
      //  document.getElementById('container').tabIndex = 1
      //document.getElementById('container').focus()
      // console.log('active', document.activeElement)
      // const name = event.key
      // const code = event.code
      //console.log('key board', name, code)
      //alert('dsfsdfdsfsd')
    })*/
  }
}

export const stageStore = new StageOptionStore()
