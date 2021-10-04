import {DeepReadonly, UnwrapNestedRefs} from "@vue/reactivity"
import {reactive, readonly} from "vue"
import {Stage} from 'konva/lib/Stage'
import {Shape} from 'konva/lib/Shape'
import {Text} from 'konva/lib/shapes/Text'
import {guide, LineGuideStops, Snapping, SnappingEdges, TextOption} from "./types"
import {uiStore} from "./ui";
import {Layer} from "konva/lib/Layer";
import {Group} from "konva/lib/Group";
import {Rect} from "konva/lib/shapes/Rect";
import {Transformer} from "konva/lib/shapes/Transformer";
import Konva from 'konva';
import {Vector2d} from "konva/lib/types";


interface StageOption {
    //Text Option
    textOption: TextOption,
    //Layer Option
    layerLock: boolean,
    opacity: number,
    //common Option
    selectedElements: Shape[],
    currentPage: number,
    pages: Stage[],
    docWidth: number,
    docHeight: number,
}

export default class StageOptionStore {

    private _state !: UnwrapNestedRefs<StageOption>;

    constructor() {
        this._init();
        this._state = reactive(this._state);
        /*watch(this._state,()=>{
            console.log("this is wathc in select elements");
        });*/
    }


    get state(): DeepReadonly<StageOption> {
        return readonly(this._state);
    }

    private _init() {
        this._state = {
            textOption: {
                fontFamily: "Arial",
                fontSize: 12,
                fontStyle: "normal",
                fontVariant: "normal",
                textDecoration: "",
                align: "right",
                verticalAlign: "top",
                padding: 0,
                lineHeight: 1,
                letterSpacing: 0,
                wrap: "word",
                ellipsis: false,
            },
            layerLock: false,
            opacity: 1,
            selectedElements: [],
            currentPage: 0,
            pages: [],
            docWidth: 600,
            docHeight: 300,
        };
    }

    /* get textFontSize(): number {
         return this._state.textFontSize;
     }

     set textFontSize(size: number) {
         this._state.textFontSize = size;

     }*/

    get opacity(): number {
        return this._state.opacity * 100;
    }

    set opacity(opacity) {
        this._state.opacity = opacity / 100;
    }

    get layerLock(): boolean {
        return this._state.layerLock;
    }

    /*get textAlign(): string {
        return this._state.textAlign;
    }

    set textAlign(textAlign) {
        this._state.textAlign = textAlign;
    }*/

    get pages(): UnwrapNestedRefs<Stage[]> {
        return this._state.pages;
    }

    set selectedElements(shapes: Shape[]) {
        if (shapes.length == 1) {
            //console.log("this lenght is one");
            const selectedShape = shapes[0];
            //console.log( );
            if (selectedShape.getClassName() == 'Text') {
                const selectedText: Text = selectedShape as Text;
                this._state.textOption.fontSize = selectedText.fontSize();
                // {this._state.textOption}= selectedText;
               // console.log("text option", this._state.textOption);
                //this.textFontSize=selectedText.fontSize();
                //this.textAlign=selectedText.align();
                uiStore.show('ui.text_option');
            }
        } else {
            uiStore.hide('ui.text_option');
        }
        this._state.selectedElements = shapes;
    }

    addPage(container: HTMLDivElement | string, width: number, height: number): void {
        const state = this._state;
        const w = state.docWidth > width ? state.docWidth : width;
        const h = state.docHeight > height ? state.docHeight : height;
        const stage = new Stage({
            container: container,
            width: w,
            height: h,
        });
        this._state.pages.push(stage);
        this._state.currentPage++;
        this.initStage(stage);
    }

