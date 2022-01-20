<template>
  <Button class="icon-button" :class="{ title: title }">
    <Icon :icon="icon" :size="size" />
    <span v-if="title">{{ title }}</span>
  </Button>
</template>

<script lang="ts" setup>
  import { Button } from 'ant-design-vue'
  import Icon from '../Icon/Icon.vue'

  const props = withDefaults(
    defineProps<{
      icon: string
      title?: string
      size?: number | string
    }>(),
    { size: 16 },
  )
</script>

<style lang="less">
  .icon-button {
    padding: 0;
    aspect-ratio: 1;
    display: flex !important;
    align-items: center !important;
    justify-content: center;
    border-color: transparent;
    box-shadow: none;
    &:hover {
      border-color: @primary-color;
    }
    color: #727272;
    transition-duration: 0.1s !important;
    &.title {
      aspect-ratio: auto;
      display: flex;
      gap: 8px;
      padding: 0 8px;
    }
  }
</style>
