import { debouncedWatch, useDebouncedRefHistory, UseRefHistoryRecord } from '@vueuse/core'
import { Ref, ref } from 'vue'

const state = ref<any>([])
const eventUndoTrigger = ref<number>(0)
const eventRedoTrigger = ref<number>(0)
const __state = ref<any[]>([])

debouncedWatch(
  state,
  (n) => {
    if (!n || n.length === 0) {
      return
    }
    __state.value.push(n)
  },
  { deep: true, debounce: 100 },
)

const { history, undo, redo } = useDebouncedRefHistory(__state, { deep: true, debounce: 100 })

function clearTempState() {
  state.value = []
}

export interface StageHistory {
  history: Ref<UseRefHistoryRecord<any>[]>
  handleUndo: () => void
  handleRedo: () => void
  redo: () => void
  undo: () => void
  state: Ref<any[]>
  eventUndoTrigger: Ref<number>
  eventRedoTrigger: Ref<number>
  clearTempState: () => void
}

function handleUndo() {
  eventUndoTrigger.value++
}

function handleRedo() {
  eventRedoTrigger.value++
}

export default function useHistory(): StageHistory {
  return {
    state,
    history,
    clearTempState,
    eventRedoTrigger,
    eventUndoTrigger,
    handleUndo,
    redo,
    undo,
    handleRedo,
  }
}
