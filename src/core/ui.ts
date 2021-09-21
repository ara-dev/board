import {DeepReadonly, UnwrapNestedRefs} from "@vue/reactivity";
import {reactive, readonly} from "vue";

interface UiElement {
    active?: boolean
    visibility?: boolean
    group?: string
    children?: UiElement[]
}


export default class UiElementStore {

    _state !: UnwrapNestedRefs<UiElement[]>;

    constructor(state: []) {
        this._state = reactive(state);
    }

    get state(): DeepReadonly<UiElement[]> {
        return readonly(this._state);
    }


    // emaple id : right_sidebar.upload.sample
    query(id: string): UiElement {
        let a = id.split('.').join('.children.');
        return a as UiElement
    }

    isVisible(id: string) {

    }

    toggleVisible(id: string) {
        let obj: UiElement = this.query(id);
        if (obj) {
            obj.visibility = !obj.visibility
        }
    }

    toggleActive(id: string) {
        let obj: UiElement = this.query(id);
        if (obj) {
            obj.active = !obj.active
        }
    }

}
