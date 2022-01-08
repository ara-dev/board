<template>
  <div class="h-full">
    <div class="h-full">
      <div class="flex mb-3 justify-between">
        <div>
          <Icon :icon="pageInfo?.icon" size="23" />
          <span class="mr-2 font-bold">{{ pageInfo?.title }}</span>
        </div>
        <div>
          <AButton v-if="userStore.isSuperAdmin()" @click="uploadDesign">بارگذاری طرح</AButton>
        </div>
      </div>
      <Tabs
        :activeTab="userStore.isSuperAdmin() ?  1 : 8"
        :page="designStore.page"
        :pageSize="designStore.state.limit"
        :total="designStore.state.total"
        @changePage="changePage"
        @changeTab="changeTab"
      >
        <a-tab-pane
          v-for="(item, index) in status.filter((item) => item.show).reverse()"
          :key="index + 2"
          :tab="item.title"
          class="p-2"
          dir="rtl"
        >
          <div class="mt-5">
            <div class="overflow-scroll" style="max-height: calc(100vh - 360px)">
              <RegisterDesignItem
                v-for="(item, index) in designStore.rows"
                :key="index"
                :item="item"
                @changeStatus="showChangeStatus"
                @definePrice="showDefinePrice"
                @deleteDesign="deleteDesign(item._id)"
              />
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane v-if="userStore.isSuperAdmin()" :key="1" class="p-2" dir="rtl" tab="بارگذاری">
          <ASpin :spinning="spinning" tip="در حال بارگذاری طرح...">
            <div class="mt-5">
              <div class="overflow-scroll" style="max-height: calc(100vh - 510px)">
                <RegisterDesignItem
                  v-for="(item, index) in designStore.uploadList"
                  :key="index"
                  :item="item"
                  @changeStatus="showChangeStatus"
                  @definePrice="showDefinePrice"
                  @deleteDesign="designStore.removeFromUploadList(index)"
                />
              </div>
              <AUploadDragger
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
              </AUploadDragger>
            </div>
          </ASpin>
        </a-tab-pane>
      </Tabs>
    </div>
    <AModal
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
          <AImage
            v-if="currentDesign.image"
            :src="`${baseURLApi}${currentDesign.image.file_storage}${currentDesign.image.file_name}`"
            class="rounded object-cover"
            height="120px"
            width="150px"
          />
        </div>
        <div class="col-span-9 flex flex-col">
          <div v-if="currentDesign.title && currentDesign.title.length > 0" class="text-gray-300">
            {{ currentDesign.title[0] }}
          </div>
          <div
            v-if="currentDesign.title && currentDesign.title.length > 0"
            class="text-lg font-bold"
          >
            {{ currentDesign.title[0] }}
          </div>
          <div class="mt-3">
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <span class="block my-3">عنوان طرح</span>
          <AInput
            v-if="currentDesign.title && currentDesign.title.length > 0"
            v-model:value="currentDesign.title[0]"
          />
        </div>
        <div>
          <span class="block my-3">قیمت طرح</span>
          <AInput
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.design"
            placeholder="6000"
          />
        </div>
        <div>
          <span class="block my-3">هزینه چاپ</span>
          <AInput
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.print"
            placeholder="25000"
          />
        </div>
      </div>
      <div>
        <span class="block my-3">قیمت پایه</span>
        <a-radio-group
          v-for="(item, index) in priceList"
          :key="index"
          v-model:value="price"
          :class="[`${prefixCls}-price`]"
          @change="handleChangePrice"
        >
          <a-radio-button :value="item">{{ usePrice(item) }}</a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <span class="block my-3">افزودنی ها</span>
        <!--        <a-radio-group

          :key="index"
          :class="[`${prefixCls}-price`]"
        >
          <a-radio-button :value="">{{ item.title }}</a-radio-button>
        </a-radio-group>-->
        <a-checkbox-group
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
      <ADivider />
      <div class="flex flex-col">
        <div class="w-3/6 mb-5">
          <AInput
            v-if="currentDesign.price"
            v-model:value="currentDesign.price.edit"
            placeholder="مبلغ دلخواه"
          />
        </div>
        <ATextarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </AModal>
    <AModal
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
          <AImage
            v-if="currentDesign.image"
            :src="`${baseURLApi}${currentDesign.image.file_storage}${currentDesign.image.file_name}`"
            class="rounded object-cover"
            height="120px"
            width="200px"
          />
        </div>
        <div class="col-span-9 flex flex-col">
          <div v-if="currentDesign.title && currentDesign.title.length > 0" class="text-gray-300">
            {{ currentDesign.title[0] }}
          </div>
          <div class="text-lg font-bold">{{ currentDesign.code }}</div>
          <div class="mt-3">
            <!--            <ATag v-for="item in tagsStore.getTagsByID(currentDesign.tags)" color="#f50">
              {{ item.title }}</ATag
            >-->
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <a-radio-group v-model:value="currentDesign.status" class="w-full">
          <div class="grid grid-cols-4 gap-2">
            <ACard
              v-for="(item, index) in status.filter((item) => item.show)"
              :key="index"
              :class="[
                { 'border-green': item.id == currentDesign.status },
                `${prefixCls}-hover-border-green`,
              ]"
              class="cursor-pointer"
              style="margin-bottom: 20px"
            >
              <ARadio :value="item.id" class="w-full">{{ item.title }}</ARadio>
            </ACard>
          </div>
        </a-radio-group>
      </div>
      <ADivider />
      <div>
        <ATextarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </AModal>
  </div>
