<template>
  <div>
    <a-dropdown placement="bottomCenter" v-if="uiStore.isVisible('ui.stage_top_right_menu.children.flip_rotate_button')"
                :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.flip_rotate_button')">
      <a-button class="mr-2">
        چرخش
        <icon-rotate/>
      </a-button>
      <template #overlay>
        <div style="background: white;border: 1px solid #eee">
          <div class="grid grid-cols-2">
            <div>
              <a-menu :selectable="false">
                <a-menu-item-group key="position_group">
                  <template #title>چرخش</template>
                  <a-menu-item key="rotate_90" @click="stageStore.applyRotateDegrees(90)">
                    چرخش
                    <span> &#176; 90</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </a-menu-item>
                  <a-menu-item key="rotate_minus_90">
                    -
                    چرخش
                    <span>   &#176; 90</span>
                  </a-menu-item>
                  <a-menu-item key="rotate_180">
                    چرخش
                    <span> &#176; 180</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </a-menu-item>
                  <a-menu-item key="rotate_minus_180">
                    -
                    چرخش
                    <span>   &#176; 180</span>
                  </a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </div>
            <div>
              <a-menu :selectable="false">
                <a-menu-item-group key="align_group">
                  <template #title>معکوس</template>
                  <a-menu-item key="flip_horizontal" @click="stageStore.applyFlipVertical()">
                    افقی
                    <icon-flip-horizontally />
                  </a-menu-item>
                  <a-menu-item key="flip_vertical" @click="stageStore.applyFlipHorizontal()">
                    عمودی
                    <icon-flip-vertically />
                  </a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </div>
          </div>
        </div>
      </template>
    </a-dropdown>

    <a-dropdown placement="bottomCenter" v-if="uiStore.isVisible('ui.stage_top_right_menu.children.position_button')"
                :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.position_button')">
      <a-button class="mr-2">
        موقعیت
        <icon-layers/>
      </a-button>
      <template #overlay>
        <div style="background: white;border: 1px solid #eee">
          <div class="grid grid-cols-2 ">
            <div>
              <a-menu :selectable="false">
                <a-menu-item-group key="position_group">
                  <template #title>لایه بندی</template>
                  <a-menu-item key="position_to_forward">بیار رو
                    <icon-bring-forward/>
                  </a-menu-item>
                  <a-menu-item key="position_up">
                    رویی
                    <icon-bring-to-front/>
                  </a-menu-item>
                  <a-menu-item key="position_down">
                    زیرین
                    <icon-sent-to-back/>
                    <!--<icon-send-to-back />-->
                  </a-menu-item>
                  <a-menu-item key="position_to_bottom">برو زیر
                    <icon-send-backward/>
                  </a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </div>
            <div>
              <a-menu :selectable="false">
                <a-menu-item-group key="align_group">
                  <template #title>موقعیت قرارگیری</template>
                  <a-menu-item key="align_left">تراز چپ
                    <icon-align-left/>
                  </a-menu-item>
                  <a-menu-item key="align_center">تراز وسط
                    <icon-vertically-centered/>
                  </a-menu-item>
                  <a-menu-item key="align_right">تراز راست
                    <icon-align-right/>
                  </a-menu-item>
                  <a-menu-item key="align_top">
                    تراز بالا
                    <icon-align-top-two/>
                  </a-menu-item>
                  <a-menu-item key="align_middel">
                    تراز میانی
                    <icon-align-vertical-center-two/>
                  </a-menu-item>
                  <a-menu-item key="align_bottom">
                    تراز پایین
                    <icon-align-bottom-two/>
                  </a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </div>
          </div>
        </div>
      </template>
    </a-dropdown>

    <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.lock_button')">
      <template #title>
        {{ stageStore.layerLock ? 'بازگشویی قفل لایه' : 'قفل کردن لایه' }}
      </template>
      <a-button class="mr-2" @click="stageStore.applyToggleLockUnlock()" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.lock_button')">
        <icon-lock v-if="stageStore.layerLock"/>
        <icon-unlock v-else />

      </a-button>
    </a-tooltip>

    <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.crop_button')">
      <template #title>برش</template>
      <a-button class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.crop_button')">
        <icon-cutting/>
      </a-button>
    </a-tooltip>

    <a-popover
        v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') && uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')">
      <template #content>
        <div style="width:300px;">
          <div class="grid grid-cols-6 gap-2">
            <div
                :class="[uiStore.isActive('ui.stage_top_right_menu.children.opacity_button.children.number_input') || uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input') ? 'col-span-4' : 'col-span-6']">
              <a-slider @change="stageStore.applyOpacity()" v-model:value="stageStore.opacity" :min="0" :max="100" :step="0.01"/>
            </div>
            <div v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input')">
              <a-input-number
                  @change="stageStore.applyOpacity()"
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

        </div>
      </template>
      <a-button class="mr-2">
        <!--<icon-sun/>-->
        <icon-brightness/>
      </a-button>
    </a-popover>

    <a-button class="mr-2"
              v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') && !uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')"
              :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')">
      <!--<icon-sun/>-->
      <icon-brightness/>
    </a-button>

    <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.copy_button')">
      <template #title>کپی</template>
      <a-button class="mr-2" @click="stageStore.applyDuplicate()" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.copy_button')">
        <icon-copy/>
      </a-button>
    </a-tooltip>

    <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.delete_button')">
      <template #title>حذف</template>
      <a-button @click="stageStore.applyDelete()"  class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.delete_button')">
        <icon-delete/>
      </a-button>
    </a-tooltip>

  </div>
</template>

<script lang="ts" setup>
import {uiStore,stageStore} from "../../core";

</script>

<style scoped>

</style>