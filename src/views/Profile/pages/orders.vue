<template>
  <div class="h-full p-4">
    <div class="flex mb-3">
      <Icon :icon="pageInfo?.icon" size="23" />
      <span class="ml-2 font-bold">{{ pageInfo?.title }}</span>
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
          <Button ghost size="large" type="primary">انتقال به سفارش مشتریان</Button>
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
          <Button :class="[`${prefixVar}-button-secondary`]" size="large">مشاهده سبد خرید</Button>
        </div>
      </div>
    </div>
    <Tabs>
      <TabPane key="4" tab="درآمد">Content of Tab Pane 1</TabPane>
      <TabPane key="3" force-render tab="ناموفق">Content of Tab Pane 2</TabPane>
      <TabPane key="2" tab="انجام شده">Content of Tab Pane 3</TabPane>
      <TabPane key="1" class="p-2" tab="همگی">
        <ListItem />
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '@b/components/Tabs/index.vue'
  import { useDesign } from '@b/utils/useDesign'
  import { usePageInfo } from '@b/views/Profile/hook/usePageInfo'
  import Icon from '@b/components/Icon/Icon.vue'
  import { Button, TabPane } from 'ant-design-vue/es'
  import ListItem from '@b/components/Transaction/ListItem'

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
