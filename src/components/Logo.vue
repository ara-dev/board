<template>
  <!--  <div > </div>-->
  <img :id="`${prefixCls}-logo`" src="../assets/img/logo.svg" />
</template>

<script lang="ts" setup>
  import { useDesign } from '../utils/useDesign'
  const { prefixCls } = useDesign('logo')
</script>

<style lang="less" scoped>
  @pre : ~'@{namespace}-logo';
  #@{pre}-logo{
    width: @cp-side-width*0.6;
    height: @cp-side-width*0.6;
    position: absolute;
    bottom: @cp-side-width*0.2;
    right: @cp-side-width*0.2;
  }
</style>
