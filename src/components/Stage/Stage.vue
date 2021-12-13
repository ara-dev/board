<template>
  <div ref="mainboard" class="overflow-auto" style="width: 100%; height: 90%; position: absolute">
    <div class="relative h-full">
      <div id="container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../core'
  import { ref, onMounted, watch } from 'vue'
  import { useElementSize } from '@vueuse/core'

  const mainboard = ref(null)
  const { width, height } = useElementSize(mainboard)

  watch([width, height], () => {
    stageStore.resizePage(width.value, height.value)
  })

  onMounted(() => {
    //debugger
    //stageStore.setContainer('container')
    stageStore.addPage(1080, 1080, width.value, height.value, 'container')
    //stageStore.resizeStage(width.value, height.value)
    //stageStore.toJson('container')
  })
</script>

<style></style>
