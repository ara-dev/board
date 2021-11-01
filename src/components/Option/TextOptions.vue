<template>
  <div>
    <p class="text-gray-500	mb-2 mt-3 text-xs font-semibold">فونت</p>
    <a-select class="w-full">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-divider/>
    <p class="text-gray-500	mb-2 text-xs font-semibold">سایز فونت</p>
    <div class="text-center">
      <a-input-number @change="stageStore.applyFontSize()" :min="0" v-model:value="stageStore.textOption.fontSize"/>
    </div>

    <a-divider/>
    <p class="text-gray-500	mb-2 text-xs font-semibold">ترازبندی</p>

    <AlignButton></AlignButton>

    <a-divider/>
    <p class="text-gray-500	mb-2 text-xs font-semibold">رنگ</p>

    <!--    <swatches :value="stageStore.currentColor.hex" @change="(val)=> stageStore.currentColor=val" />
        <twitter :value="stageStore.currentColor.hex" @change="(val)=> stageStore.currentColor=val" />-->
    <!--    @change="test()"-->
    <!--    v-model:value="stageStore.currentColor"-->

<!--    <div class="mx-auto">-->
      <a-popover arrow-point-at-center >
        <template #content>
          <sketch :value="stageStore.currentColor.hex" @change="(val)=> stageStore.currentColor=val" />
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

        <a-input v-model:value="stageStore.currentColor.hex" placeholder="Basic usage" style="width: 30%;display: inline" />
        <div :style="`display: inline;width:30px;height:32px;background:${stageStore.currentColor.hex} `">&nbsp;</div>

<!--        <current-color />-->

<!--        <a-input prefix="￥" suffix="RMB" />-->

<!--        <a-button class="mr-2">
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


      </a-popover>
<!--    </div>-->


  </div>
</template>

<script lang="ts" setup>
import {stageStore} from "../../core";
import Swatches from "../ColorPicker/Solid/Swatches.vue";
import Twitter from "../ColorPicker/Solid/Twitter.vue";
import Sketch from "../ColorPicker/Solid/Sketch.vue";
import CurrentColor from "./CurrentColor.vue";

const colors = {
  hex: '#194d33',
  hex8: '#194D33A8',
  hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
  hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
  rgba: {r: 25, g: 77, b: 51, a: 1},
  a: 1
}
</script>

<style scoped>

</style>
