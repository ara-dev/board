import {DeepReadonly, UnwrapNestedRefs} from "@vue/reactivity";
import {reactive, readonly} from "vue";
import {Stage} from 'konva/lib/Stage'
import {Shape} from 'konva/lib/Shape'
import {Text} from 'konva/lib/shapes/Text'
import {uiStore} from "./ui";
/*import {stage} from "../index";*/


interface StageOption {
    textFontFamily: string,
    textFontSize: number,
    textAlign: string,
    layerLock: boolean,
    opacity: number,
    selectedElements: Shape[],
    currentPage: number,
    pages: Stage[],
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
            textFontSize: 16,
            textFontFamily: "B Yekan",
            textAlign: "right",
            layerLock: false,
            opacity: 1,
            selectedElements: [],
            currentPage: 1,
            pages: [],
        };
    }

    get textFontSize(): number {
        return this._state.textFontSize;
    }

    set textFontSize(size: number) {
        this._state.textFontSize = size;

    }

    get opacity(): number {
        return this._state.opacity * 100;
    }

    set opacity(opacity) {
        this._state.opacity = opacity / 100;
    }

    get layerLock(): boolean {
        return this._state.layerLock;
    }

    get textAlign(): string {
        return this._state.textAlign;
    }

    set textAlign(textAlign) {
        this._state.textAlign = textAlign;
    }

    get pages(): UnwrapNestedRefs<Stage[]> {
        return this._state.pages;
    }

    set selectedElements(shapes: Shape[]) {
        if (shapes.length == 1) {
            //console.log("this lenght is one");
            const selectedShape = shapes[0];
            //console.log( );
            if (selectedShape.getClassName() == 'Text') {
                const selectedText: Text=selectedShape as Text;
                this.textFontSize=selectedText.fontSize();
                this.textAlign=selectedText.align();
                uiStore.show('ui.text_option');
            }
        } else {
            uiStore.hide('ui.text_option');
        }
        this._state.selectedElements = shapes;
    }

    AddPage() {
        this._state.pages.push(
            new Stage({
                container: '#test',
                width: 500,
                height: 500,
            })
        )
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

    applyFontSize(){
        this._state.selectedElements.forEach((item: UnwrapNestedRefs<Text>) => {
            item.fontSize(this.textFontSize);
        });
    }


}

export const stageStore = new StageOptionStore();
