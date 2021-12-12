<template>
  <Design>
    <template #image>
      <img
        :src="`https://picsum.photos/200/400?${Date.now()}`"
        class="object-cover w-full h-full"
      />
    </template>
    <template #info>
      <div class="w-full">
        <div class="inline-flex items-center">
          <div :class="['inline', `${prefixCls}-btn-edit`]">
            <AButton type="primary">
              <template #icon> <Icon :size="20" icon="ion:create-outline" /></template>
            </AButton>
          </div>
          <div class="inline-flex flex-col mr-3">
            <span class="font-bold mb-1"> عنوان طرح</span>
            <span class="text-xs font-thin text-gray-400">90 دقیقه پیش</span>
          </div>
        </div>
        <div class="inline float-left">
          <AAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
      </div>
    </template>
  </Design>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  import Design from './Design.vue'

  const { prefixCls } = useDesign('mydesign')
</script>

<style lang="less">
  @pre: ~'@{prefix}-mydesign';

  .@{pre}-btn-edit {
    .ant-btn-primary {
      color: #3f3f46;
      background: #ffd100;
      border-color: #ffd100;
    }
  }
</style>
