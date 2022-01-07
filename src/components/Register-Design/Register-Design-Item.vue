<template>
  <ACard :class="[`${prefixCls}`]">
    <div class="grid grid-cols-12 gap-4 p-3">
      <div class="col-span-2">
        <img class="rounded" :src="`${baseURLApi}${props.item.image.file_storage}${props.item.image.file_name}`" />
        <div class="text-center text-gray-400 mt-1 absolute bottom-0.5 right-14">
          <span>{{ props.item.title[0] }}</span>
          <!--<span :class="[`${prefixVar}-text-color-primary`]"> ({{ props.item.size }})</span>-->
        </div>
      </div>
      <div class="col-span-10">
        <div class="flex justify-between items-baseline">
          <div>
            <ACheckbox v-model:checked="props.item.show" @change="update">نمایش</ACheckbox>
            <div class="mb-5 inline-flex mr-5 items-center	">
              <AInput
                v-model:value="props.item.code"
                :disabled="props.item.status != 1"
                placeholder="شماره شناسایی"
                size="large"
              />

              <AButton class="mr-5">
                <div>
                  <Icon :size="25" color="#A1A1AA" icon="ion:chatbubbles-outline" />
                </div>
              </AButton>
              <AButton class="mr-5" ghost  type="primary">
                <template #icon><Icon class="ml-3" icon="ion:card-outline" size="25" /></template>
                <span class="align-top" @click="definePrice">
                  {{ props.item.price && props.item.price.edit ?  usePrice(props.item.price.edit) : 'ثبت دستمزد اصلاح' }}
                </span>
<!--                <span v-if="true" class="align-top" @click="definePrice">ثبت دستمزد اصلاح</span>
                <span v-else class="align-top">{{ usePrice(15000) }}</span>-->
              </AButton>
            </div>
          </div>
          <div class="flex">
            <RegisterDesignStatus :sts="props.item.status" />
            <div class="inline mr-3 cursor-pointer">
              <AButton type="link" @click="deleteDesign">
                <div v-if="props.item.status == 1" class="inline">
                  <Icon color="red" icon="ion:remove-circle-outline" size="20" />
                </div>
                <div v-else class="inline">
                  <Icon color="red" icon="ion:trash-outline" size="18" />
                </div>
              </AButton>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="2xl:col-span-10 xl:col-span-9">
            <ASelect
              v-model:value="props.item.tags"
              class="w-full"
              mode="multiple"
              notFoundContent="داده ای یافت نشد"
              placeholder="دسته های طرح"
              size="large"
              @change="update"
            >
              <a-select-option v-for="item in tagsStore.rows" :key="item._id">
                {{ item.title }}
              </a-select-option>
            </ASelect>
          </div>
          <div class="2xl:col-span-2 xl:col-span-3">
            <AButton v-if="false" class="w-full" size="large" type="primary" @click="designEdit"
              >اصلاح طرح</AButton
            >
            <AButton
              v-if="props.item.status != 1"
              class="w-full"
              size="large"
              type="primary"
              @click="changeStatus()"
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
  import { Design, designStore } from '../../model/design'
  import { stageStore } from '../../core'
  import { StageModel } from '../../core/store/stage'
  import {baseURLApi} from '../../../themeConfig';
  import router from '../../router'
  import { toRaw } from 'vue'
  import {message} from "ant-design-vue";
  const { prefixCls } = useDesign('register-design-item')
  const { prefixVar } = useDesign('')

  interface Props {
    item: Design
  }

  const props = withDefaults(defineProps<Props>(), {})

  const emit = defineEmits<{
    (e: 'changeStatus', item: Design): void
    (e: 'definePrice', item: Design): void
    (e: 'deleteDesign'): void
  }>()

  function changeStatus() {
    emit('changeStatus', props.item)
  }

  function definePrice() {
    emit('definePrice', props.item)
  }

  function deleteDesign() {
    emit('deleteDesign')
  }

  async function update() {
    try {
      if (props.item._id) {
        await designStore.updateDesign(props.item)
      }
      message.success('اطلاعات با موفقیت ویرایش شد')
    } catch (e) {
      console.log(e)
    }
  }

  function designEdit() {
    //console.log(toRaw(props.item.data) )
    //console.log(unref(props.item.data) )
    //console.log
    // return
    router.push({ name: 'board' }).then(() => {
      console.log('this is thene')
      stageStore.importFromJson(toRaw(props.item.data) as StageModel, 'container')
    })
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design-item';

  .@{pre}{
    margin-bottom: 1rem;
  }
</style>
