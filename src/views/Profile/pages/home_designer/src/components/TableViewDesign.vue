<template>
  <Table :columns="columns" :dataSource="rows">
    <template #image="{ text }">
      <Image :src="getSrc(text)" class="table-img-item" />
    </template>
    <template #operation="{ text }">
      <div class="flex items-center gap-1">
        <IconButton icon="ion:create-outline" @click="goToDesign(text)" />
        <IconButton icon="ion:trash-outline" color="red" @click="goToDesign(text)" />
      </div>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import { Table, Image } from 'ant-design-vue'
  import useDesignStore from '@b/model/design'
  import { computed } from 'vue'
  import IconButton from '@b/components/Button/IconButton.vue'
  import router from '@b/router'
  import { baseURLApi } from '../../../../../../../themeConfig'

  const designStore = useDesignStore()

  const rows = computed(() => {
    console.log('designStore.rows ===>', designStore.rows)
    return designStore.rows
  })

  const columns = [
    {
      title: 'تصویر',
      dataIndex: 'image',
      key: 'image',
      slots: { customRender: 'image' },
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'دسته بندی',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'مالک',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'تاریخ ایجاد',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'بروزرسانی',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'عملیات',
      dataIndex: '_id',
      key: '_id',
      slots: { customRender: 'operation' },
    },
  ]

  function goToDesign(id: string) {
    router.push({ name: 'boardId', params: { id } })
  }

  function getSrc(image: any) {
    return `${baseURLApi}${image.file_storage}${image.file_name}`
  }
</script>

<style lang="less">
  .table-img-item {
    max-width: 60px;
    max-height: 60px;
    overflow: hidden;
    border-radius: 5px;
    img {
      object-fit: cover;
      object-position: center;
    }
  }
</style>
