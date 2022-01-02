import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly } from 'vue'
import axios from '../utils/axios'

export interface FileModel {
  name?: string
  storage?: string
  type?: string
  owner?: string
  size?: number
  color?: string
  updated_at?: string
  created_at?: string
}

export default class FileStore {
  constructor() {
    this._init()
    this._state = reactive(this._state)
  }

  private _state!: UnwrapNestedRefs<FileModel>

  get state(): DeepReadonly<UnwrapNestedRefs<UnwrapNestedRefs<FileModel>>> {
    return readonly(this._state)
  }

  async upload(file: Blob) {
    const formData = new FormData()
    formData.append('file', file, file.type)
    return await axios.post('file', formData)
  }

  private _init() {
    this._state = {}
  }
}

export const fileStore = new FileStore()