</template>

<script lang="ts" setup>
  import { status } from '../../../components/Register-Design/status'
  import { usePageInfo } from '../../../utils/usePageInfo'
  import RegisterDesignItem from '../../../components/Register-Design/Register-Design-Item.vue'
  import { priceList, additionalList } from '../../../components/Register-Design/price'
  import { ref, onMounted, toRaw } from 'vue'
  import { Design, designStore } from '../../../model/design'
  import { tagsStore } from '../../../model/tags'
  import { userStore } from '../../../model/user'
  import { stageStore } from '../../../core'
  import { useDesign } from '../../../utils/useDesign'
  import { usePrice } from '../../../utils/usePrice'
  import { message } from 'ant-design-vue'
  import { convertBase64ToFile } from '../../../core/store/import'
  import { FileModel, fileStore } from '../../../model/file'
  import { baseURLApi } from '../../../../themeConfig'
  const pageInfo = usePageInfo('register-design')
  const { prefixCls } = useDesign('register-design')
  const showModalStatus = ref(false)
  const showModalPrice = ref(false)
  let currentDesign = ref({})
  const price = ref(0)
  const additional = ref([])
  const spinning = ref<boolean>(false)

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

  function changeTab(activeKey) {
    console.log('change active key', activeKey)
  }

  function handleChangePrice() {
    let sum = 0
    additional.value.forEach((item) => {
      sum += item
    })
    sum += price.value
    Object.assign((currentDesign.value as Design).price, { edit: sum })
  }

  function changePage(page: number, pageSize: number) {
    designStore.page = page
  }

  async function deleteDesign(index: number) {
    try {
      await designStore.deleteDesign(index)
      message.success('اطلاعات با موفقیت حذف شد')
    } catch (e) {
      console.log(e)
    } finally {
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
      await designStore.uploadDesign()
      await designStore.getDesign()
      message.success('اطلاعات با موفقیت بارگذاری شد')
    } catch (e) {
      message.error('شناسه فایل تکراری است ')
      console.log(e)
    } finally {
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
      await designStore.updateDesign(currentDesign.value as Design)
      showModalStatus.value = false
      message.success('اطلاعات با موفقیت ویرایش شد')
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  function showDefinePrice(item: Design) {
    if (item._id) {
      currentDesign.value = Object.assign({}, toRaw(item))
    } else {
      currentDesign.value = item
    }
    showModalPrice.value = true
  }

  onMounted(async () => {
    //console.log("sdsdsdsdsdsd",userStore.isSuperAdmin())
    await tagsStore.getTag()
    await designStore.getDesign()
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
</style>
