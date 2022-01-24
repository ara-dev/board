<template>
  <Card :class="[`${prefixCls}`]">
    <div class="grid grid-cols-12 gap-2 items-start">
      <div class="col-span-2 relative img-wrapper">
        <Image
          :src="`${baseURLApi}${props.item.image.file_storage}${props.item.image.file_name}`"
          class="img-item block"
        />
        <span class="img-name en-font">{{ props.item.title[0] }}</span>
        <!--        <div class="text-center text-gray-400 mt-1 absolute bottom-0.5 right-14">
        </div>-->
      </div>
      <div class="col-span-10 flex flex-col gap-2">
        <div class="flex justify-between items-baseline">
          <div class="flex gap-2 w-full items-center">
            <Input
              v-model:value="props.item.code"
              :disabled="props.item.status != 1"
              class="en-font"
              style="max-width: 250px"
              placeholder="شماره شناسایی"
            />

            <Button
              :class="{ 'hover-show': !(props.item.price && props.item.price.edit) }"
              v-if="userStore.isSuperAdmin()"
              ghost
              type="primary"
              @click="definePrice"
            >
              <template #icon><Icon class="mr-3" icon="ion:card-outline" size="25" /></template>
              <span class="align-top">
                {{
                  props.item.price && props.item.price.edit
                    ? usePrice(props.item.price.edit)
                    : 'ثبت دستمزد اصلاح'
                }}
              </span>
              <!--                <span v-if="true" class="align-top" @click="definePrice">ثبت دستمزد اصلاح</span>
              <span v-else class="align-top">{{ usePrice(15000) }}</span>-->
            </Button>
            <div class="flex-1"></div>
            <Button type="link" class="hover-show">
              <div>
                <Icon :size="16" color="#A1A1AA" icon="ion:chatbox-ellipses-outline" />
              </div>
            </Button>
            <div v-if="userStore.isSuperAdmin()" class="cursor-pointer hover-show">
              <Button @click="deleteDesign" type="link">
                <div v-if="props.item.status == 1" class="inline">
                  <Icon color="red" icon="ion:remove-circle-outline" size="16" />
                </div>
                <div v-else class="inline">
                  <Icon color="red" icon="ion:trash-outline" size="16" />
                </div>
              </Button>
            </div>
            <RegisterDesignStatus class="!mx-0" :sts="props.item.status" />
          </div>
        </div>
        <div>
          <Select
            v-model:value="props.item.tags"
            :disabled="!userStore.isSuperAdmin()"
            class="w-full"
            mode="multiple"
            notFoundContent="داده ای یافت نشد"
            @change="update"
          >
            <SelectOption v-for="item in tagsStore.rows" :key="item._id">
              <span :style="{ color: item.color }">{{ item.title }}</span>
            </SelectOption>
            <template #placeholder="data"> {{ data }} </template>
          </Select>
        </div>
        <div class="w-full flex items-center gap-2 hover-show">
          <Checkbox
            v-if="userStore.isSuperAdmin()"
            v-model:checked="props.item.show"
            @change="update"
            >نمایش</Checkbox
          >
          <Button v-if="userStore.isSuperAdmin() && props.item.status != 1" @click="changeStatus()">
            تعیین وضعیت طرح
          </Button>
          <Button v-if="showEditDesignButton" type="primary" @click="designEdit">
            اصلاح طرح
          </Button>
          <Button v-if="showEditDesignButton && props.item.status != 4" @click="editEnd">
            اتمام کار
          </Button>

          <Button
            v-if="(userStore.isDesigner() || userStore.isSuperAdmin()) && props.item.status == 8"
            @click="selectForEdit"
          >
            انتخاب برای فارسی سازی
          </Button>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '@b/utils/useDesign'
  import { usePrice } from '@b/utils/usePrice'
  import { tagsStore } from '@b/model/tags'
  import useDesignStore, { Design } from '@b/model/design'
  import router from '@b/router'
  import { baseURLApi } from '../../../../../../../themeConfig'
  import { message } from 'ant-design-vue'
  import { userStore } from '@b/model/user'
  import { toRaw, unref, computed } from 'vue'
  import { Select, Button, Card, Checkbox, Image, Input, SelectOption } from 'ant-design-vue/es'

  import tinycolor from 'tinycolor2'
  import Icon from '@b/components/Icon/Icon.vue'
  import RegisterDesignStatus from '@b/views/Profile/pages/home_designer/src/components/RegisterDesignStatus.vue'
  interface Props {
    item: Design
  }
  const { prefixCls } = useDesign('design-item')
  const showEditDesignButton = computed(() => {
    return (
      (userStore.isSuperAdmin() && props.item.status != 1) ||
      (userStore.isDesigner() && [3, 4, 5].includes(props.item.status))
    )
  })

  const designStore = useDesignStore()
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

  function getTextColor(color: string) {
    return tinycolor(color).isDark() ? 'white' : 'black'
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

  async function editEnd() {
    try {
      const design = Object.assign({}, unref(toRaw(props.item)))
      design.status = 4
      await designStore.updateDesign(design)
      await designStore.getDesign()
      message.success('طرح در حالت کار شده قرار گرفت')
    } catch (e) {
    } finally {
    }
  }

  async function selectForEdit() {
    try {
      const design = Object.assign({}, unref(toRaw(props.item)))
      design.status = 2
      design.owners.push(userStore.state._id)
      await designStore.updateDesign(design)
      await designStore.getDesign()
      message.success('طرح انتخاب شد و در وضعیت انتظار تایید مدیر قرار گرفت')
    } catch (e) {
      console.log(e)
    }
  }

  function designEdit() {
    router.push({ name: 'boardId', params: { id: props.item._id } })
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-design-item';

  .@{pre}{

    .hover-show{
      opacity: 0;
      transition: all 0.3s 0.2s ease-in-out;
    }
    &:hover{
      .hover-show{
        opacity: 1;
      }
    }
    .img-item{
      @apply rounded object-cover cursor-zoom-in;
      aspect-ratio: 1.5;
    }

    .img-name{
      @apply text-center block absolute bottom-2 left-2 text-xs px-1 rounded-full;
      color: rgba(0,0,0, 0.2);
    }

    .img-wrapper{
      &:hover {
        .img-name {
          color: @white;
          background-color: @primary-color;
        }
      }
      .ant-image{
        display: block;
      }
    }

    .select-option{
      border-radius: @border-radius-base;
      @apply px-1;
    }
  }
</style>
