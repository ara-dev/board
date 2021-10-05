<template>
  <div class="relative h-screen" ref="mainboard">
      <div id="container" ></div>
  </div>
</template>

<script lang="ts" setup>
import {stageStore} from "../../core";
import {ref, onMounted, watch} from "vue";
import {useElementSize} from '@vueuse/core'


const mainboard = ref(null);
const {width, height} = useElementSize(mainboard);

watch([width, height], () => {

  stageStore.resizeStage(width.value,height.value);
});

onMounted(() => {
  stageStore.addPage('container',width.value,height.value);
})
</script>

<style>

</style>
