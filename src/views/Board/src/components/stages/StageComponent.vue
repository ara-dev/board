<template>
  <div ref="mainBoard" class="relative w-full h-full">
    <div class="overflow-auto absolute h-full w-full">
      <div ref="container" id="container" class="outline-transparent"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { stageStore } from '@b/core'
  import { ref, onMounted, watch } from 'vue'
  import { useElementSize } from '@vueuse/core'
  import { fontsStore } from '@b/model/fonts'

  const mainBoard = ref(null)
  const container = ref<HTMLDivElement | null>(null)
  const { width, height } = useElementSize(mainBoard)

  watch([width, height], () => {
    stageStore.resizePage(width.value, height.value)
  })

  onMounted(async () => {
    await fontsStore.getFont()
    stageStore.initBoard(container.value as HTMLDivElement)
    //stageStore.addPage(500, 600, width.value, height.value, 'container')
    //const design =Object.assign({},unref(toRaw((stageStore.state.design))))
    //stageStore.importFromJson(stageStore.state.design,container.value as HTMLDivElement)
  })
</script>

<style></style>
