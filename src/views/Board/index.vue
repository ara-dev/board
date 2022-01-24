<template>
  <div class="h-screen">
    <div v-if="preloader" class="flex items-center justify-center h-screen">
      <Spin :spinning="true" tip=" در حال دریافت اطلاعات " />
    </div>
    <div v-else>
      <ShapeContextMenu />
      <BackgroundContextMenu />
      <!-- start main -->
      <!--class="flex h-screen"-->
      <div :class="`${prefixCls}-main`">
        <div
          class="h-screen border-l border-r border-gray-300 max-h-screen overflow-auto"
          style="display: grid; grid-template-rows: auto 4vw; height: 100%"
        >
          <div class="px-2 pt-2 overflow-auto">
            <Transition :css="false">
              <div>
                <ImageStyle
                  v-if="uiStore.isActive('ui.right_sidebar.children.image')"
                  v-motion="'cube'"
                  :enter="{ x: 0, opacity: 1 }"
                  :initial="{ x: 400, opacity: 0 }"
                  :leave="{ x: -400, opacity: 0 }"
                />
                <ShapeStyle
                  v-if="uiStore.isActive('ui.right_sidebar.children.shape')"
                  v-motion="'cube'"
                  :enter="{ x: 0, opacity: 1 }"
                  :initial="{ x: 400, opacity: 0 }"
                  :leave="{ x: -400, opacity: 0 }"
                />
                <TextStyle
                  v-if="uiStore.isActive('ui.right_sidebar.children.text')"
                  v-motion="'cube'"
                  :enter="{ x: 0, opacity: 1 }"
                  :initial="{ x: 400, opacity: 0 }"
                  :leave="{ x: -400, opacity: 0 }"
                />
                <BackgroundStyle
                  v-if="uiStore.isActive('ui.right_sidebar.children.background')"
                  v-motion="'cube'"
                  :enter="{ x: 0, opacity: 1 }"
                  :initial="{ x: 400, opacity: 0 }"
                  :leave="{ x: -400, opacity: 0 }"
                />
                <div v-if="uiStore.isActive('ui.right_sidebar.children.upload')">
                  <Upload
                    v-if="false"
                    :beforeUpload="handleBeforeUpload"
                    :multiple="false"
                    :showUploadList="false"
                    accept=".svg"
                    @change="handleChangeSvg"
                  >
                    <Button class="mt-5"> بارگذاری فایل svg </Button>
                  </Upload>

                  <Upload
                    v-if="false"
                    :beforeUpload="handleBeforeUpload"
                    :multiple="false"
                    :showUploadList="false"
                    @change="handleChangeJson"
                  >
                    <Button class="mt-5"> بارگذاری فایل json </Button>
                  </Upload>
                  <LayerFileList />
                </div>
              </div>
            </Transition>
          </div>
          <div class="price">
            <!--          قیمت کل : 25000-->
          </div>
        </div>
        <!--      <div class="h-screen relative h-screen board-main">
          <div class="absolute z-50 p-3 w-full" style="background: #fff">
            <div class="flex justify-between">
              <TopRightButtons />
              <TopLeftButtons />
            </div>
          </div>
          <div class="absolute bottom-board left-0 bottom-0 z-50 p-3" style="background: #fff">
            <BottomLeftButtons />
          </div>
          <pages v-if="false" />

          <div class="stages overflow-auto">
            <Stage />
          </div>
        </div>-->

        <div
          class="relative board-main h-full w-full"
          style="display: grid; grid-template-rows: 50px auto 50px"
        >
          <div class="z-50 w-full bg-white flex justify-between p-2">
            <TopRightButtons />
            <TopLeftButtons />
          </div>

          <StageComponent />

          <div class="z-50 p-3 w-full" style="position: relative">
            <div class="absolute bottom-board left-0 bottom-0 z-50 p-2 toolbar-bottom-left">
              <BottomLeftButtons />
            </div>
          </div>
        </div>

        <div
          id="board-left-side"
          class="h-screen px-3 pt-2 pb-10 overflow-auto max-h-screen border-r border-gray-300"
        >
          <Transition :css="false">
            <TextOptions
              v-if="uiStore.isVisible('ui.text_option')"
              v-motion="'cube'"
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: -400, opacity: 0 }"
              :leave="{ x: 400, opacity: 0 }"
            />
          </Transition>
        </div>
      </div>
      <!-- end main -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TextOptions from '@b/components/Option/TextOptions.vue'
  import { uiStore, stageStore } from '@b/core'
  import ShapeContextMenu from '@b/views/Board/src/components/context/ShapeContextMenu.vue'
  import BackgroundContextMenu from '@b/views/Board/src/components/context/BackgroundContextMenu.vue'
  import { useDesign } from '@b/utils/useDesign'
  import ImageStyle from '@b/components/Style/ImageStyle.vue'
  import ShapeStyle from '@b/components/Style/ShapeStyle.vue'
  import TextStyle from '@b/components/Style/TextStyle.vue'
  import BackgroundStyle from '@b/components/Style/BackgroundStyle.vue'
  import { Button, Spin, Upload } from 'ant-design-vue/es'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { get } from 'lodash-es'
  import TopRightButtons from '@b/views/Board/src/components/tools/TopRightButtons.vue'
  import TopLeftButtons from '@b/views/Board/src/components/tools/TopLeftButtons.vue'
  import BottomLeftButtons from '@b/views/Board/src/components/tools/BottomLeftButtons.vue'
  import LayerFileList from './src/components/stages/LayerFileList.vue'
  import StageComponent from '@b/views/Board/src/components/stages/StageComponent.vue'

  const { prefixCls } = useDesign('board')

  const preloader = ref(true)

  const { currentRoute } = useRouter()

  const id = get(currentRoute.value, 'params.id')

  async function init() {
    if (id) {
      const { data } = await stageStore.getDataFromServer(id)
      stageStore.setDesign(data)
      preloader.value = false
    } else {
      preloader.value = false
    }
  }

  init()

  function handleBeforeUpload(file, fileList) {
    return false
  }

  function handleChangeSvg({ file, fileList }) {
    const isSvg = file.type == 'image/svg+xml'
    if (!isSvg) {
      alert('فایل نامتعبر')
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 12
    if (!isLt2M) {
      alert('حجم فایل نامعتبر می باشد')
      return
    }

    const fileReader = new FileReader()
    fileReader.addEventListener('load', (event) => {
      const data = event.target?.result
      //console.log()
      //debugger
      stageStore.importFromSvg(data, 'container')
    })
    fileReader.readAsText(file)
  }

  function handleChangeJson({ file, fileList }) {
    //console.log(file)
    /* const isSvg = file.type == 'image/svg+xml'
    if (!isSvg) {
      alert('فایل نامتعبر')
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 12
    if (!isLt2M) {
      alert('حجم فایل نامعتبر می باشد')
      return
    }*/

    const fileReader = new FileReader()
    fileReader.addEventListener('load', (event) => {
      const data = event.target?.result
      stageStore.importFromJson(JSON.parse(data), 'container')
    })
    fileReader.readAsText(file)
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-board';

  .@{pre}-main {
    display: grid;
    grid-template-columns: 230px auto 230px;
    /* grid-template-columns: 15% 70% 15%;*/
  }

  .board-main {
    background: #e5e5e5;
  }

  .shape-context-menu,
  .background-context-menu {
    position: absolute;
    width: 230px;
    border-radius: @border-radius-base;
    z-index: 100;
    display: none;
    border: 1px solid #ddd;
  }

  .price {
    background: @cp-price-background;
  }

  .toolbar-bottom-left {
    background-color: white;
    border-top-right-radius: 4px;
    box-shadow: 1px -1px 1px #cbcbcb;
  }
</style>
