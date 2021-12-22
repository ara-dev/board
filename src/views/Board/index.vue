<template>
  <div class="h-screen">
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
                <AUpload
                  :beforeUpload="handleBeforeUpload"
                  :multiple="false"
                  :showUploadList="false"
                  @change="handleChangeSvg"
                >
                  <AButton class="mt-5"> بارگذاری فایل svg </AButton>
                </AUpload>

                <AUpload
                  :beforeUpload="handleBeforeUpload"
                  :multiple="false"
                  :showUploadList="false"
                  @change="handleChangeJson"
                >
                  <AButton class="mt-5"> بارگذاری فایل json </AButton>
                </AUpload>

                <AButton class="mt-5" @click="save"> ذخیره فایل </AButton>
              </div>
            </div>
          </Transition>
        </div>
        <div class="price">قیمت کل : 25000</div>
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
        <div class="z-50 p-3 w-full" style="background: #fff">
          <div class="flex justify-between">
            <TopRightButtons />
            <TopLeftButtons />
          </div>
        </div>
        <!--        <div>

        </div>-->
        <Stage />
        <!--        <div class="h-full w-full" style="position: relative">-->

        <!--            <div style="height: 1500px; width: 2000px">5555555</div>-->
        <!--        </div>-->
        <div class="z-50 p-3 w-full" style="position: relative">
          <div class="absolute bottom-board left-0 bottom-0 z-50 p-3" style="background: #fff">
            <BottomLeftButtons />
          </div>
        </div>
        <!--        <div class="overflow-auto" style="height: 2000px; width: 2000px">dsfsdf</div>-->
        <!--

        <div class="stages p-5 overflow-auto" style="position: relative">
          <Stage />
        </div>-->
        <!-- <div class="absolute z-50 p-3 w-full" style="background: #fff">
          <div class="flex justify-between">
            <TopRightButtons />
            <TopLeftButtons />
          </div>
        </div>

        <pages v-if="false" />

        <div class="stages overflow-auto">

        </div>-->
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
      <!--   overflow-auto   -->
    </div>
    <!-- end main -->
  </div>
</template>

<script lang="ts" setup>
  import TextOptions from '../../components/Option/TextOptions.vue'
  import { uiStore, stageStore } from '../../core'
  import ShapeContextMenu from '../../components/Stage/ShapeContextMenu.vue'
  import BackgroundContextMenu from '../../components/Stage/BackgroundContextMenu.vue'
  import { useDesign } from '../../utils/useDesign'
  import ImageStyle from '../../components/Style/ImageStyle.vue'
  import ShapeStyle from '../../components/Style/ShapeStyle.vue'
  import TextStyle from '../../components/Style/TextStyle.vue'
  import BackgroundStyle from '../../components/Style/BackgroundStyle.vue'

  const { prefixCls } = useDesign('board')

  function handleBeforeUpload(file, fileList) {
    return false
  }

  function save() {
    const data = stageStore.exportToJson()
    console.log(data)

    // Get the data from each element on the form.
    /*const name = document.getElementById('txtName');
    const age = document.getElementById('txtAge');
    const email = document.getElementById('txtEmail');
    const country = document.getElementById('selCountry');
    const msg = document.getElementById('msg');*/

    // This variable stores all the data.
    /* let data =
        '\r Name: ' + name.value + ' \r\n ' +
        'Age: ' +age.value + ' \r\n ' +
        'Email: ' + email.value + ' \r\n ' +
        'Country: ' + country.value + ' \r\n ' +
        'Message: ' + msg.value;*/

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' })
    const sFileName = 'formData.json' // The file to save the data.
    let newLink = document.createElement('a')
    newLink.download = sFileName
    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB)
    } else {
      newLink.href = window.URL.createObjectURL(textToBLOB)
      newLink.style.display = 'none'
      document.body.appendChild(newLink)
    }
    newLink.click()
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
      stageStore.importFromSvg(data, 'container')
    })
    fileReader.readAsText(file)
  }

  function handleChangeJson({ file, fileList }) {
    console.log(file)
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
      //console.log()
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
</style>
