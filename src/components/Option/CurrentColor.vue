<template>
  <Input
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
  import { Input } from 'ant-design-vue'
</script>

<style scoped></style>