    private initStage(stage: Stage) {
        const state = this._state;
        const layer = new Layer();
        stage.add(layer);

        const group = new Group({
            x: (stage.width() / 2) - (state.docWidth / 2),
            y: (stage.height() / 2) - (state.docHeight / 2),
            width: state.docWidth,
            height: state.docHeight,
            clipX: 0,
            clipY: 0,
            clipWidth: state.docWidth,
            clipHeight: state.docHeight,
            name: 'main_group',
            /*draggable:true,*/
            /*scaleX : 0.5 ,
            scaleY : 0.5,*/
        });
        layer.add(group);

        const background = new Rect({
            x: 0,
            y: 0,
            width: state.docWidth,
            height: state.docHeight,
            fill: '#fff',
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
            listening: false,
        });
        group.add(background);

        const transformer = new Transformer({
            nodes: [],
            keepRatio: false,
            /*enabledAnchors: [
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ],*/
            draggable: true,
        });
        layer.add(transformer);

        //start test
        const rect1 = new Konva.Rect({
            x: 60,
            y: 60,
            width: 100,
            height: 90,
            fill: 'red',
            name: 'element',
            draggable: true,
        });
        group.add(rect1);

        const rect2 = new Konva.Rect({

            x: 250,
            y: 100,
            width: 150,
            height: 90,
            fill: 'green',
            name: 'element',
            draggable: true,
        });
        group.add(rect2);


        const circle = new Konva.Circle({
            name: 'element',
            x: 230,
            y: 100,
            radius: 60,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
        });

        group.add(circle);

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
        });

        group.add(triangle);

        const text = new Konva.Text({
            name: 'element',
            x: 10,
            y: 10,
            fontFamily: 'Calibri',
            fontSize: 24,
            text: 'this is text',
            fill: 'black',
            draggable: true,
        });
        group.add(text);

        //end test

        //start select transform
        const selectionRectangle = new Rect({
            fill: 'rgba(0, 161, 255,0.3)',//rgba(0,0,255,0.5)
            visible: false,
        });

        layer.add(selectionRectangle);

        let x1: number, y1: number, x2: number, y2: number;

        //test

        /*group.on('mouseenter',(e)=>{
            //console.log("group mouseenter",e.target);
            //console.log(this,"sdfsdfsdfsdf");
            //console.log(e.x);
            const shape : Shape = e.target;
            const highlighter=new Rect({
                name: "highlighter",
                x: shape.x(),
                y: shape.y(),
                rotation: shape.rotation(),
                width: shape.width(),
                height: shape.height(),
                listening: false,
                stroke: "rgb(0, 161, 255)",
                strokeWidth: 2,
                strokeScaleEnabled: false
            });
            group.add(highlighter);

        });

        group.on('mouseout',(e)=>{
            const highlighter =  group.find('.highlighter') ;
            highlighter.forEach((item)=>{
                item.destroy();
            })
        });*/

        //end test

        stage.on('mousedown touchstart', (e) => {
            // do nothing if we mousedown on any shape
            if (e.target !== stage) {
                return;
            }

            let pointerPosition: Vector2d = {x: 0, y: 0};
            if (stage.getPointerPosition() != null) {
                pointerPosition = stage.getPointerPosition() as Vector2d;
            }

            x1 = pointerPosition.x;
            y1 = pointerPosition.y;
            x2 = pointerPosition.x;
            y2 = pointerPosition.y;

            selectionRectangle.visible(true);
            selectionRectangle.width(0);
            selectionRectangle.height(0);
        });

        stage.on('mousemove touchmove', () => {

            // do nothing if we didn't start selection
            if (!selectionRectangle.visible()) {
                return;
            }


             let pointerPosition : Vector2d = { x:0, y :0 };
            if(stage.getPointerPosition()!=null){
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
        });

        stage.on('mouseup touchend', () => {
            // do nothing if we didn't start selection
            if (!selectionRectangle.visible()) {
                return;
            }
            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                selectionRectangle.visible(false);
            });

            const shapes = stage.find('.element');
            const box = selectionRectangle.getClientRect();
            const selected = shapes.filter((shape) =>
                Konva.Util.haveIntersection(box, shape.getClientRect())
            );
            transformer.nodes(selected);
        });


        // clicks should select/deselect shapes
        stage.on('click tap mousedown touchstart', function (e) {
            // console.log("stage mousedown");

            // if we are selecting with rect, do nothing
            if (selectionRectangle.visible()) {
                return;
            }

            // if click on empty area - remove all selections
            if (e.target === stage) {
                transformer.nodes([]);
                return;
            }

            // do nothing if clicked NOT on our rectangles
            if (!e.target.hasName('element')) {
                return;
            }

            // do we pressed shift or ctrl?
            const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
            const isSelected = transformer.nodes().indexOf(e.target) >= 0;

            if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                transformer.nodes([e.target]);
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                const nodes = transformer.nodes().slice(); // use slice to have new copy of array
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                transformer.nodes(nodes);
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = transformer.nodes().concat([e.target]);
                transformer.nodes(nodes);
            }
        });

        //end select transform

        //start snapping
        group.on('dragmove', (e) => {
            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());

            //debugger;
            // find possible snapping lines
            const lineGuideStops : LineGuideStops= this.getLineGuideStops(stage, e.target as Shape);
            // find snapping points of current object
            const itemBounds : SnappingEdges = this.getObjectSnappingEdges(e.target as Shape);

            // now find where can we snap current object
            const guides : guide[] = this.getGuides(lineGuideStops, itemBounds);

            // do nothing of no snapping
            if (!guides.length) {
                return;
            }

            this.drawGuides(layer, guides);

            const absPos = e.target.absolutePosition();
            // now force object position
            guides.forEach((lg) => {
                switch (lg.snap) {
                    case 'start': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'center': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'end': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        });

        group.on('dragend', (e) => {
            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());
        });

        //end snapping


    }

    //start snapping

    // were can we snap our objects?
    private getLineGuideStops(stage: Stage, skipShape : Shape) : LineGuideStops  {

        // we can snap to stage borders and the center of the stage
        const vertical: Array<number> = [0, stage.width() / 2, stage.width()];
        const horizontal: Array<number> = [0, stage.height() / 2, stage.height()];

        // and we snap over edges and center of each object on the canvas
        stage.find('.element').forEach((guideItem) => {
            if (guideItem === skipShape) {
                return;
            }
            const box = guideItem.getClientRect();
            // and we can snap to all edges of shapes
            vertical.push(...[box.x, box.x + box.width, box.x + box.width / 2]);
            horizontal.push(...[box.y, box.y + box.height, box.y + box.height / 2]);
        });
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    }

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    private getObjectSnappingEdges(node : Shape) : SnappingEdges{
        const box = node.getClientRect();
        const absPos = node.absolutePosition();

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
        };
    }

    private getGuides(lineGuideStops : LineGuideStops, itemBounds : SnappingEdges ) : guide[]{

        const GUIDELINE_OFFSET = 5;
        const resultV : Array<{lineGuide:number,diff:number,snap:string,offset:number}> = [];
        const resultH : Array<{lineGuide:number,diff:number,snap:string,offset:number}> = [];

        lineGuideStops.vertical.forEach((lineGuide : number) => {
            itemBounds.vertical.forEach((itemBound : Snapping) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < GUIDELINE_OFFSET) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide) => {
            itemBounds.horizontal.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < GUIDELINE_OFFSET) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        const guides : guide[] = [];

        // find closest snap
        const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    }

    private drawGuides(layer : Layer, guides : guide[]) {
        guides.forEach((lg: guide) => {
            if (lg.orientation === 'H') {
                const line = new Konva.Line({
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                const line = new Konva.Line({
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }

    //end snapping

    /*private Highlighter(element : Shape){

    }*/

    resizeStage(newWidth: number, newHeight: number): void {
        const state = this._state;
        const w = state.docWidth > newWidth ? state.docWidth : newWidth;
        const h = state.docHeight > newHeight ? state.docHeight : newHeight;
        const stage: UnwrapNestedRefs<Stage> = state.pages[state.currentPage - 1];
        stage.width(w);
        stage.height(h);
        const group: Group = stage.findOne('.main_group');
        group.x((stage.width() / 2) - (state.docWidth / 2));
        group.y((stage.height() / 2) - (state.docHeight / 2));
    }

    get textOption(): TextOption {
        return this._state.textOption;
    }

    applyOpacity(): void {
        this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
            item.opacity(this._state.opacity);
        })
    }

    applyDelete(): void {
        this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
            item.destroy();
        });
    }

    applyRotateDegrees(degrees: number): void {
        this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
            item.rotation(degrees);
        });
    }

    applyFontSize() {
        this._state.selectedElements.forEach((item: UnwrapNestedRefs<Shape>) => {
            (item as Text).fontSize(this._state.textOption.fontSize);
        });
    }
}

export const stageStore = new StageOptionStore();
