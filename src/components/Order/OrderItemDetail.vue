<template>
  <Collapse :bordered="false" :class="[`${prefixCls}`]">
    <template #expandIcon="{ isActive }">
      <div>
        <Icon color="#a1a1a1" icon="ion:chevron-down-outline" size="20" />
      </div>
    </template>
    <CollapsePanel key="1">
      <template #header>
        <div class="p-3" style="display: grid; grid-template-columns: 75px auto 75px">
          <div>
            <img :src="`https://picsum.photos/75/75?s=1`" style="border-radius: 4px" />
          </div>
          <div class="flex flex-col ml-3">
            <span class="text-xl font-medium select-none"> آلبوم کودکانه مناسب تولد </span>
            <div class="mt-3">
              <Tag color="#2DA771">تکمیل شده</Tag>
              <span class="ml-3"> 250.000 تومان در 2 آیتم در وضعیت انجام شده می باشد.</span>
            </div>
          </div>
        </div>
      </template>
      <div class="grid grid-cols-3 gap-4 p-3">
        <div class="flex">
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">شناسه آیتم:</span>
          <span class="ml-1 mt-1 text-gray-600">#568952</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">زمان ثبت :</span>
          <span class="ml-1 mt-1 text-gray-600">1400/05/01 14:00:30</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">آخرین به روز رسانی :</span>
          <span class="ml-1 mt-1 text-gray-600">1400/05/01 14:00:30</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">تعداد صفحات :</span>
          <span class="ml-1 mt-1 text-gray-600">4 صفحه</span>
        </div>
        <div></div>
        <div></div>
        <div>
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">هزینه چاپ :</span>
          <span class="ml-1 mt-1 text-gray-600">155،000 تومان</span>
        </div>
        <div></div>
        <div>
          <span class="text-2xl font-bold text-gray-400">&#8226;</span>
          <span class="ml-1 mt-1 text-gray-400">جمع مبلغ طرح :</span>
          <span class="ml-1 mt-1 text-gray-600">25،000 تومان</span>
        </div>
      </div>
    </CollapsePanel>
  </Collapse>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useDesign } from '@b/utils/useDesign'
  const { prefixCls } = useDesign('order-item-detail')

  import { Tag, Collapse, CollapsePanel } from 'ant-design-vue'
  import Icon from '@b/components/Icon/Icon.vue'

  const showDetail = ref(false)
  const activeKey = ref(['1'])
</script>

<style lang="less">
  @pre: ~'@{prefix}-order-item-detail';

  .@{pre}{
    background-color: #fff ;

    .ant-collapse-arrow{
      transition: all 0.3s;
    }

    .ant-collapse-item-active{
      .ant-collapse-arrow{
        transform: rotate(-180deg) !important;
      }
    }

    .ant-collapse-item{
      border:1px solid #eee;
      margin-bottom: 20px;
    }

  }
</style>
