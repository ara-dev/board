<template>
  <div>
    <!--    progress-dot-->
    <ASteps
      :class="['right-step', `${prefixCls}-step`]"
      :current="3"
      direction="vertical"
      progress-dot
    >
      <AStep description="This is a description. This is a description.">
        <template #title>sdfsdfsdf</template>
        <template #description>
          <span>This is a description.</span>
        </template>
      </AStep>
      <AStep description="This is a description. This is a description." title="Finished" />
      <AStep description="This is a description. This is a description." title="In Progress" />
      <AStep description="This is a description." title="Waiting" />
      <AStep description="This is a description." title="Waiting" />
      <!--      prefixCls-->
      <!--      <template #progressDot="{ index, status }">
        <span
          style="
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: block;
            border: 4.84615px solid #2da771;
          "
        ></span>
        &lt;!&ndash;        <APopover>
          <template #content>
            <span>step {{ index }} status: {{ status }}</span>
          </template>
          &lt;!&ndash;:class="`${prefixCls}-icon-dot`"&ndash;&gt;
          &lt;!&ndash;          <span
            style="
              border-radius: 50%;
              width: 18px;
              height: 18px;
              display: block;
              border: 4.84615px solid #2da771;
            "
          ></span>&ndash;&gt;
          <span>1</span>
        </APopover>&ndash;&gt;
      </template>-->
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

   .@{pre}-step{
        //background: red;
   }

  .right-step{
      direction: rtl;
    & .ant-steps-item-icon{
      float: right;
    }

     &  .ant-steps-item-tail {
       right: 20px;
     }

    & .ant-steps-item-process .ant-steps-icon-dot{
      right: 0 ;
    }
  }
</style>
