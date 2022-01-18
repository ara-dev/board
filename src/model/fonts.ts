import { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'
import { reactive, readonly, Ref, ref } from 'vue'
import { baseURLApi } from '../../themeConfig'
import { stageStore } from '../core'
import axios from '../utils/axios'
import { useInstallFont } from '../utils/useInstallFont'

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
  queueInstall: Set<string> | string[]

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
    if (this.queueInstall) {
      this.installFonts(this.queueInstall as Set<string>)
    }
  }

  private _init() {
    this._state = {
      page: 0,
      total: 0,
      limit: 10,
    }
  }

  async installFonts(fonts: Set<string>) {
    if (!(this._rows.value && this._rows.value.length > 0)) {
      this.queueInstall = fonts
    } else {
      for (const fontName of fonts) {
        const font = this._rows.value.find((item) => item.name == fontName) as Font
        if (font) {
          await useInstallFont(font.name, `${baseURLApi}${font.storage}`)
        }
      }
      stageStore.reDraw()
    }
  }
}

export const fontsStore = new FontsStore()
