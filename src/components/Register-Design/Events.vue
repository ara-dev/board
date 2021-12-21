<template>
  <div>
    <ASteps :class="['right-step', `${prefixCls}-step`]" :current="2" direction="vertical">
      <template #progressDot="{ index, status }">
        <div :class="[`${prefixCls}-progress-dot`]"></div>
      </template>

      <AStep v-for="i in 4" :key="i">
        <template #title>
          <span :class="['text-xs block ', `${prefixVar}-text-color-primary`]"
            >1400/12 15 شنبه 10:15</span
          >
          <span class="text-gray-500">ثبت طرح در پلتفرم</span>
        </template>
        <template #description>
          <div class="py-2 px-3 my-3 text-justify description mx-4"
            >توسط احمد رضا عزیزان طرح مورد نظر در سایت بارگذاری شد توسط احمد رضا عزیزان طرح مورد نظر
            در سایت بارگذاری شد توسط احمد رضا عزیزان طرح مورد نظر در سایت بارگذاری شد توسط احمد رضا
            عزیزان طرح مورد نظر در سایت بارگذاری شد
          </div>
        </template>
      </AStep>
    </ASteps>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixCls } = useDesign('register-design-events')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design-events';

    .@{pre}-progress-dot{
      width: 18px;
      height: 18px;
      border: 5px solid @primary-color;
      border-radius: 50%;
      display: block;
      background: #fff;
    }

   .@{pre}-step{

     & .ant-steps-item-tail{
        padding: 0 !important;
     }

     & .ant-steps-item-icon{
       margin-top: 0 !important;

     }

     & .ant-steps-icon{
       right: -5px;
     }

     & .ant-steps-item-content {
       width: 100%;
       margin-right: 25px;
     }

     & .ant-steps-item-description{
       margin-left: 25px;
     }

     & .description{
       background: rgba(169, 170, 170, 0.05);
       border: 1px solid rgba(196, 196, 196, 0.25);
       box-sizing: border-box;
       border-radius: 4px;
     }

     & .ant-steps-item-wait .ant-steps-item-tail::after , & .ant-steps-item-process .ant-steps-item-tail::after{
       border: 1px dashed gray;
       background: none;
       border-inline-start-style: none;
       border-right: none;
     }

   }
</style>
