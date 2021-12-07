import _ from 'lodash';
import { reactive, readonly } from 'vue';
import element from '../../env/config.json';
export default class UiElementStore {
    constructor(state) {
        this._state = reactive(state);
    }
    get state() {
        return readonly(this._state);
    }
    // sample id : right_sidebar.upload.sample
    query(id) {
        const obj = _.get(this._state, id);
        if (obj) {
            return obj;
        }
        throw new Error(`not found element - the id ${id} not valid`);
    }
    isVisible(id) {
        const obj = this.query(id);
        if (obj) {
            return obj.visibility;
        }
    }
    isActive(id) {
        const obj = this.query(id);
        if (obj) {
            return obj.active;
        }
    }
    toggleVisible(id) {
        const obj = this.query(id);
        if (obj) {
            obj.visibility = !obj.visibility;
        }
    }
    toggleActive(id) {
        const obj = this.query(id);
        if (obj) {
            obj.active = !obj.active;
        }
    }
    active(id) {
        const obj = this.query(id);
        obj.active = true;
    }
    deActive(id) {
        //console.log(id);
        const obj = this.query(id);
        obj.active = false;
    }
    show(id) {
        const obj = this.query(id);
        obj.visibility = true;
    }
    hide(id) {
        const obj = this.query(id);
        obj.visibility = false;
    }
    deActiveElementWhenNoneSelected() {
        const prefix_top_right = 'ui.stage_top_right_menu.children.';
        this.deActive(prefix_top_right + 'delete_button');
        this.deActive(prefix_top_right + 'copy_button');
        this.deActive(prefix_top_right + 'opacity_button');
        this.deActive(prefix_top_right + 'crop_button');
        this.deActive(prefix_top_right + 'lock_button');
        this.deActive(prefix_top_right + 'position_button');
        this.deActive(prefix_top_right + 'flip_rotate_button');
    }
    ActiveElementWhenSelected() {
        const prefix_top_right = 'ui.stage_top_right_menu.children.';
        this.active(prefix_top_right + 'delete_button');
        this.active(prefix_top_right + 'copy_button');
        this.active(prefix_top_right + 'opacity_button');
        this.active(prefix_top_right + 'lock_button');
        this.active(prefix_top_right + 'position_button');
        this.active(prefix_top_right + 'flip_rotate_button');
    }
}
export const uiStore = new UiElementStore(element);
//# sourceMappingURL=ui.js.map