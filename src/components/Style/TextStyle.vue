<template>
  <div>
    <p class="text-gray-500 mb-2 mt-3 text-xs font-semibold">دسته</p>
    <ASelect class="w-full">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </ASelect>

    <div class="grid grid-cols-2 gap-2 mt-3 mr-2">
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-2.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/test-style-1.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
  .image-style {
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: @border-radius-base;
    cursor: pointer;
  }
</style>
