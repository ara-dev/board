<template>
  <div :class="{ 'flex-row-reverse': props.type == 'reply' }" class="flex mb-5">
    <div class="w-2/12"> <img class="rounded-full" src="https://picsum.photos/120/120" /> </div>
    <div
      :class="[
        'w-10/12 p-2 leading-7',
        `${prefixCls}-text`,
        { message: props.type == 'message', reply: props.type == 'reply' },
        props.type == 'message' ? 'mr-2' : 'ml-2',
      ]"
    >
      <p class="text-justify">
        با سلام خدمت تیم کنترل پی این طرح را از سایت فری پیک دانلود کردم و در حال حاضر آمادگی تغییر
        و اصلاح آن به فارسی را دارم با سلام خدمت تیم کنترل پی این طرح را از سایت فری پیک دانلود کردم
        و در حال حاضر آمادگی تغییر و اصلاح آن به فارسی را دارم با سلام خدمت تیم کنترل
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import { useDesign } from '../../utils/useDesign'
  interface Props {
    type?: 'message' | 'reply'
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'message',
  })

  const { prefixCls } = useDesign('ticket-message')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-ticket-message';

  .@{pre}-text{
    border-radius:@border-radius-base;

    &.message{
      background: rgba(169, 170, 170, 0.05);
      color: #71717a;
      border: 1px solid rgba(196, 196, 196, 0.25);
    }

    &.reply{
      /*background:fade(@primary-color,25%);*/
      background: rgba(45, 167, 113, 0.05);
      color: @primary-color;
      border: 1px solid rgba(45, 167, 113, 0.25);
    }
  }
</style>
