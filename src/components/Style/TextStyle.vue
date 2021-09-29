<template>
  <div>
    <p class="text-gray-500	mb-2 mt-3 text-xs font-semibold">دسته</p>
    <a-select class="w-full">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>

    <div class="grid grid-cols-2 gap-2 mt-3 mr-2">
      <img src="../../assets/img/temp/test-style-1.svg" class="image-style" />
      <img src="../../assets/img/temp/test-style-2.svg" class="image-style" />
      <img src="../../assets/img/temp/test-style-1.svg" class="image-style" />
      <img src="../../assets/img/temp/test-style-1.svg" class="image-style" />
      <img src="../../assets/img/temp/test-style-1.svg" class="image-style" />
      <img src="../../assets/img/temp/test-style-1.svg" class="image-style" />
    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less">
@import 'src/assets/css/var.less';
.image-style{
  padding: 15px 10px;
  border:1px solid #eee;
  border-radius: @border-radius-base;
  cursor: pointer;
}
</style>