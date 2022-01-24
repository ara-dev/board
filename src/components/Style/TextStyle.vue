<template>
  <div>
    <p class="text-gray-500 mb-2 mt-3 text-xs font-semibold">دسته</p>
    <Select class="w-full">
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
      <SelectOption value="Yiminghe">yiminghe</SelectOption>
    </Select>

    <div class="grid grid-cols-2 gap-2 mt-3 ml-2">
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-2.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Select, SelectOption } from 'ant-design-vue/es'
</script>

<style lang="less">
  .image-style {
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: @border-radius-base;
    cursor: pointer;
  }
</style>
