import { reactive, readonly } from "vue";
import element from '../../env/config.json';
import _ from 'lodash';
export default class UiElementStore {
    _state;
    constructor(state) {
        this._state = reactive(state);
    }
    get state() {
        return readonly(this._state);
    }
    // sample id : right_sidebar.upload.sample
    query(id) {
        let obj = _.get(this._state, id);
        if (obj) {
            return obj;
        }
        throw new Error(`not found element - the id ${id} not valid`);
    }
    isVisible(id) {
        let obj = this.query(id);
        if (obj) {
            return obj.visibility;
        }
    }
    isActive(id) {
        let obj = this.query(id);
        if (obj) {
            return obj.active;
        }
    }
    toggleVisible(id) {
        let obj = this.query(id);
        if (obj) {
            obj.visibility = !obj.visibility;
        }
    }
    toggleActive(id) {
        let obj = this.query(id);
        if (obj) {
            obj.active = !obj.active;
        }
    }
    active(id) {
        let obj = this.query(id);
        obj.active = true;
    }
    deactive(id) {
        let obj = this.query(id);
        obj.active = false;
    }
    show(id) {
        let obj = this.query(id);
        obj.visibility = true;
    }
    hide(id) {
        let obj = this.query(id);
        obj.visibility = false;
    }
}
export const uiStore = new UiElementStore(element);
//# sourceMappingURL=ui.js.map