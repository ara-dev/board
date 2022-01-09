import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly, Ref, ref } from 'vue'
import axios from '../utils/axios'

interface Font {
  _id: string
  icon: string
  name: string
  fa_name: string
  storage: string
}

interface FontState {
  page: number
  limit: number
  total: number
}

export default class FontsStore {
  constructor() {
    this._init()
    this._rows = ref([])
    this._state = reactive(this._state)
  }

  private _rows!: Ref<Font[]>

  get rows(): Font[] {
    return this._rows.value
  }

  private _state!: UnwrapNestedRefs<FontState>

  get state(): DeepReadonly<UnwrapNestedRefs<UnwrapNestedRefs<FontState>>> {
    return readonly(this._state)
  }

  async getFont(page = 0, limit = 20) {
    const { data } = await axios.get('font')
    this._rows.value = data.data as Font[]
  }

  private _init() {
    this._state = {
      page: 0,
      total: 0,
      limit: 10,
    }
  }
}

export const fontsStore = new FontsStore()
