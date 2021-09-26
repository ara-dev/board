<template>
  <div class="h-screen" style="background:#fff" ref="fullScreen">
    <!-- START TOPBAR -->
    <div class="w-full p-3 topbar" v-if="uiStore.isVisible('ui.topbar')">
      <a-button>ذخیره و ادامه</a-button>
    </div>
    <!-- END TOPBAR -->
    <!-- START MAIN -->
    <div class="main">
      <div class="grid grid-cols-12">
        <!-- START CONFIG TOOLBAR -->
        <div class="col-span-2 border-r border-gray-300 pr-5 pt-3 pb-5 max-h-screen overflow-auto"
             dir="rtl">
        </div>
        <!-- END CONFIG TOOLBAR -->

        <!-- START MAIN BOARD -->
        <div class="relative col-span-7 main-board overflow-auto h-screen">
          <div class="absolute left-3 top-3" style="z-index: 100">


            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.redo_undo_button')">
              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')"
                        v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                <icon-redo/>
              </a-button>

              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')"
                        v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')">
                <icon-undo/>
              </a-button>
            </a-button-group>
          </div>
          <div class="absolute bottom-board left-3 bottom-3" style="z-index: 100;">
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.zoom_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
                <template #title>بزرگ نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')"
                          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">

                  <icon-zoom-in/>
                </a-button>
              </a-tooltip>
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                <template #title>کوچک نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')"
                          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                  <icon-zoom-out/>
                </a-button>
              </a-tooltip>
            </a-button-group>
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.fullscreen_fit_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')">
                <!--<template #title v-if="isFullscreen"> حال عادی</template>-->
                <!--<template #title v-else>تمام صفحه</template>-->
                <template #title>تمام صفحه</template>
                <a-button @click="toggle" :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')">

                  <icon-off-screen-two v-if="isFullscreen"/>
                  <icon-full-screen v-else/>

                </a-button>
              </a-tooltip>
              <a-button :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')"
                        v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')">
                100%
              </a-button>
            </a-button-group>
            <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
              <a-button :disabled="!uiStore.isActive('ui.preview_button')">
                <icon-playback-progress/>
              </a-button>
            </a-button-group>
          </div>

          <div class="absolute bottom-board right-3 top-3" style="z-index: 100;" v-if="uiStore.isVisible('ui.stage_top_right_menu')">

            <a-dropdown placement="bottomCenter" :v-if="uiStore.isVisible('ui.stage_top_right_menu.children.flip_rotate_button')"
                        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.flip_rotate_button')" >
              <a-button class="mr-2" >
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
                          <a-menu-item key="position_to_forward">

                            <icon-bring-forward/>
                          </a-menu-item>
                        </a-menu-item-group>
                      </a-menu>
                    </div>
                    <div>
                      <a-menu :selectable="false">
                        <a-menu-item-group key="align_group">
                          <template #title>معکوس</template>
                          <a-menu-item key="flip_vertical">
                            <icon-align-left/>
                          </a-menu-item>
                          <a-menu-item key="align_center">
                            <icon-vertically-centered/>
                          </a-menu-item>
                          <a-menu-item key="align_right">
                            <icon-align-right/>
                          </a-menu-item>
                        </a-menu-item-group>
                      </a-menu>
                    </div>
                  </div>
                </div>
                <!--<a-menu>
                  <a-menu-item>
                    <a href="javascript:;">چرخش افقی
                      <icon-flip-horizontally />
                    </a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">
                      چرخش عمودی
                      <icon-flip-vertically />
                    </a>
                  </a-menu-item>

                </a-menu>-->
              </template>
            </a-dropdown>

            <a-dropdown placement="bottomCenter" v-if="uiStore.isVisible('ui.stage_top_right_menu.children.position_button')"
                        :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.position_button')">
              <a-button class="mr-2" >
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
              <template #title>قفل - جلوگیری از تغییر</template>
              <a-button class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.lock_button')">
                <icon-unlock/>
                <icon-lock/>
              </a-button>
            </a-tooltip>

            <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.crop_button')">
              <template #title>برش</template>
              <a-button class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.crop_button')">
                <icon-cutting/>
              </a-button>
            </a-tooltip>

            <a-popover v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') && uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')" >
              <template #content >
               <div style="width:300px;">
                 <div class="grid grid-cols-6 gap-2" >
                   <div :class="[uiStore.isActive('ui.stage_top_right_menu.children.opacity_button.children.number_input') || uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input') ? 'col-span-4' : 'col-span-6']">
                     <a-slider v-model:value="opacity" :min="0" :max="100" :step="0.01"  />
                   </div>
                   <div v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button.children.number_input')">
                     <a-input-number
                         :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button.children.number_input')"
                         style="width:105px"
                         v-model:value="opacity"
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
              <a-button class="mr-2" >
                <!--<icon-sun/>-->
                <icon-brightness/>
              </a-button>
            </a-popover>

            <a-button class="mr-2" v-if="uiStore.isVisible('ui.stage_top_right_menu.children.opacity_button') && !uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')"
                      :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.opacity_button')">
              <!--<icon-sun/>-->
              <icon-brightness/>
            </a-button>


            <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.copy_button')">
              <template #title>کپی</template>
              <a-button class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.copy_button')">
                <icon-copy/>
              </a-button>
            </a-tooltip>

            <a-tooltip v-if="uiStore.isVisible('ui.stage_top_right_menu.children.delete_button')">
              <template #title>حذف</template>
              <a-button class="mr-2" :disabled="!uiStore.isActive('ui.stage_top_right_menu.children.delete_button')">
                <icon-delete/>
              </a-button>
            </a-tooltip>

          </div>

          <div class="stages">
            <stage style="height:100vh"/>
          </div>
        </div>
        <!-- END BOARD -->

        <!-- START TOOLBAR -->
        <div class="col-span-3 border-l border-gray-300 h-screen">
          <div class="grid grid-cols-12 h-screen">
            <div class="col-span-10 pr-3 pt-3 pb-10 overflow-auto max-h-screen" dir="rtl">

            </div>
            <div class="col-span-2 border-l	border-gray-300 overflow-auto max-h-screen">
              <ToolBar/>
            </div>
          </div>
        </div>
        <!-- END TOOLBAR  -->
      </div>
    </div>
    <!-- END MAIN -->
  </div>
</template>


<script lang="ts" setup>
import {ref, inject, watch} from 'vue'
import {useFullscreen} from "@vueuse/core"
import UiElementStore from './core/ui'
import {DEFAULT_ICON_CONFIGS, IconProvider} from '@icon-park/vue-next'
IconProvider({...DEFAULT_ICON_CONFIGS, size: 24, theme: "outline", strokeWidth: "2", strokeLinejoin: "bevel"});
let uiStore: UiElementStore = inject('uiStore') as UiElementStore;
//full screen page
const fullScreen = ref<HTMLElement | null>(null);
const {isFullscreen, enter, exit, toggle} = useFullscreen(fullScreen);
const opacity = ref<number>(100);

</script>

<style lang="less">

.main-footer {
  background: #fff;
}

.main-board {
  background: #E5E5E5;
}


</style>
