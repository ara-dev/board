<template>
  <div class="relative img-wrapper w-full grid-type" :class="[prefixCls]">
    <Image :src="img" class="img-item block w-full" />
    <span class="img-name en-font">{{ title }}</span>

    <IconButton class="btn-edit" icon="ion:create-outline" @click="designEdit" />
  </div>
</template>

<script lang="ts" setup>
  import { baseURLApi } from '../../../../../../../themeConfig'

  import { computed } from 'vue'
  import { get } from 'lodash-es'
  import { useDesign } from '@b/utils/useDesign'
  import { Image } from 'ant-design-vue'
  import IconButton from '@b/components/Button/IconButton.vue'
  import router from '@b/router'

  const props = defineProps<{ item: {} }>()
  const { prefixCls } = useDesign('design-item')

  const img = computed(() => {
    const fileStorage = get(props.item, 'image.file_storage')
    const fileName = get(props.item, 'image.file_name')
    if (fileName && fileStorage) {
      return `${baseURLApi}${fileStorage}${fileName}`
    }
    return ''
  })

  const title = computed(() => {
    return get(props.item, 'title.0', 'بدون عنوان')
  })

  function designEdit() {
    router.push({ name: 'boardId', params: { id: props.item._id } })
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-design-item';

  .@{pre} {
    &.grid-type {
      .ant-image {
        display: block;
        border: 1px;
        border: 1px solid rgb(197 197 197 / 55%);
        border-radius: 4px;
        box-shadow: 1px 1px 3px #bbbbbb3d;
        transition: all 0.2s ease;
        &:hover {
          border-color: @primary-color;
        }
      }
      .btn-edit {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background-color: transparent;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
