<template>
  <ATag :class="[`${prefixVar}-tag`, 'wating-for-accept']">تایید کار</ATag>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixCls } = useDesign('register-design-status')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design-status';

  .@{prefix}-tag{
    font-size: 15px;
    padding:5px 10px;
    background: #fff;
    color: #fff;

    &.success-job{
       background: @primary-color;
    }

    &.no-upload{
      border-color: @secondary-color;
      color: @secondary-color;
    }

    &.need-edit{
      background: #DC2626;
    }

    &.final-accepted{
      border-color: @primary-color;
      color: @primary-color;
    }

    &.rejected{
      border-color: #DC2626;
      color: #DC2626;
    }

    &.worked{
      border-color:#3B82F6;
      color: #3B82F6;
    }

    &.wating-for-accept{
      border-color: #F97316;
      color: #F97316;
    }

  }
</style>
