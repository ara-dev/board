<template>
  <div class="flex items-center gap-2">
    <Tooltip>
      <template #title>ذخیره</template>
      <IconButton icon="tabler:device-floppy" @click="save" />
    </Tooltip>

    <Tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.delete_button')">
      <template #title>حذف</template>
      <IconButton
        icon="tabler:trash"
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.delete_button')"
        @click="stageStore.applyDelete()"
      />
    </Tooltip>

    <Tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.copy_button')">
      <template #title>کپی</template>
      <IconButton
        icon="ion:copy-outline"
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.copy_button')"
        @click="stageStore.applyDuplicate()"
      />
    </Tooltip>

    <IconButton
      icon="ion:contrast-outline"
      v-if="
        uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') &&
        !uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')
      "
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')"
    />

    <Popover
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
              <InputNumber
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
              <Slider
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
      <IconButton icon="ion:contrast-outline" />
    </Popover>

    <Tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.crop_button')">
      <template #title>برش</template>
      <IconButton
        icon="ion:crop-outline"
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.crop_button')"
      />
    </Tooltip>

    <Tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.lock_button')">
      <template #title>
        {{ stageStore.layerLock ? 'بازگشویی قفل لایه' : 'قفل کردن لایه' }}
      </template>
      <IconButton
        :icon="getLockIcon"
        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.lock_button')"
        @click="stageStore.applyToggleLockUnlock()"
      />
    </Tooltip>

    <Dropdown
      v-if="uiStore.isVisible('ui.stage_top_right_menu.children.flip_rotate_button')"
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.flip_rotate_button')"
      placement="bottomCenter"
    >
      <IconButton icon="carbon:rotate" title="چرخش" />
      <template #overlay>
        <div style="background: white; border: 1px solid #eee">
          <div class="grid grid-cols-2">
            <div>
              <Menu :selectable="false">
                <MenuItemGroup key="position_group">
                  <template #title>چرخش</template>
                  <MenuItem key="rotate_90" @click="stageStore.applyRotateDegrees(-90)">
                    چرخش
                    <span> &#176; 90</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </MenuItem>
                  <MenuItem key="rotate_minus_90" @click="stageStore.applyRotateDegrees(90)">
                    چرخش
                    <span> &#176; 90</span>
                    -
                  </MenuItem>
                  <MenuItem key="rotate_180" @click="stageStore.applyRotateDegrees(-180)">
                    چرخش
                    <span> &#176; 180</span>
                    <!--<sup style="font-size: 20px">&deg;</sup>-->
                  </MenuItem>
                  <MenuItem key="rotate_minus_180" @click="stageStore.applyRotateDegrees(180)">
                    چرخش
                    <span> &#176; 180</span>
                    -
                  </MenuItem>
                </MenuItemGroup>
              </Menu>
            </div>
            <div>
              <Menu :selectable="false">
                <MenuItemGroup key="align_group">
                  <template #title>معکوس</template>
                  <MenuItem key="flip_horizontal" @click="stageStore.applyFlipVertical()">
                    <Icon icon="fluent:flip-horizontal-20-regular" size="23" />
                    افقی
                  </MenuItem>
                  <MenuItem key="flip_vertical" @click="stageStore.applyFlipHorizontal()">
                    <Icon icon="fluent:flip-vertical-20-regular" size="23" />
                    عمودی
                  </MenuItem>
                </MenuItemGroup>
              </Menu>
            </div>
          </div>
        </div>
      </template>
    </Dropdown>

    <Dropdown
      v-if="uiStore.isVisible('ui.stage_top_right_menu.children.position_button')"
      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.position_button')"
      placement="bottomCenter"
    >
      <IconButton icon="ion:layers-outline" title="موقعیت" />

      <template #overlay>
        <div style="background: white; border: 1px solid #eee">
          <div class="grid grid-cols-2">
            <div>
              <Menu :selectable="false">
                <MenuItemGroup key="position_group">
                  <template #title>لایه بندی</template>
                  <MenuItem key="position_to_forward" @click="stageStore.applyZIndexTop()">
                    <Icon icon="fluent:position-forward-20-filled" size="23" />
                    بیار رو
                  </MenuItem>
                  <MenuItem key="position_up" @click="stageStore.applyZIndexUp()">
                    <Icon icon="fluent:position-to-front-20-filled" size="23" />
                    رویی
                  </MenuItem>
                  <MenuItem key="position_down" @click="stageStore.applyZIndexDown()">
                    <Icon icon="fluent:position-to-back-20-filled" size="23" />
                    زیرین
                  </MenuItem>
                  <MenuItem key="position_to_bottom" @click="stageStore.applyZIndexBottom()">
                    <Icon icon="fluent:position-backward-20-filled" size="23" />
                    برو زیر
                  </MenuItem>
                </MenuItemGroup>
              </Menu>
            </div>
            <div>
              <Menu :selectable="false">
                <MenuItemGroup key="align_group">
                  <template #title>موقعیت قرارگیری</template>
                  <MenuItem key="align_left" @click="stageStore.applyAlignLeft()">
                    <Icon icon="fluent:align-left-20-regular" size="23" />
                    تراز چپ
                  </MenuItem>
                  <MenuItem key="align_center">
                    <Icon icon="fluent:align-center-horizontal-20-regular" size="23" />
                    تراز وسط
                  </MenuItem>
                  <MenuItem key="align_right" @click="stageStore.applyAlignRight()">
                    <Icon icon="fluent:align-right-16-regular" size="23" />
                    تراز راست
                  </MenuItem>
                  <MenuItem key="align_top">
                    <Icon icon="fluent:align-top-20-regular" size="23" />
                    تراز بالا
                  </MenuItem>
                  <MenuItem key="align_middel">
                    <Icon icon="fluent:align-center-vertical-32-regular" size="23" />
                    تراز میانی
                  </MenuItem>
                  <MenuItem key="align_bottom">
                    <Icon icon="fluent:align-bottom-20-regular" size="23" />
                    تراز پایین
                  </MenuItem>
                </MenuItemGroup>
              </Menu>
            </div>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore, stageStore } from '@b/core'
  import Icon from '../../../../../components/Icon/Icon.vue'
  import IconButton from '../../../../../components/Button/IconButton.vue'
  import { computed } from 'vue'
  import useDesignStore from '@b/model/design'
  import { message } from 'ant-design-vue'
  import {
    MenuItem,
    Menu,
    MenuItemGroup,
    Dropdown,
    Tooltip,
    InputNumber,
    Popover,
    Slider,
  } from 'ant-design-vue/es'

  const getLockIcon = computed(() => {
    if (stageStore.layerLock) {
      return 'ion:lock-open-outline'
    }
    return 'ion:lock-closed-outline'
  })

  async function save() {
    try {
      const design = await stageStore.exportToDesign()
      const designStore = useDesignStore()
      await designStore.updateDesign(design)
      message.success('تغییرات با موفقیت ذخیره شد')
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
</script>

<style lang="less"></style>
