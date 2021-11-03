<template>
  <div
    class="py-3 px-1 cursor-pointer select-none text-center"
    :class="{ 'toolbar-item-selected': selected }"
  >
    <slot></slot>
    <p class="text-xs text-center mt-1.5">{{ title }}</p>
  </div>
</template>

<script lang="ts" setup>
  interface toolbarItem {
    selected?: boolean
    title?: string
  }

  withDefaults(defineProps<toolbarItem>(), {
    selected: false,
    title: '',
  })
</script>

<style lang="less">
  @import 'src/assets/css/var';

  .toolbar-item-selected {
    background: fadeout(@primary-color, 75%);
    border-left: 2px solid @primary-color;
    margin-left: -1px;

    p {
      color: @primary-color;
    }

    .toolbar-icon {
      color: @primary-color;
    }
  }
</style>
