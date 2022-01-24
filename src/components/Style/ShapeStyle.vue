<template>
  <div>
    <p class="text-gray-500 mb-2 mt-3 text-xs font-semibold">دسته</p>
    <Select class="w-full">
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
      <SelectOption value="Yiminghe">yiminghe</SelectOption>
    </Select>
    <div class="grid grid-cols-2 gap-2 mt-3 ml-2">
      <img class="image-style" src="../../assets/img/temp/shape-style-1.svg" />
      <img class="image-style" src="../../assets/img/temp/shape-style-1.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Select, SelectOption } from 'ant-design-vue/es'
</script>

<style></style>
