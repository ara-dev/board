<template>
  <div class="h-full">
    <div class="h-full">
      <div class="flex mb-3 justify-between">
        <div>
          <Icon :icon="pageInfo?.icon" size="23" />
          <span class="mr-2 font-bold">{{ pageInfo?.title }}</span>
        </div>
        <div>
          <AButton @click="uploadDesign">بارگذاری طرح</AButton>
        </div>
      </div>
      <Tabs
        :page="designStore.page"
        :pageSize="designStore.state.limit"
        :total="designStore.state.total"
        @changePage="changePage"
      >
        <a-tab-pane key="4" tab="نیاز به اصلاح">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="3" force-render tab="در انتظار تایید کار"
          >Content of Tab Pane 2</a-tab-pane
        >
        <a-tab-pane key="2" tab="اصلاح طرح">Content of Tab Pane 3</a-tab-pane>
        <a-tab-pane key="1" class="p-2" dir="rtl" tab="همگی">
          <div class="mt-5">
            <RegisterDesignItem
              v-for="(item, index) in designStore.rows"
              :key="index"
              :item="item"
              @changeStatus="showChangeStatus"
              @definePrice="definePrice"
              @deleteDesign="deleteDesign(index)"
            />

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
        </a-tab-pane>
      </Tabs>
    </div>
    <!--    <AModal
      :visible="showModalPrice"
      cancelText="بستن"
      okText="ثبت دستمزد"
      title="ثبت دستمزد"
      width="40%"
      @cancel="showModalPrice = false"
      @ok="showModalPrice = false"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-3">
          <img class="rounded" src="https://picsum.photos/200/120" />
        </div>
        <div class="col-span-9 flex flex-col">
          <div class="text-gray-300">{{ currentDesign.title }}</div>
          <div class="text-lg font-bold">سید مهدی بنی لوحی</div>
          <div class="mt-3">
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
            <ATag>عاشقانه</ATag>
          </div>
        </div>
      </div>
      <div>
        <span class="block my-3">عنوان طرح</span>
        <a-input v-model:value="currentDesign.title" placeholder="" />
        <span class="block my-3">قیمت طرح</span>
        <a-input v-model:value="currentDesign.price.design" placeholder="6000" />
        <span class="block my-3">هزینه چاپ</span>
        <a-input v-model:value="currentDesign.price.print" placeholder="25000" />
      </div>
      <div>
        <span class="block my-3">قیمت پایه</span>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
          <a-radio-button value="b">25،00 تومان</a-radio-button>
          <a-radio-button value="c">45،000 تومان</a-radio-button>
          <a-radio-button value="d">80،000 تومان</a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <span class="block my-3">افزودنی ها</span>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="price" :class="[`${prefixCls}-price`]">
          <a-radio-button value="a">15،000 تومان</a-radio-button>
        </a-radio-group>
      </div>
      <ADivider />
      <div class="flex flex-col">
        <div class="w-3/6 mb-5">
          <AInput placeholder="مبلغ دلخواه" />
        </div>
        <ATextarea :auto-size="{ minRows: 3, maxRows: 5 }" class="mt-5" placeholder="تیکت" />
      </div>
    </AModal>-->
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
          <img class="rounded" src="https://picsum.photos/200/120" />
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
              :class="{ 'border-green': item.id == currentDesign.status }"
              class="cursor-pointer"
              style="['margin-bottom: 20px']"
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
  import { ref, onMounted, computed } from 'vue'
  import { Design, designStore } from '../../../model/design'
  import { tagsStore } from '../../../model/tags'
  import { userStore } from '../../../model/user'
  import { stageStore } from '../../../core'
  const pageInfo = usePageInfo('register-design')
  // const { prefixCls } = useDesign('register-design')
  //const { prefixVar } = useDesign('')
  const showModalStatus = ref(false)
  const showModalPrice = ref(false)
  let currentDesign = ref({})
  const price = ref('a')

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

  const design = computed(() => {
    console.log('computed for design')
    return designStore.state
  })

  function handleBeforeUpload(file: FileItem) {
    console.log('wwwwwwwww', userStore.state._id)
    const design: Design = {
      title: [file.name || ''],
      code: file.name || '',
      size: `${Math.ceil(file.size / 1024)} KB`,
      creator: userStore.state._id,
      owners: [],
      tags: [],
      type: 1,
      //id: '',
      data: {},
      files: [],
      owner: '',
      status: 1,
      price: {
        design: 0,
        print: 0,
      },
    }

    const fileReader = new FileReader()
    fileReader.addEventListener('load', async (event) => {
      const data = event.target?.result
      design.data = await stageStore.convertSvgToStageModel(data as string)
      designStore.addDesign(design)
    })
    fileReader.readAsText(file)
    return false
  }

  function changePage(page: number, pageSize: number) {
    designStore.page = page
    //console.log('page', page, 'pagesize', pageSize)
  }

  async function deleteDesign(index: number) {
    try {
      await designStore.deleteDesign(index)
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
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  function showChangeStatus(item: Design) {
    showModalStatus.value = true
    currentDesign.value = item
    //console.log(currentDesign)
  }

  async function changeStatus() {
    try {
      await designStore.updateDesign(currentDesign.value._id as string)
      showModalStatus.value = false
    } catch (e) {
    } finally {
    }
    //showModalStatus.value = true
    // currentDesign.value = item
    //console.log(currentDesign)
  }

  function definePrice(item: Design) {
    showModalPrice.value = true
    currentDesign.value = item
    //console.log(currentDesign)
  }

  onMounted(async () => {
    await tagsStore.getTag()
    await designStore.getDesign()
  })
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design';

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
