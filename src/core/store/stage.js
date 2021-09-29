import { reactive, readonly } from "vue";
import { Stage } from 'konva/lib/Stage';
import { uiStore } from "./ui";
export default class StageOptionStore {
    _state;
    constructor() {
        this._init();
        this._state = reactive(this._state);
        /*watch(this._state,()=>{
            console.log("this is wathc in select elements");
        });*/
    }
    get state() {
        return readonly(this._state);
    }
    _init() {
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
    get textFontSize() {
        return this._state.textFontSize;
    }
    set textFontSize(size) {
        this._state.textFontSize = size;
    }
    get opacity() {
        return this._state.opacity * 100;
    }
    set opacity(opacity) {
        this._state.opacity = opacity / 100;
    }
    get layerLock() {
        return this._state.layerLock;
    }
    get textAlign() {
        return this._state.textAlign;
    }
    set textAlign(textAlign) {
        this._state.textAlign = textAlign;
    }
    get pages() {
        return this._state.pages;
    }
    set selectedElements(shapes) {
        if (shapes.length == 1) {
            //console.log("this lenght is one");
            const selectedShape = shapes[0];
            //console.log( );
            if (selectedShape.getClassName() == 'Text') {
                const selectedText = selectedShape;
                this.textFontSize = selectedText.fontSize();
                this.textAlign = selectedText.align();
                uiStore.show('ui.text_option');
            }
        }
        else {
            uiStore.hide('ui.text_option');
        }
        this._state.selectedElements = shapes;
    }
    AddPage() {
        this._state.pages.push(new Stage({
            container: '#test',
            width: 500,
            height: 500,
        }));
    }
    applyOpacity() {
        this._state.selectedElements.forEach((item) => {
            item.opacity(this._state.opacity);
        });
    }
    applyDelete() {
        this._state.selectedElements.forEach((item) => {
            item.destroy();
        });
    }
}
export const stageStore = new StageOptionStore();
//# sourceMappingURL=stage.js.map