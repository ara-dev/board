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
import _ from 'lodash'
import { reactive, readonly } from 'vue'
import { Import } from './import'
import { Color, guide, LineGuideStops, Snapping, SnappingEdges, TextOption } from './types'
import { uiStore } from './ui'

interface StageOption {
  //Text Option
  textOption: TextOption
  //Layer Option
  layerLock: boolean
  opacity: number
  //common Option
  selectedElements: Shape[]
  currentPage: number
  pages: Stage[]
  docWidth: number
  docHeight: number
  copyElements: Shape[]
  currentColor: Color
}

export default class StageOptionStore {
  private lastPointerPosition: Vector2d

  constructor() {
    this._init()
    this.lastPointerPosition = { x: 0, y: 0 }
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

  get pages(): UnwrapNestedRefs<Stage[]> {
    return this._state.pages
  }

  set selectedElements(shapes: Shape[]) {
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

  addPage(container: HTMLDivElement | string, width: number, height: number): void {
    const state = this._state
    const w = state.docWidth > width ? state.docWidth : width
    const h = state.docHeight > height ? state.docHeight : height
    const stage = new Stage({
      container: container,
      width: w,
      height: h,
      //width: window.innerWidth,
      //height: window.innerHeight
    })
    //stage.zIndex(5000);
    this._state.pages.push(stage)
    this._state.currentPage++
    this.initStage(stage)
  }

  resizeStage(newWidth: number, newHeight: number): void {
    const state = this._state
    const w = state.docWidth > newWidth ? state.docWidth : newWidth
    const h = state.docHeight > newHeight ? state.docHeight : newHeight
    const stage: UnwrapNestedRefs<Stage> = state.pages[state.currentPage - 1]
    stage.width(w)
    stage.height(h)
    const group: Group = this.getGroup()
    group.x(stage.width() / 2 - state.docWidth / 2)
    group.y(stage.height() / 2 - state.docHeight / 2)
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
      // item.rotation(item.rotation()+degrees);
      //item.rotate(degrees);
    })
  }

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
    const group: Group = this.getGroup()
    const tempShape: Shape[] = []
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
      const copy = item.clone({
        x: item.x() + 10,
        y: item.y() + 10,
      })
      group.add(copy)
      tempShape.push(copy)
    })
    this.setShapesToTransformer(tempShape)
  }

  applyToggleLockUnlock(): void {
    this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
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
    const backgroundDistance = this.getBackground().getClientRect().x
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
    })
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

  public toJson(container: HTMLDivElement | string) {
    //console.log('this is svgo', svgo())
    //console.log('this is xml', xmlToJson(svgo()))
    //console.log('this is svgo', svgo())
    const state = this._state
    const stage: Stage = Konva.Node.create(Import(), container)
    this._state.pages.push(stage)
    this._state.currentPage++
    const layer: Layer = this.getBaseLayer()
    const group: Group = this.getGroup()
    this.setTransformer(stage, layer)
    this.setSnapping(stage, layer, group)
    this.setContextMenu(stage, group)

    //const main_group: Group = this.getGroup()
    //load images
    const images = stage.find((node) => {
      return node.name().startsWith('element_image')
    })
    images.forEach((item) => {
      const attr = item.attrs
      const data = attr.href ? attr.href : attr.dataSrc
      const parent = item.getParent()
      Konva.Image.fromURL(data, function (image) {
        image.setAttrs(attr)
        parent.add(image)
        //main_group.add(image)
        image.zIndex(item.zIndex())
      })
    })
    //end load images
    //render clip
    const children = stage.find((node) => {
      return node.name().startsWith('element_group_clip')
    })
    //console.log('this is children', children)
    children.forEach((item) => {
      const shape = item.attrs.attr_clip

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

      if (shape.className == 'Path') {
        console.log('this is shape for clip path', shape)
        item.clipFunc(function (ctx) {
          //method 1
          const path = new Konva.Path({
            data: shape.attrs.data,
          })
          path.sceneFunc().call(path, ctx, path)
          //method 2
          /* ctx.rect(0, 0, 4000, 2000)
          const path2D = new Path2D(shape.attrs.data)
          //path2D.rect(70, 70, 120, 80);
          ctx._context.clip(path2D)*/
        })
      }
    })
    //end render clip
  }

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
      docWidth: 640,
      docHeight: 480,
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
    }
    //this.lastPointerPosition = {x:0,y:0};
    uiStore.deActiveElementWhenNoneSelected()
  }

  private initStage(stage: Stage) {
    const state = this._state
    const layer = new Layer({
      name: 'layer',
    })
    stage.add(layer)
    const group = new Group({
      x: stage.width() / 2 - state.docWidth / 2,
      y: stage.height() / 2 - state.docHeight / 2,
      width: state.docWidth,
      height: state.docHeight,
      clipX: 0,
      clipY: 0,
      clipWidth: state.docWidth,
      clipHeight: state.docHeight,
      name: 'main_group',
    })
    layer.add(group)
    const background = new Rect({
      name: 'background',
      x: 0,
      y: 0,
      width: state.docWidth,
      height: state.docHeight,
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
    this.setTransformer(stage, layer)
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
      name: 'element',
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
      name: 'element',
      draggable: true,
      offsetX: 150 / 2,
      offsetY: 90 / 2,
    })

    group.add(rect2)

    const circle = new Konva.Circle({
      name: 'element',
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
      offsetX: 80 / 2,
      offsetY: 120 / 2,
    })

    group.add(triangle)

    const grp = new Konva.Group({
      draggable: true,
    })

    const text = new Konva.Text({
      name: 'element',
      x: 30,
      y: 30,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: 'this is text',
      //fill: 'black',
      //draggable: true,
      fill: 'blue',
    })
    grp.add(text)
    //group.add(text)

    const text2 = new Konva.Text({
      name: 'element',
      x: 10,
      y: 10,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: 'نمونه متن فارسی',
      fill: 'black',
      fontSrc: 'henzagold.com',
      //draggable: true,
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

    const path2 = new Konva.Path({
      name: 'element',
      draggable: true,
      /* x: 0,
      y: 0,*/
      data: 'm330.18 215.21 1.52 2.63c.22.4.61.68 1.06.76l3.05.61c.83.14 1.39.94 1.25 1.77-.05.3-.19.57-.4.79l-2.1 2.22c-.31.33-.46.77-.4 1.22l.36 3c.09.86-.55 1.63-1.41 1.72-.28.03-.56-.02-.81-.14l-2.81-1.27a1.6 1.6 0 0 0-1.32 0l-2.81 1.27c-.78.37-1.72.04-2.09-.74-.13-.26-.18-.55-.15-.84l.36-3c.06-.45-.09-.89-.4-1.22l-2.1-2.22a1.53 1.53 0 0 1 .83-2.56l3-.59c.45-.08.84-.36 1.06-.76l1.57-2.65c.45-.76 1.42-1.01 2.18-.56.23.13.42.33.56.56z'.replaceAll(
        ' ',
        ',',
      ),
      fill: '#fccd1d',
      /* scale: {
        x: 2,
        y: 2,
      },*/
    })
    group.add(path2)

    const imageObj = new Image()

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
    this.setSnapping(stage, layer, group)
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

  private currentStage(): Stage {
    return <Stage>this._state.pages[this._state.currentPage - 1]
  }

  private setShapesToTransformer(shapes: Shape[]): void {
    const transformer: Transformer = this.getTransFormer()
    transformer.nodes(shapes)
    this.selectedElements = shapes
  }

  private getAllShapes(): Shape[] {
    const stage: Stage = this.currentStage()
    const shapes: Shape[] = stage.find('.element')
    return shapes
  }

  private getGroup(): Group {
    const stage: Stage = this.currentStage()
    const group: Group = stage.findOne('.main_group')
    return group
  }

  private changeResizeRotateEnableTransformer(isEnable = true, transformer?: Transformer): void {
    if (transformer) {
      transformer.resizeEnabled(isEnable)
      transformer.rotateEnabled(isEnable)
    } else {
      const tr: Transformer = this.getTransFormer()
      tr.resizeEnabled(isEnable)
      tr.rotateEnabled(isEnable)
    }
  }

  private getTransFormer(): Transformer {
    const stage: Stage = this.currentStage()
    return stage.findOne('.transformer')
  }

  private addShapeToGroup(shapes: Shape[]): void {
    const group: Group = this.getGroup()
    group.add(...shapes)
  }

  private getBackground(): Rect {
    const stage: Stage = this.currentStage()
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
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return
      }
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false)
      })

      const shapes: Shape[] = stage.find((node) => {
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
        transformer.nodes([e.target])
        //deselect shape that draggable is false (locked)
        this.changeResizeRotateEnableTransformer(e.target.draggable(), transformer)
        this.selectedElements = [e.target as Shape]
      } else if (metaPressed && isSelected) {
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

  private getBaseLayer(): Layer {
    const stage: Stage = this.currentStage()
    return stage.findOne('.layer')
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
}

export const stageStore = new StageOptionStore()
