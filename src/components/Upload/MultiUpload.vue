<template>
  <Upload
    v-model:file-list="fileList"
    :before-upload="beforeUpload"
    :show-upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    class="multi-uploader"
    list-type="picture-card"
    name="avatar"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading" />
      <Icon icon="fluent:align-center-vertical-32-regular" size="23" />
      <div class="ant-upload-text">پس زمینه را بارگذاری نمایید</div>
    </div>
  </Upload>
</template>

<script lang="ts" setup>
  import { LoadingOutlined } from '@ant-design/icons-vue'
  import { Upload } from 'ant-design-vue/es'
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'
  import Icon from '@b/components/Icon/Icon.vue'
  interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
  }

  interface FileInfo {
    file: FileItem
    fileList: FileItem[]
  }

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const fileList = ref([])
  const loading = ref<boolean>(false)
  const imageUrl = ref<string>('')

  const handleChange = (info: FileInfo) => {
    if (info.file.status === 'uploading') {
      loading.value = true
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (base64Url: string) => {
        imageUrl.value = base64Url
        loading.value = false
      })
    }
    if (info.file.status === 'error') {
      loading.value = false
      message.error('upload error')
    }
  }

  const beforeUpload = (file: FileItem) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
</script>

<style>
  .multi-uploader > .ant-upload {
    /*width: 128px;*/
    width: 100%;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
