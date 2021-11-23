<template>
  <a-card :class="[`${prefixCls}`]" class="h-full">
    <div class="h-full" style="display: grid; grid-template-columns: auto 400px">
      <div style="display: grid; grid-template-rows: 55px auto">
        <div class="border-b p-3">
          <span class="font-extrabold text-lg text-gray-500">سفارش #ak250025</span>
        </div>
        <div class="p-3">
          <ItemDetail />
          <ItemDetail />
        </div>
      </div>
      <div class="border-r"></div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../../utils/useDesign'
  import ItemDetail from '../../../components/Order/ItemDetail.vue'
  const { prefixCls } = useDesign('order-detail')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{namespace}-order-detail';

  .@{pre}{
    .ant-card-body {
      padding: 0;
      height: 100%;
    }
  }
</style>
