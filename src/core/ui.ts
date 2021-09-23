import {DeepReadonly, UnwrapNestedRefs} from "@vue/reactivity";
import {reactive, readonly} from "vue";
import _ from 'lodash';

interface UiElement {
    active?: boolean
    visibility?: boolean
    group?: string
    children?: { [key: string]: UiElement }
}

export default class UiElementStore {

    _state !: UnwrapNestedRefs<UiElement>;

    constructor(state: {}) {
        this._state = reactive(state);
    }

    get state(): DeepReadonly<UiElement> {
        return readonly(this._state);
    }

    // sample id : right_sidebar.upload.sample
    query(id: string): UiElement {
        let obj = _.get(this._state, id);
        if (obj) {
            return obj as UiElement;
        }
        throw new Error(`not found element - the id ${id} not valid`)
    }

    isVisible(id: string): boolean | void {
        let obj: UiElement = this.query(id);
        if (obj) {
            return obj.visibility;
        }
    }

    isActive(id: string): boolean | void {
        let obj: UiElement = this.query(id);
        if (obj) {
            return obj.active;
        }
    }

    toggleVisible(id: string): void {
        let obj: UiElement = this.query(id);
        if (obj) {
            obj.visibility = !obj.visibility
        }
    }

    toggleActive(id: string): void {
        let obj: UiElement = this.query(id);
        if (obj) {
            obj.active = !obj.active
        }
    }

    active(id: string): void {
        let obj: UiElement = this.query(id);
        obj.active = true;
    }

    deactive(id: string): void {
        let obj: UiElement = this.query(id);
        obj.active = false;
    }

    show(id: string) : void {
        let obj: UiElement = this.query(id);
        obj.visibility = true;
    }

    hide(id: string) : void {
        let obj: UiElement = this.query(id);
        obj.visibility = false;
    }
}
