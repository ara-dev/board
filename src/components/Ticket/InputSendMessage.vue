<template>
  <div :class="['relative', `${prefixCls}`]">
    <div :class="['absolute z-10', `${prefixCls}-button-send`]">
      <Button shape="circle" type="text">
        <Icon
          :class="[`${prefixCls}-icon-button-send`]"
          color="rgb(45, 167, 113)"
          icon="ion:send-outline"
          size="25"
        />
      </Button>
    </div>
    <Textarea
      :auto-size="{ minRows: 4, maxRows: 5 }"
      placeholder="لطفا پیام خود را وارد نمایید..."
    />
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@b/utils/useDesign'
  import Icon from '../Icon/Icon.vue'
  import { Button, Textarea } from 'ant-design-vue/es'

  const { prefixCls } = useDesign('input-send-message')
</script>

<style lang="less">
  @pre: ~'@{prefix}-input-send-message';

  .@{pre}{
      //background: red;
    &-button-send{
      bottom: 5px;
      left: 15px;
      //background: red;
    }

    &-icon-button-send{
      transform: rotate(180deg);
      color: @primary-color;
    }
  }
</style>
