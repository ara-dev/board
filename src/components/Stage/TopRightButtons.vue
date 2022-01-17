<template>
  <div class="flex items-center gap-2">
    <ATooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.delete_button')">
      <template #title>حذف</template>
      <AButton
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.delete_button')"
        @click="stageStore.applyDelete()"
      >
        <Icon icon="ion:trash-outline" size="23" />
      </AButton>
    </ATooltip>

    <ATooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.copy_button')">
      <template #title>کپی</template>
      <AButton
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.copy_button')"
        @click="stageStore.applyDuplicate()"
      >
        <Icon icon="ion:copy-outline" size="23" />
      </AButton>
    </ATooltip>

    <AButton
      v-if="
        uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') &&
        !uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')
      "
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')"
    >
      <Icon icon="ion:contrast-outline" size="23" />
    </AButton>

    <APopover
      v-if="
        uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') &&
        uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')
      "
    >
      <template #content>
        <div style="width: 300px">
          <div class="grid grid-cols-6 gap-2">
            <div
              v-if="
                uiStore.isVisible(
                  'ui.stage_top_right_menu.children.opacity_button.children.number_input',
                )
              "
              class="col-span-2"
            >
              <a-input-number
                v-model:value="stageStore.opacity"
                :disabled="
                  !uiStore.isActive(
                    'ui.stage_top_right_menu.children.opacity_button.children.number_input',
                  )
                "
                :formatter="(value) => `${value}%`"
                :max="100"
                :min="0"
                :parser="(value) => value.replace('%', '')"
                :step="0.01"
                style="width: 100%"
                @change="stageStore.applyOpacity()"
              />
            </div>
            <div
              :class="[
                uiStore.isActive(
                  'ui.stage_top_right_menu.children.opacity_button.children.number_input',
                ) ||
                uiStore.isVisible(
                  'ui.stage_top_right_menu.children.opacity_button.children.number_input',
                )
                  ? 'col-span-4'
                  : 'col-span-6',
              ]"
            >
              <ASlider
                v-model:value="stageStore.opacity"
                :max="100"
                :min="0"
                :step="0.01"
                @change="stageStore.applyOpacity()"
              />
            </div>
          </div>
        </div>
      </template>
      <AButton class="mr-2">
        <Icon icon="ion:contrast-outline" size="23" />
      </AButton>
    </APopover>

    <ATooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.crop_button')">
      <template #title>برش</template>
      <AButton :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.crop_button')">
        <Icon icon="ion:crop-outline" size="23"
      /></AButton>
    </ATooltip>

    <ATooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.lock_button')">
      <template #title>
        {{ stageStore.layerLock ? 'بازگشویی قفل لایه' : 'قفل کردن لایه' }}
      </template>
      <AButton
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.lock_button')"
        @click="stageStore.applyToggleLockUnlock()"
      >
        <div v-if="stageStore.layerLock">
          <Icon icon="ion:lock-closed-outline" size="23" />
        </div>
        <div v-else>
          <Icon icon="ion:lock-open-outline" size="23" />
        </div>
      </AButton>
    </ATooltip>

    <ADropdown
      v-if="uiStore.isVisible('ui.stage_top_right_menu.children.flip_rotate_button')"
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.flip_rotate_button')"
      placement="bottomCenter"
    >
      <AButton>
        <Icon icon="carbon:rotate" size="23" />
        <span class="align-top mr-1">چرخش</span>
      </AButton>
      <template #overlay>
        <div style="background: white; border: 1px solid #eee">
          <div class="grid grid-cols-2">
            <div>
              <AMenu :selectable="false">
                <AMenuItemGroup key="position_group">
                  <template #title>چرخش</template>
                  <AMenuItem key="rotate_90" @click="stageStore.applyRotateDegrees(-90)">
                    چرخش
                    <span> &#176; 90</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </AMenuItem>
                  <AMenuItem key="rotate_minus_90" @click="stageStore.applyRotateDegrees(90)">
                    چرخش
                    <span> &#176; 90</span>
                    -
                  </AMenuItem>
                  <AMenuItem key="rotate_180" @click="stageStore.applyRotateDegrees(-180)">
                    چرخش
                    <span> &#176; 180</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </AMenuItem>
                  <AMenuItem key="rotate_minus_180" @click="stageStore.applyRotateDegrees(180)">
                    چرخش
                    <span> &#176; 180</span>
                    -
                  </AMenuItem>
                </AMenuItemGroup>
              </AMenu>
            </div>
            <div>
              <AMenu :selectable="false">
                <a-menu-item-group key="align_group">
                  <template #title>معکوس</template>
                  <a-menu-item key="flip_horizontal" @click="stageStore.applyFlipVertical()">
                    <Icon icon="fluent:flip-horizontal-20-regular" size="23" />
                    افقی
                  </a-menu-item>
                  <a-menu-item key="flip_vertical" @click="stageStore.applyFlipHorizontal()">
                    <Icon icon="fluent:flip-vertical-20-regular" size="23" />
                    عمودی
                  </a-menu-item>
                </a-menu-item-group>
              </AMenu>
            </div>
          </div>
        </div>
      </template>
    </ADropdown>

    <ADropdown
      v-if="uiStore.isVisible('ui.stage_top_right_menu.children.position_button')"
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.position_button')"
      placement="bottomCenter"
    >
      <AButton>
        <Icon icon="ion:layers-outline" size="23" />
        <span class="align-top mr-1">موقعیت</span>
      </AButton>
      <template #overlay>
        <div style="background: white; border: 1px solid #eee">
          <div class="grid grid-cols-2">
            <div>
              <AMenu :selectable="false">
                <AMenuItemGroup key="position_group">
                  <template #title>لایه بندی</template>
                  <AMenuItem key="position_to_forward" @click="stageStore.applyZIndexTop()">
                    <Icon icon="fluent:position-forward-20-filled" size="23" />
                    بیار رو
                  </AMenuItem>
                  <AMenuItem key="position_up" @click="stageStore.applyZIndexUp()">
                    <Icon icon="fluent:position-to-front-20-filled" size="23" />
                    رویی
                  </AMenuItem>
                  <AMenuItem key="position_down" @click="stageStore.applyZIndexDown()">
                    <Icon icon="fluent:position-to-back-20-filled" size="23" />
                    زیرین
                  </AMenuItem>
                  <AMenuItem key="position_to_bottom" @click="stageStore.applyZIndexBottom()">
                    <Icon icon="fluent:position-backward-20-filled" size="23" />
                    برو زیر
                  </AMenuItem>
                </AMenuItemGroup>
              </AMenu>
            </div>
            <div>
              <AMenu :selectable="false">
                <AMenuItemGroup key="align_group">
                  <template #title>موقعیت قرارگیری</template>
                  <AMenuItem key="align_left" @click="stageStore.applyAlignLeft()">
                    <Icon icon="fluent:align-left-20-regular" size="23" />
                    تراز چپ
                  </AMenuItem>
                  <AMenuItem key="align_center">
                    <Icon icon="fluent:align-center-horizontal-20-regular" size="23" />
                    تراز وسط
                  </AMenuItem>
                  <AMenuItem key="align_right" @click="stageStore.applyAlignRight()">
                    <Icon icon="fluent:align-right-16-regular" size="23" />
                    تراز راست
                  </AMenuItem>
                  <AMenuItem key="align_top">
                    <Icon icon="fluent:align-top-20-regular" size="23" />
                    تراز بالا
                  </AMenuItem>
                  <AMenuItem key="align_middel">
                    <Icon icon="fluent:align-center-vertical-32-regular" size="23" />
                    تراز میانی
                  </AMenuItem>
                  <AMenuItem key="align_bottom">
                    <Icon icon="fluent:align-bottom-20-regular" size="23" />
                    تراز پایین
                  </AMenuItem>
                </AMenuItemGroup>
              </AMenu>
            </div>
          </div>
        </div>
      </template>
    </ADropdown>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore, stageStore } from '../../core'
  import Icon from '../Icon/Icon.vue'
</script>

<style lang="less"></style>
