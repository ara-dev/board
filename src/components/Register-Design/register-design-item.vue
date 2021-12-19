<template>
  <ACard>
    <div class="grid grid-cols-12 gap-4 p-3">
      <div class="col-span-2">
        <img class="rounded" src="https://picsum.photos/200/120" />
        <div class="text-center text-gray-400 mt-1">
          <span>svg name</span>
          <span :class="[`${prefixVar}-text-color-primary`]"> (120kB)</span>
        </div>
      </div>
      <div class="col-span-10">
        <div class="flex justify-between items-baseline">
          <div class="mb-5 flex">
            <AInput placeholder="شماره شناسایی" size="large" />
            <AButton class="mr-5" size="large">
              <div>
                <Icon :size="30" color="#A1A1AA" icon="ion:chatbubbles-outline" />
              </div>
            </AButton>
            <AButton class="mr-5" ghost size="large" type="primary">
              <template #icon><Icon class="ml-3" icon="ion:card-outline" size="25" /></template>
              <span class="align-top">ثبت دستمزد اصلاح</span>
            </AButton>
            <AButton class="mr-5" ghost size="large" type="primary">
              <template #icon><Icon class="ml-3" icon="ion:card-outline" size="25" /></template>
              <span class="align-top">25،000 تومان</span>
            </AButton>
          </div>
          <div>
            <!--            <ATag class="cp-tag p-5">بارگذاری نشده</ATag>-->
            <RegisterDesignStatus />
            <div class="inline mr-3 cursor-pointer">
              <Icon color="red" icon="ion:trash-outline" size="18" />
              <!--              <Icon color="red" icon="ion:remove-circle-outline" size="25" />-->
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-10">
            <ASelect
              :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
              class="w-full"
              mode="multiple"
              notFoundContent="داده ای یافت نشد"
              placeholder="دسته های طرح"
              size="large"
            >
              <!--<template #notFoundContent> fgjhfghffddfghdfdfg </template>-->
            </ASelect>
          </div>
          <div class="col-span-2">
            <AButton class="w-full" size="large" type="primary">اصلاح طرح</AButton>
          </div>
        </div>
      </div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixVar } = useDesign('')
</script>

<style lang="less"></style>
