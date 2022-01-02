<template>
  <ACard :class="[`${prefixCls}`]">
    <div class="grid grid-cols-12 gap-4 p-3">
      <div class="col-span-2">
        <img class="rounded" src="https://picsum.photos/200/120" />
        <div class="text-center text-gray-400 mt-1 absolute bottom-0.5 right-14">
          <span>{{ props.item.title }}</span>
          <span :class="[`${prefixVar}-text-color-primary`]"> ({{ props.item.size }})</span>
        </div>
      </div>
      <div class="col-span-10">
        <div class="flex justify-between items-baseline">
          <div class="mb-5 flex">
            <AInput v-model:value="props.item.code" placeholder="شماره شناسایی" size="large" />
            <AButton class="mr-5" size="large">
              <div>
                <Icon :size="30" color="#A1A1AA" icon="ion:chatbubbles-outline" />
              </div>
            </AButton>
            <AButton class="mr-5" ghost size="large" type="primary">
              <template #icon><Icon class="ml-3" icon="ion:card-outline" size="25" /></template>
              <span v-if="true" class="align-top" @click="definePrice">ثبت دستمزد اصلاح</span>
              <span v-else class="align-top">{{ usePrice(15000) }}</span>
            </AButton>
          </div>
          <div>
            <RegisterDesignStatus :sts="props.item.status" />
            <div class="inline mr-3 cursor-pointer">
              <Icon color="red" icon="ion:trash-outline" size="18" />
              <!-- <Icon color="red" icon="ion:remove-circle-outline" size="25" />-->
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-10">
            <ASelect
              v-model:value="props.item.tags"
              class="w-full"
              mode="multiple"
              notFoundContent="داده ای یافت نشد"
              placeholder="دسته های طرح"
              size="large"
            >
              <a-select-option v-for="item in tagsStore.list()" :key="item._id">
                {{ item.title }}
              </a-select-option>
            </ASelect>
          </div>
          <div class="col-span-2">
            <AButton v-if="false" class="w-full" size="large" type="primary">اصلاح طرح</AButton>
            <AButton v-else class="w-full" size="large" type="primary" @click="changeStatus()"
              >تعیین وضعیت طرح</AButton
            >
          </div>
        </div>
      </div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  import { usePrice } from '../../utils/usePrice'
  import { tagsStore } from '../../model/tags'
  import { Design } from '../../model/design'
  const { prefixCls } = useDesign('register-design-item')
  const { prefixVar } = useDesign('')

  interface Props {
    item: Design
  }

  const props = withDefaults(defineProps<Props>(), {})

  const emit = defineEmits<{
    (e: 'changeStatus', item: Design): void
    (e: 'definePrice', item: Design): void
  }>()

  function changeStatus() {
    emit('changeStatus', props.item)
  }

  function definePrice() {
    emit('definePrice', props.item)
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design-item';

  .@{pre}{
    margin-bottom: 1rem;
  }
</style>
