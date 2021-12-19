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
    <AModal title="ثبت دستمزد" visible="true" width="40%">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <img class="rounded" src="https://picsum.photos/200/120" />
        </div>
        <div class="col-span-9 flex flex-col">
          <div>1255525550</div>
          <div>سید مهدی بنی لوحی</div>
          <div>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div>
        <span class="block">قیمت پایه</span>
        <a-radio-group v-model:value="value1">
          <a-radio-button value="a">Hangzhou</a-radio-button>
          <a-radio-button value="b">Shanghai</a-radio-button>
          <a-radio-button value="c">Beijing</a-radio-button>
          <a-radio-button value="d">Chengdu</a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <span class="block">افزودنی ها</span>
      </div>
    </AModal>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { usePageInfo } from '../../../utils/usePageInfo'
  import RegisterDesignItem from '../../../components/Register-Design/register-design-item.vue'
  const pageInfo = usePageInfo('register-design')
</script>

<style lang="less"></style>
