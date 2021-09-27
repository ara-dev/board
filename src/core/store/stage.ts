import {DeepReadonly, UnwrapNestedRefs} from "@vue/reactivity";
import {reactive, readonly} from "vue";
/*import sta from 'konva'*/
/*import _ from 'lodash';*/

interface StageOption {
    textFontFamily : string,
    textFontSize : number,
    textAlign : string,
    layerLock : boolean ,
    opacity : number ,
    selectElements : null ,
    //pages
    //pages :  arr
    /*solidColor : string ,*/
}

/*
enum align {
     Left = "left",
    Center = "center",
    Right = "right",
    Justify ="justify"
}
*/

export default class StageOptionStore {

    _state !: UnwrapNestedRefs<StageOption>;

    //state? : StageOption
    constructor() {
        this._init();
        this._state = reactive(this._state);
    }


    get state(): DeepReadonly<StageOption> {
        return readonly(this._state);
    }

    _init(){
        const temp : StageOption= {
            textFontSize : 16,
            textFontFamily:"B Yekan",
            textAlign :"right" ,
            layerLock : false ,
            opacity : 30,
            selectElements : null
        }
        this._state= temp;
    }

    get textFontSize() : number{
        return this._state.textFontSize;
    }

    set textFontSize(size:number) {
        this._state.textFontSize=size;
    }

    get opacity():number{
        return this._state.opacity;
    }

    set opacity(opacity){
        this._state.opacity=opacity;
    }

    get layerLock() : boolean{
        return this._state.layerLock;
    }

    get textAlign() : string{
        return this._state.textAlign;
    }

    set textAlign(textAlign) {
        this._state.textAlign=textAlign;
    }


}
