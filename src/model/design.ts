import { UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'

export interface Design {
  title: string
  code: string
  type: number
  price: object
  creator: string
  owners: string[]
  tags: string[]
  size: string
  id: string
  owner: string
  status: number
  data: object
  files: string[]
  updated_at?: string
  created_at?: string
}

export default class DesignStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<Design[]>

  get state() {
    return readonly(this._state)
  }

  list() {
    return this._state
  }

  addDesign(design: Design) {
    this._state.push(design)
  }

  uploadDesign() {
    console.log('this is desing', this._state)
  }

  private _init() {
    this._state = []
  }
}

export const designStore = new DesignStore()
