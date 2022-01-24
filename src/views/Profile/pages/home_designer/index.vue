<template>
  <div class="p-2 p-4">
    <Tabs
      :activeTab="activeTab"
      :page="designStore.page"
      :pageSize="designStore.state.limit"
      :total="designStore.state.total"
      @changePage="changePage"
      @changeTab="changeTab"
    >
      <template #extra-action>
        <RadioGroup v-model:value="viewMode" size="small">
          <RadioButton value="table">جدول</RadioButton>
          <RadioButton value="default">لیست</RadioButton>
          <RadioButton value="grid">گرید</RadioButton>
        </RadioGroup>
      </template>
      <TabPane
        v-for="item in status.filter((_item) => _item.show).reverse()"
        :key="item.id"
        :tab="item.title"
        class="px-2"
        dir="rtl"
      >
        <div>
          <Spin :spinning="designLoading" tip="در حال دریافت طرح ها">
            <Empty
              class="p-5"
              description="هیچ طرحی ای یافت نشد"
              v-if="!designStore.rows || designStore.rows.length == 0"
            />
            <div class="flex flex-col gap-2" v-if="viewMode == 'default'">
              <ListViewDesign
                v-for="(item, index) in designStore.rows"
                :key="index"
                :item="item"
                @changeStatus="showChangeStatus"
                @definePrice="showDefinePrice"
                @deleteDesign="deleteDesign(item._id)"
              />
            </div>
            <div v-else-if="viewMode == 'grid'" class="grid grid-cols-6 gap-2">
              <GirdViewDesign :item="item" v-for="(item, index) in designStore.rows" :key="index" />
            </div>
            <div v-else-if="viewMode == 'table'">
              <TableViewDesign />
            </div>
          </Spin>
        </div>
      </TabPane>
      <TabPane v-if="userStore.isSuperAdmin()" :key="1" class="p-2" dir="rtl" tab="بارگذاری">
        <Spin :spinning="spinning" tip="در حال بارگذاری طرح...">
          <div class="mt-5">
            <div class="overflow-scroll" style="max-height: calc(100vh - 550px)">
              <ListViewDesign
                v-for="(item, index) in designStore.uploadList.slice(
                  designStore.state.page * designStore.state.limit,
                  designStore.state.page * designStore.state.limit + designStore.state.limit,
                )"
                :key="index"
                :item="item"
                @changeStatus="showChangeStatus"
                @definePrice="showDefinePrice"
                @deleteDesign="designStore.removeFromUploadList(index)"
              />
            </div>
            <UploadDragger
              :beforeUpload="handleBeforeUpload"
              :multiple="true"
              :showUploadList="false"
              accept=".svg"
              action=""
              name="file"
              @change="handleChangeSvg"
            >
              <p class="ant-upload-drag-icon"> <Icon icon="ion:images-outline" /></p>
              <p class="ant-upload-text">افزودن طرح جدید </p>
              <p class="ant-upload-hint">
                طرح خود را با پسوند svg انتخاب کنید و پس از اینکه شماره شناسایی و دسته آن را مشخص
                کردید گزینه بارگذاری طرح را انتخاب کنید
              </p>
            </UploadDragger>
            <div class="text-center mt-3">
              <Button
                v-if="userStore.isSuperAdmin()"
                :disabled="designStore.uploadList.length == 0"
                @click="uploadDesign"
                >بارگذاری طرح</Button
              >
            </div>
          </div>
        </Spin>
      </TabPane>
    </Tabs>
    <Modal
      :visible="showModalPrice"
      cancelText="بستن"
      okText="ثبت دستمزد"
      title="ثبت دستمزد"
      width="40%"
      @cancel="showModalPrice = false"
      @ok="changePrice"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <Image
            v-if="currentDesign.image"
            :src="`${baseURLApi}${currentDesign.image.file_storage}${currentDesign.image.file_name}`"
            class="rounded object-cover cursor-zoom-in"
            height="120px"
            width="150px"
          />
        </div>
        <div class="col-span-9 flex flex-col">
          <div v-if="currentDesign.title && currentDesign.title.length > 0" class="text-gray-300">
            {{ currentDesign.title[0] }}
          </div>
          <div v-if="currentDesign.code" class="text-lg font-bold">
            {{ currentDesign.code }}
          </div>
          <div v-if="currentDesign.tags" class="mt-3">
            <Tag
              v-for="(item, index) in tagsStore.getTagsByID(currentDesign.tags)"
              :key="index"
              :color="item.color"
            >
              {{ item.title }}
            </Tag>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <span class="block my-3">عنوان طرح</span>
          <Input
            v-if="currentDesign.title && currentDesign.title.length > 0"
            v-model:value="currentDesign.title[0]"
          />
        </div>
        <div>
          <span class="block my-3">قیمت طرح</span>
          <Input
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.design"
            placeholder="6000"
          />
        </div>
        <div>
          <span class="block my-3">هزینه چاپ</span>
          <Input
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.print"
            placeholder="25000"
          />
        </div>
      </div>
      <div>
        <span class="block my-3">قیمت پایه</span>
        <RadioGroup
          v-for="(item, index) in priceList"
          :key="index"
          v-model:value="price"
          :class="[`${prefixCls}-price`]"
          @change="handleChangePrice"
        >
          <RadioButton :value="item">{{ usePrice(item) }}</RadioButton>
        </RadioGroup>
      </div>
      <div>
        <span class="block my-3">افزودنی ها</span>
        <!--        <a-radio-group

          :key="index"
          :class="[`${prefixCls}-price`]"
        >
          <a-radio-button :value="">{{ item.title }}</a-radio-button>
        </a-radio-group>-->
        <CheckboxGroup
          v-model:value="additional"
          :options="
            additionalList.map((item) => {
              return { label: item.title, value: item.price }
            })
          "
          @change="handleChangePrice"
        />

        <!--        <ACheckbox v-for="(item, index) in additionalList" v-model:checked="checked">Checkbox</ACheckbox>-->
        <!--        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>-->
      </div>
      <Divider />
      <div class="flex flex-col">
        <div class="w-3/6 mb-5">
          <Input
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.edit"
            placeholder="مبلغ دلخواه"
          />
        </div>
        <Textarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </Modal>
    <Modal
      :visible="showModalStatus"
      cancelText="بستن"
      okText="ثبت وضعیت"
      title="ثبت وضعیت طرح"
      width="60%"
      @cancel="showModalStatus = false"
      @ok="changeStatus"
    >
      <div v-if="currentDesign != null" class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <Image
            v-if="currentDesign.image"
            :src="`${baseURLApi}${currentDesign.image.file_storage}${currentDesign.image.file_name}`"
            class="rounded object-cover cursor-zoom-in"
            height="120px"
            width="200px"
          />
        </div>
        <div class="col-span-9 flex flex-col">
          <div v-if="currentDesign.title && currentDesign.title.length > 0" class="text-gray-300">
            {{ currentDesign.title[0] }}
          </div>
          <div class="text-lg font-bold">{{ currentDesign.code }}</div>
          <div v-if="currentDesign.tags" class="mt-3">
            <Tag
              v-for="(item, index) in tagsStore.getTagsByID(currentDesign.tags)"
              :key="index"
              :color="item.color"
            >
              {{ item.title }}
            </Tag>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <RadioGroup v-model:value="currentDesign.status" class="w-full">
          <div class="grid grid-cols-4 gap-2">
            <Card
              v-for="(item, index) in status.filter((item) => item.show)"
              :key="index"
              :class="[
                { 'border-green': item.id == currentDesign.status },
                `${prefixCls}-hover-border-green`,
              ]"
              class="cursor-pointer"
              style="margin-bottom: 20px"
            >
              <Radio :value="item.id" class="w-full">{{ item.title }}</Radio>
            </Card>
          </div>
        </RadioGroup>
      </div>
      <Divider />
      <div>
        <Textarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { status } from '@b/views/Profile/pages/home_designer/src/types/status'
  import { usePageInfo } from '../../hook/usePageInfo'
  import { priceList, additionalList } from '@b/views/Profile/pages/home_designer/src/types/price'
  import { ref, onMounted, toRaw, watch } from 'vue'
  import useDesignStore, { Design } from '@b/model/design'
  import { tagsStore } from '@b/model/tags'
  import { userStore } from '@b/model/user'
  import { stageStore } from '@b/core'
  import { useDesign } from '@b/utils/useDesign'
  import { usePrice } from '@b/utils/usePrice'
  import { message } from 'ant-design-vue'
  import { convertBase64ToFile } from '@b/core/store/import'
  import { FileModel, fileStore } from '@b/model/file'
  import { baseURLApi } from '../../../../../themeConfig'
  import TabPane from 'ant-design-vue/es/vc-tabs/src/TabPane'

  import {
    RadioButton,
    RadioGroup,
    Button,
    Spin,
    UploadDragger,
    Empty,
    Modal,
    Image,
    Tag,
    Input,
    Divider,
    Textarea,
    CheckboxGroup,
    Card,
    Radio,
  } from 'ant-design-vue/es'

  import Tabs from '@b/components/Tabs'
  import {
    TableViewDesign,
    ListViewDesign,
    GirdViewDesign,
  } from '@b/views/Profile/pages/home_designer/src/components'
  import Icon from '@b/components/Icon/Icon.vue'

  const pageInfo = usePageInfo('register-design')
  const { prefixCls } = useDesign('register-design')
  const showModalStatus = ref(false)
  const showModalPrice = ref(false)
  let currentDesign = ref({})
  const price = ref(0)
  const additional = ref([])
  const spinning = ref<boolean>(false)
  const designLoading = ref<boolean>(false)
  const activeTab = ref(8)
  const designStore = useDesignStore()

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

  const viewMode = ref('default')

  watch(viewMode, (n) => {
    if (n != 'default') {
      designStore.limit = 42
    } else {
      designStore.limit = 10
    }
    designStore.getDesign()
  })

  function handleBeforeUpload(file: FileItem) {
    spinning.value = true
    const fileReader = new FileReader()
    fileReader.addEventListener('load', async (event) => {
      const file_data = event.target?.result
      const design: Design = await stageStore.convertSvgToDesignModel(file_data as string)
      design.title[0] = file.name || ''
      design.code = file.name || ''
      design.creator = userStore.state._id
      design.status = 1
      design.price = {
        design: 0,
        print: 0,
        edit: 0,
      }
      design.show = true
      const image = await stageStore.createImageFromSvg(
        file,
        design.data.pageSize[0].width,
        design.data.pageSize[0].height,
      )
      const _file = convertBase64ToFile(image)
      const { data } = await fileStore.upload(_file)
      const fileModel: FileModel[] = data.data
      design.image = {
        file_id: fileModel[0]._id as string,
        file_name: fileModel[0].name as string,
        file_storage: fileModel[0].storage as string,
      }
      designStore.addDesign(design)
      spinning.value = false
    })
    fileReader.readAsText(file)
    return false
  }

  async function changeTab(activeKey: number) {
    //console.log("this is activ key",activeKey)
    //debugger
    try {
      activeTab.value = activeKey
      designLoading.value = true
      designStore.page = 1
      if (activeTab.value == 1) {
        designStore.total = designStore.uploadList.length
      } else {
        designStore.filter = {
          status: activeKey,
        }
        await designStore.getDesign()
      }
    } catch (e) {
      console.log(e)
    } finally {
      designLoading.value = false
    }
  }

  function handleChangePrice() {
    let sum = 0
    additional.value.forEach((item) => {
      sum += item
    })
    sum += price.value
    Object.assign((currentDesign.value as Design).price, { edit: sum })
  }

  async function changePage(page: number, pageSize: number) {
    try {
      designLoading.value = true
      designStore.page = page
      if (activeTab.value != 1) {
        await designStore.getDesign()
      }
    } catch (e) {
    } finally {
      designLoading.value = false
    }
  }

  async function deleteDesign(id: string) {
    try {
      designLoading.value = true
      await designStore.deleteDesign(id)
      message.success('اطلاعات با موفقیت حذف شد')
    } catch (e) {
      console.log(e)
    } finally {
      designLoading.value = false
    }
  }

  function handleChangeSvg({ file }) {
    const isSvg = file.type == 'image/svg+xml'
    if (!isSvg) {
      alert('فایل نامتعبر')
      return
    }
  }

  async function uploadDesign() {
    try {
      spinning.value = true
      await designStore.uploadDesign()
      await designStore.getDesign()
      message.success('اطلاعات با موفقیت بارگذاری شد')
    } catch (e) {
      message.error('شناسه فایل تکراری است ')
      console.log(e)
    } finally {
      spinning.value = false
    }
  }

  function showChangeStatus(item: Design) {
    currentDesign.value = Object.assign({}, toRaw(item))
    showModalStatus.value = true
  }

  async function changePrice() {
    try {
      if ((currentDesign.value as Design)._id) {
        await designStore.updateDesign(currentDesign.value as Design)
      }
      showModalPrice.value = false
      message.success('اطلاعات با موفقیت ویرایش شد')
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  async function changeStatus() {
    try {
      designLoading.value = true
      await designStore.updateDesign(currentDesign.value as Design)
      showModalStatus.value = false
      await designStore.getDesign()
      message.success('اطلاعات با موفقیت ویرایش شد')
    } catch (e) {
      console.log(e)
    } finally {
      designLoading.value = false
    }
  }

  function showDefinePrice(item: Design) {
    //console.log('item ====> ', { ...toRaw(unref(item)) })
    //console.log('item ====> ', JSON.parse(JSON.stringify(item)))
    //currentDesign.value = JSON.parse(JSON.stringify(item))
    //Object.assign(currentDesign, item)
    //debugger
    if (item._id) {
      currentDesign.value = JSON.parse(JSON.stringify(item))
      // Object.assign({}, toRaw(unref(item)))
    } else {
      currentDesign.value = item
    }
    showModalPrice.value = true
  }

  onMounted(async () => {
    //console.log("sdsdsdsdsdsd",userStore.isSuperAdmin())
    await tagsStore.getTag()
    //await designStore.getDesign()
  })
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design';

  .@{pre}-hover-border-green:hover{
    border-color: @primary-color;
  }

  .@{pre}-price{
    &> .ant-radio-button-wrapper{
      margin-left: 15px;
    }

    &> .ant-radio-button-wrapper:first-child , .ant-radio-button-wrapper:last-child {
      border-radius: unset;
    }
  }

  .border-green{
    border-color: @primary-color;
  }

  .ant-modal-footer{
    &>div{
      display: flex;
      align-items: center;
    }
  }
</style>
