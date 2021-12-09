<template>
  <div ref="mainboard" class="relative h-screen">
    <div id="container"></div>
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
    stageStore.addPage(150, 300, width.value, height.value, 'container')
    //stageStore.resizeStage(width.value, height.value)
    //stageStore.toJson('container')
  })
</script>

<style></style>
