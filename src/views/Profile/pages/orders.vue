<template>
  <div class="h-full">
    <div class="flex mb-3">
      <Icon :icon="pageInfo.icon" size="23" />
      <span class="mr-2 font-bold">{{ pageInfo.title }}</span>
    </div>
    <div :class="[`${prefixCls}-alert`, `${prefixCls}-alert-success`]" class="mb-3">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-extrabold title"
            >احمد رضای عزیز! سفارشات این قسمت مربوط به سفارشات شخصی شما می باشد.</p
          >
          <p class="mt-1 text-gray-400"
            >جهت پردازش سفارش های مشتریان به قسمت سفارش های مشتریان مراجعه کنید.</p
          >
        </div>
        <div>
          <AButton :class="[`${prefixVar}-button`]" size="large">انتقال به سفارش مشتریان</AButton>
        </div>
      </div>
    </div>
    <div :class="[`${prefixCls}-alert`, `${prefixCls}-alert-warning`]" class="mb-3">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-extrabold title">احمد رضای عزیز! سبد خرید شما نهایی نشده</p>
          <p class="mt-1 text-gray-400"
            >شما 2 آیتم انتخاب شده در سبد خرید خود دارید که جمعا به مبلغ 2.000.000 تومان می باشد.
            لطفا سبد خرید خود را نهایی کنید.</p
          >
        </div>
        <div>
          <AButton :class="[`${prefixVar}-button-secendry`]" size="large">مشاهده سبد خرید</AButton>
        </div>
      </div>
    </div>
    <Tabs />
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { useDesign } from '../../../utils/useDesign'
  import { usePageInfo } from '../../../utils/usePageInfo'
  const { prefixCls } = useDesign('orders')
  const { prefixVar } = useDesign('')
  const pageInfo = usePageInfo('orders')
</script>

<style lang="less">
  @pre: ~'@{prefix}-orders';

  .@{pre} {
    &-alert {
      border-radius: @border-radius-base;
      border: 1.75px solid;
      padding: 15px;

      &-success {
        border-color: @success-color;

        .title {
          color: @success-color;
        }
      }

      &-warning {
        border-color: @warning-color;
        .title {
          color: @warning-color;
        }
      }
    }
  }
</style>
