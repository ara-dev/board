<template>
  <ACard :class="[`${prefixCls}`]" class="h-full">
    <div class="h-full" style="display: grid; grid-template-columns: auto 400px">
      <div style="display: grid; grid-template-rows: 55px auto">
        <div class="border-b p-3">
          <span class="font-extrabold text-lg text-gray-500">سفارش #ak250025</span>
        </div>
        <div>
          <div class="p-3">
            <ItemDetail />
          </div>
          <div class="grid grid-cols-12 border-t">
            <div class="col-span-6 p-3 flex flex-col">
              <div class="flex justify-between">
                <span class="text-gray-400">جمع هزنیه چاپ :</span>
                <span class="text-gray-400 font-bold">20،000 تومان</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">هزینه ارسال :</span>
                <span class="text-gray-400 font-bold">20،000 تومان</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">تخفیف :</span>
                <span :class="[`${prefixVar}-text-color-primary`]" class="text-gray-400 font-bold"
                  >20،000 تومان</span
                >
              </div>
            </div>
            <div class="col-span-6 border-r px-20 py-10 text-center">
              <span class="text-gray-400"> هیچ طرح تخفیفی برای این سفارش به ثبت نرسیده است.</span>
            </div>
          </div>
          <div class="grid grid-cols-12 border-t border-b">
            <div class="col-span-6 p-3 flex justify-between items-center">
              <span class="font-bold text-gray-400">جمع مبلغ پرداختی :</span>
              <span :class="[`${prefixVar}-text-color-primary`, 'font-extrabold']"
                >250،000 تومان</span
              >
            </div>
            <div class="col-span-6 border-r flex p-3 items-center justify-center">
              <img height="75" src="../../../assets/img/temp/bank.png" width="75" />
              <span class="text-gray-400 mr-3">پرداخت اینترنتی از طریق درگاه بانک ملت</span>
            </div>
          </div>
          <div class="grid grid-cols-12 p-3">
            <div class="col-span-6">
              <div class="flex flex-col text-gray-400">
                <div class="flex mt-5">
                  <span class="font-extrabold text-gray-500">آدرس ارسال</span>
                  <AButton :class="[`${prefixVar}-button`, 'text-xs mr-5']" size="small">
                    <template #icon>
                      <Icon icon="ion:add-outline" size="15" />
                    </template>
                    افزودن به آدرس های من
                  </AButton>
                </div>
                <div class="flex mt-5">
                  <Icon icon="ion:person-outline" size="20" />
                  <span class="mr-3">گیرنده : علی قسامی</span>
                </div>
                <div class="flex mt-5">
                  <Icon icon="ion:call-outline" size="20" />
                  <span class="mr-3">تلفن : 09135517425</span>
                </div>
                <div class="flex mt-5">
                  <Icon icon="ion:map-outline" size="20" />
                  <span class="mr-3"
                    >آدرس : اصفهان - اصفهان - خیابان ابن سینا - کوچه فشارکی - پلاک 30 - کد پستی
                    812352526</span
                  >
                </div>
              </div>
            </div>
            <div class="col-span-6 text-center">
              <img class="inline" src="../../../assets/img/temp/map.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="border-r p-5">
        <Ticket />
      </div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../../utils/useDesign'
  import ItemDetail from '../../../components/Order/OrderItemDetail.vue'
  import Ticket from '../../../components/Ticket/Ticket.vue'
  const { prefixCls } = useDesign('order-detail')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-order-detail';

  .@{pre}{
    .ant-card-body {
      padding: 0;
      height: 100%;
    }
  }
</style>
