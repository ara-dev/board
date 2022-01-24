<template>
  <div>
    <span>نوشته</span>
    <Textarea v-model:value="currentText" />
    <p class="text-gray-500 mb-2 mt-3 text-xs font-semibold">فونت</p>
    <!--    @change="changeFont"-->

    <!--
    option-filter-prop="children"
   -->

    <Select
      v-model:value="stageStore.textOption.fontFamily"
      :filter-option="filterOption"
      class="w-full"
      show-search
      @change="changeFont"
    >
      <SelectOption v-for="(item, index) in fontsStore.rows" :key="index" :value="item.name">
        {{ item.fa_name }}
      </SelectOption>
      <SelectOption value="lucy">Lucy</SelectOption>
    </Select>
    <Divider />
    <p class="text-gray-500 mb-2 text-xs font-semibold">سایز فونت</p>
    <div class="text-center">
      <InputNumber
        v-model:value="stageStore.textOption.fontSize"
        :min="0"
        @change="stageStore.applyFontSize()"
      />
    </div>

    <Divider />
    <p class="text-gray-500 mb-2 text-xs font-semibold">ترازبندی</p>

    <AlignButton />

    <Divider />
    <p class="text-gray-500 mb-2 text-xs font-semibold">رنگ</p>

    <!--    <swatches :value="stageStore.currentColor.hex" @change="(val)=> stageStore.currentColor=val" />
        <twitter :value="stageStore.currentColor.hex" @change="(val)=> stageStore.currentColor=val" />-->
    <!--    @change="test()"-->
    <!--    v-model:value="stageStore.currentColor"-->

    <!--    <div class="mx-auto">-->
    <Popover arrow-point-at-center>
      <template #content>
        <sketch
          :value="stageStore.currentColor.hex"
          @change="(val) => (stageStore.currentColor = val)"
        />
      </template>
      <!--

        <a-input-group compact>
          <span :style="`width:30px;height:32px;background:${stageStore.currentColor.hex}`"></span>
          <a-input style="width:30%" v-model:value="stageStore.currentColor.hex" />
        </a-input-group>
-->

      <!--        <a-input v-model:value="value5">
          <template >
            <setting-outlined />
          </template >
        </a-input>-->

      <Input
        v-model:value="stageStore.currentColor.hex"
        placeholder="Basic usage"
        style="width: 30%; display: inline"
      />
      <div
        :style="`display: inline;width:30px;height:32px;background:${stageStore.currentColor.hex}`"
        >&nbsp;</div
      >

      <!--        <current-color />-->

      <!--        <a-input prefix="￥" suffix="RMB" />-->

      <!--        <a-button class="ml-2">
          &lt;!&ndash;<icon-sun/>&ndash;&gt;
&lt;!&ndash;          <div ></div>&ndash;&gt;
          <span :style="`width:30px;height:32px;background:${stageStore.currentColor.hex}`" ></span>
         {{ stageStore.currentColor.hex }}
&lt;!&ndash;          <icon-brightness/>&ndash;&gt;
        </a-button>-->

      <!--        style="display:inline;"-->
      <!--        <a-input-group compact dir="ltr" >
          <a-input style="width:30%" v-model:value="stageStore.currentColor.hex" />

        </a-input-group>-->

      <!--        <a-input-search
            dir="ltr"
            v-model:value="value"
            placeholder="input search text"
            size="large"
            @search="onSearch"
        >
          <template #enterButton>
&lt;!&ndash;            <a-button>Custom</a-button>&ndash;&gt;
            <div :style="`width:30px;height:32px;background:${stageStore.currentColor.hex}`"></div>
          </template>
        </a-input-search>-->
    </Popover>
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
  import { stageStore } from '@b/core'
  import { fontsStore } from '@b/model/fonts'
  import Sketch from '@b/components/ColorPicker/Solid/Sketch.vue'
  import { baseURLApi } from '../../../themeConfig'
  import { useInstallFont } from '@b/utils/useInstallFont'
  import { computed } from 'vue'
  import { get } from 'lodash-es'
  import {
    Textarea,
    Select,
    Divider,
    Popover,
    Input,
    SelectOption,
    InputNumber,
  } from 'ant-design-vue/es'
  import AlignButton from '@b/components/Option/AlignButton.vue'

  const colors = {
    hex: '#194d33',
    hex8: '#194D33A8',
    hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
    hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
    rgba: { r: 25, g: 77, b: 51, a: 1 },
    a: 1,
  }

  /*function filterOption(input: string, option: any) {
    //debugger
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }*/

  function filterOption(input: string, option: any) {
    return option.children[0].children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  const currentText = computed({
    get() {
      const a = get(stageStore.state, 'selectedElements.0')
      if (a instanceof Konva.Text) {
        return a.text()
      }
      return
    },
    set(value) {
      const a = get(stageStore._state, 'selectedElements.0')
      if (a instanceof Konva.Text) {
        return a.text(value)
      }
    },
  })

  async function changeFont(fontName: string) {
    //debugger
    const font = fontsStore.rows.find((item) => item.name == fontName)
    if (font) {
      await useInstallFont(font.name, `${baseURLApi}${font.storage}`)
      stageStore.applyFontFamily({
        font_id: font._id,
      })
      /*const fontFace = new FontFace(font.name, `url(${baseURLApi}${font.storage})`)
      fontFace.load().then((loaded_face) => {
        // @ts-ignore
        document.fonts.add(loaded_face)
        document.body.style.fontFamily = font.name
      })*/
    }
  }
</script>

<style scoped></style>
