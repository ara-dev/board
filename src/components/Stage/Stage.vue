<template>
  <div ref="mainboard" class="relative w-full h-full">
    <div class="overflow-auto absolute h-full w-full">
      <div id="container" class="outline-transparent"></div>
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
    stageStore.addPage(1080, 1080, width.value, height.value, 'container')
  })
</script>

<style></style>
