<template>
  <Design hoverable>
    <template #image>
      <img
        :src="`https://picsum.photos/200/400?${Date.now()}`"
        class="object-cover w-full h-full"
      />
    </template>
    <template #info>
      <div class="w-full">
        <div class="inline-flex items-center">
          <div class="inline-flex flex-col ml-3">
            <span class="font-bold mb-1"> عنوان طرح</span>
            <span class="text-xs font-thin text-gray-400">500 تومان</span>
          </div>
        </div>
        <div class="inline float-left">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
      </div>
    </template>
  </Design>
</template>

<script lang="ts" setup>
  import Design from './Design.vue'
  import { Avatar } from 'ant-design-vue'
  //import { useDesign } from '../../utils/useDesign'
  //const { prefixCls } = useDesign('mydesign')
</script>

<style scoped></style>
