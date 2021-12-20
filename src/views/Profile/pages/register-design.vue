<template>
  <div class="h-full">
    <div class="h-full">
      <div class="flex mb-3 justify-between">
        <div>
          <Icon :icon="pageInfo?.icon" size="23" />
          <span class="mr-2 font-bold">{{ pageInfo?.title }}</span>
        </div>
        <div>
          <AButton>بارگذاری طرح</AButton>
        </div>
      </div>
      <Tabs>
        <a-tab-pane key="4" tab="نیاز به اصلاح">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="3" force-render tab="در انتظار تایید کار"
          >Content of Tab Pane 2</a-tab-pane
        >
        <a-tab-pane key="2" tab="اصلاح طرح">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane key="1" class="p-2" dir="rtl" tab="همگی">
          <RegisterDesignItem />
          <div class="mt-5">
            <AUploadDragger :multiple="true" action="" name="file">
              <p class="ant-upload-drag-icon"> <Icon icon="ion:images-outline" /></p>
              <p class="ant-upload-text">افزودن طرح جدید </p>
              <p class="ant-upload-hint">
                طرح خود را با پسوند svg انتخاب کنید و پس از اینکه شماره شناسایی و دسته آن را مشخص
                کردید گزینه بارگذاری طرح را انتخاب کنید
              </p>
            </AUploadDragger>
          </div>
        </a-tab-pane>
      </Tabs>
    </div>
    <AModal :visible="false" cancelText="بستن" okText="ثبت دستمزد" title="ثبت دستمزد" width="40%">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <img class="rounded" src="https://picsum.photos/200/120" />
        </div>
        <div class="col-span-9 flex flex-col">
          <div class="text-gray-300">1255525550</div>
          <div class="text-lg font-bold">سید مهدی بنی لوحی</div>
          <div class="mt-3">
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div>
        <span class="block mt-5 mb-5">قیمت پایه</span>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
          <a-radio-button value="b">25،00 تومان</a-radio-button>
          <a-radio-button value="c">45،000 تومان</a-radio-button>
          <a-radio-button value="d">80،000 تومان</a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <span class="block mt-5">افزودنی ها</span>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
      </div>
      <ADivider />
      <div class="flex flex-col">
        <div class="w-3/6 mb-5">
          <AInput placeholder="مبلغ دلخواه" />
        </div>
        <ATextarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </AModal>

    <AModal :visible="false" cancelText="بستن" okText="ثبت وضعیت" title="ثبت وضعیت طرح" width="40%">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <img class="rounded" src="https://picsum.photos/200/120" />
        </div>
        <div class="col-span-9 flex flex-col">
          <div class="text-gray-300">1255525550</div>
          <div class="text-lg font-bold">سید مهدی بنی لوحی</div>
          <div class="mt-3">
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <ACard v-for="(item, index) in status" :key="index" style="margin-bottom: 20px">
          <ARadio>{{ item.title }}</ARadio>
        </ACard>
      </div>
      <ADivider />
      <div>
        <ATextarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </AModal>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { usePageInfo } from '../../../utils/usePageInfo'
  import { useDesign } from '../../../utils/useDesign'
  import { status } from '../../../components/Register-Design/status'
  import RegisterDesignItem from '../../../components/Register-Design/Register-Design-Item.vue'
  import { ref } from 'vue'
  const pageInfo = usePageInfo('register-design')
  const { prefixCls } = useDesign('register-design')
  const { prefixVar } = useDesign('')
  const price = ref('a')
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design';

  .@{pre}-price{
    &> .ant-radio-button-wrapper{
      margin: 15px;
    }

    &> .ant-radio-button-wrapper:first-child , .ant-radio-button-wrapper:last-child {
      border-radius: unset;
    }

  }
</style>
