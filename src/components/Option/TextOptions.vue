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

    <a-popover  placement="right"  arrow-point-at-center>
      <template #content>

<!--        <sketch :value="colors"/>-->
<!--        <twitter :value="colors" />-->
        <swatches :value="colors" />

<!--        <div style="width:300px;">
          <div class="grid grid-cols-6 gap-2">
            <div
                :class="[uiStore.isActive('ui.stage_top_right_menu.children.opacity_button.children.number_input') || uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input') ? 'col-span-4' : 'col-span-6']">
              <a-slider v-model:value="stageStore.opacity" :min="0" :max="100" :step="0.01"/>
            </div>
            <div v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input')">
              <a-input-number
                  :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button.children.number_input')"
                  style="width:105px"
                  v-model:value="stageStore.opacity"
                  :min="0"
                  :max="100"
                  :step="0.01"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
              />
            </div>
          </div>

        </div>-->
      </template>
      <a-button class="mr-2">
        <!--<icon-sun/>-->
        <icon-brightness/>
      </a-button>
    </a-popover>


<!--
    <a-button class="mr-2">
      &lt;!&ndash;<icon-sun/>&ndash;&gt;
      <icon-brightness/>
    </a-button>
    <twitter :value="colors" />
-->



  </div>
</template>

<script lang="ts" setup>
import { stageStore } from "../../core";
import Swatches from "../ColorPicker/Solid/Swatches.vue";

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
