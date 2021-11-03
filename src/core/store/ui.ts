import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import _ from 'lodash'
import { reactive, readonly } from 'vue'
import element from '../../env/config.json'

interface UiElement {
  active?: boolean
  visibility?: boolean
  group?: string
  children?: { [key: string]: UiElement }
}

export default class UiElementStore {
  private _state!: UnwrapNestedRefs<UiElement>

  constructor(state: {}) {
    this._state = reactive(state)
  }

  get state(): DeepReadonly<UiElement> {
    return readonly(this._state)
  }

  // sample id : right_sidebar.upload.sample
  query(id: string): UiElement {
    const obj = _.get(this._state, id)
    if (obj) {
      return obj as UiElement
    }
    throw new Error(`not found element - the id ${id} not valid`)
  }

  isVisible(id: string): boolean | void {
    const obj: UiElement = this.query(id)
    if (obj) {
      return obj.visibility
    }
  }

  isActive(id: string): boolean | void {
    const obj: UiElement = this.query(id)
    if (obj) {
      return obj.active
    }
  }

  toggleVisible(id: string): void {
    const obj: UiElement = this.query(id)
    if (obj) {
      obj.visibility = !obj.visibility
    }
  }

  toggleActive(id: string): void {
    const obj: UiElement = this.query(id)
    if (obj) {
      obj.active = !obj.active
    }
  }

  active(id: string): void {
    const obj: UiElement = this.query(id)
    obj.active = true
  }

  deActive(id: string): void {
    //console.log(id);
    const obj: UiElement = this.query(id)
    obj.active = false
  }

  show(id: string): void {
    const obj: UiElement = this.query(id)
    obj.visibility = true
  }

  hide(id: string): void {
    const obj: UiElement = this.query(id)
    obj.visibility = false
  }

  deActiveElementWhenNoneSelected() {
    const prefix_top_right = 'ui.stage_top_right_menu.children.'
    this.deActive(prefix_top_right + 'delete_button')
    this.deActive(prefix_top_right + 'copy_button')
    this.deActive(prefix_top_right + 'opacity_button')
    this.deActive(prefix_top_right + 'crop_button')
    this.deActive(prefix_top_right + 'lock_button')
    this.deActive(prefix_top_right + 'position_button')
    this.deActive(prefix_top_right + 'flip_rotate_button')
  }

  ActiveElementWhenSelected() {
    const prefix_top_right = 'ui.stage_top_right_menu.children.'
    this.active(prefix_top_right + 'delete_button')
    this.active(prefix_top_right + 'copy_button')
    this.active(prefix_top_right + 'opacity_button')
    this.active(prefix_top_right + 'lock_button')
    this.active(prefix_top_right + 'position_button')
    this.active(prefix_top_right + 'flip_rotate_button')
  }
}

export const uiStore = new UiElementStore(element)
