<template>
  <a-input
    v-model:value="stageStore.currentColor.hex"
    placeholder="Basic usage"
    style="width: 30%; display: inline"
  />
  <span
    :style="`display: inline;width:30px;height:32px;background:${stageStore.currentColor.hex} `"
  ></span>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../core'
</script>

<style scoped></style>
