import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'

interface Design {
  title: string
  owner: string
  status: number
  data: {
    type: Object
    default: {}
  }
  files: {
    default: []
  }
  updated_at: string
  created_at: string
  deleted_at: string
}

export default class DesignStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<Design>

  get state(): DeepReadonly<Design> {
    return readonly(this._state)
  }

  private _init() {
    // this._state = {}
  }
}

export const designStore = new DesignStore()
