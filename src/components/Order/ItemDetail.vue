<template>
  <a-card :class="[`${prefixCls}`]">
    <div class="p-3" style="display: grid; grid-template-columns: 150px auto 75px">
      <div>
        <img :src="`https://picsum.photos/150/150?${Date.now()}`" style="border-radius: 4px" />
      </div>
      <div class="flex flex-col mr-5">
        <span class="text-2xl font-medium"> آلبوم کودکانه مناسب تولد </span>
        <div class="mt-3">
          <a-tag color="#2DA771">تکمیل شده</a-tag>
          <span>250.000 تومان در 2 آیتم در وضعیت انجام شده می باشد.</span>
        </div>
      </div>
      <div>
        <Icon icon="ion:chevron-down-outline" size="20" />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixCls } = useDesign('order-item-detail')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{namespace}-order-item-detail';

  .@{pre}{

    margin-bottom:1rem;

    .ant-card-body {
      //padding: 0;
      //height: 100%;
    }
  }
</style>
