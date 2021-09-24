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
        <div class="col-span-2 border-r border-gray-300 pr-5 pt-3 pb-5 max-h-screen overflow-auto config-tool"
             dir="rtl">
          <p class="text-xs font-bold">قرارگیری</p>
          <div class="flex mt-6">
            <div class="flex-1">
              <svg class="mr-1 " style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color"
                      d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
              </svg>
              <!-- <home theme="filled"/>-->
              <span class="text-xs">رویی</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color"
                      d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
              </svg>
              <span class="text-xs">زیرین</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
              </svg>
              <span class="text-xs">برو زیر</span>
            </div>
            <div class="flex-1">
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
              </svg>
              <span class="text-xs">بیار رو</span>
            </div>
          </div>
          <a-divider/>
        </div>
        <!-- END CONFIG TOOLBAR -->

        <!-- START MAIN BOARD -->
        <div class="relative col-span-7 main-board overflow-auto h-screen">
          <div class="absolute left-3 top-3" style="z-index: 100">
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.redo_undo_button')">
              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z"/>
                </svg>
              </a-button>
              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')">
                <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z"/>
                </svg>
              </a-button>
            </a-button-group>
          </div>
          <div class="absolute bottom-board left-3 bottom-3" style="z-index: 100;">
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.zoom_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
                <template #title>بزرگ نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')" v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                <template #title>کوچک نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')" v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
            </a-button-group>
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.fullscreen_fit_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')" >
                <!--<template #title v-if="isFullscreen"> حال عادی</template>-->
                <!--<template #title v-else>تمام صفحه</template>-->
                <template #title>تمام صفحه</template>
                <a-button @click="toggle" :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')">
                  <!-- <svg style="width:20px;height:20px" viewBox="0 0 24 24"  >
                     <path class="icon-color" d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z" />
                   </svg>-->
                  <svg v-if="isFullscreen" style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"/>
                  </svg>
                  <svg v-else style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
              <a-button :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')" v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')">
                100%
              </a-button>
            </a-button-group>
            <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
              <a-button :disabled="!uiStore.isActive('ui.preview_button')"  >
                <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M2,3H10A2,2 0 0,1 12,1A2,2 0 0,1 14,3H22V5H21V16H15.25L17,22H15L13.25,16H10.75L9,22H7L8.75,16H3V5H2V3M5,5V14H19V5H5Z"/>
                </svg>
              </a-button>
            </a-button-group>
          </div>

          <div class="absolute bottom-board right-3 top-3" style="z-index: 100;">

            <a-button class="mr-2"  :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
              چرخش
              <svg class="icon ml-3" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path class="icon-color" fill="currentColor" d="M10,12L14,16L10,20V16.9C5.44,16.44 2,14.42 2,12C2,9.58 5.44,7.56 10,7.1V9.09C6.55,9.43 4,10.6 4,12C4,13.4 6.55,14.57 10,14.91V12M20,12C20,10.6 17.45,9.43 14,9.09V7.1C18.56,7.56 22,9.58 22,12C22,14.16 19.26,16 15.42,16.7L16.12,16L14.92,14.79C17.89,14.36 20,13.27 20,12M11,2H13V13L11,11V2M11,22V21L13,19V22H11Z" />
              </svg>
            </a-button>

           <!-- <a-popover placement="bottom">
              <template #content >
                <div class="text-right">
                  <p class="font-bold mb-3 ">قرارگیری</p>
                  <a-button type="primary">Click me</a-button>
                  <p>Content</p>
                  <a-divider />
                  <p class="font-bold mb-3">ترازبندی</p>
                  <p>Content</p>
                  <p>Content</p>
                </div>
              </template>
            &lt;!&ndash;  <template #title>
               &lt;!&ndash; <span>Title</span>
                <a-divider />&ndash;&gt;
              </template>&ndash;&gt;
            </a-popover>-->

            <a-dropdown placement="bottomCenter">
              <a-button  class="mr-2"  :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                موقعیت
                <svg class="icon ml-3" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color" fill="currentColor" d="M12 16.54L19.37 10.8L21 12.07L12 19.07L3 12.07L4.62 10.81L12 16.54M12 14L3 7L12 0L21 7L12 14M12 2.53L6.26 7L12 11.47L17.74 7L12 2.53M12 21.47L19.37 15.73L21 17L12 24L3 17L4.62 15.74L12 21.47" />
                </svg>
              </a-button>

              <template #overlay>

                <a-menu>
                <!--  <span class="font-bold mr-3 ml-3 text-right">قرارگیری</span>-->
                  <a-menu-item key="0">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                     رویی
                     <!-- <home theme="filled"/>-->
                      <delete theme="outline" size="48" fill="#333" :strokeWidth="3" strokeLinejoin="bevel"/>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      زیرین
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      برو زیر
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      بیار رو
                    </a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="0">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                      تراز راست
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 13V19H2V13H18M8 5V11H18V5H8M20 2V22H22V2H20Z" />
                      </svg>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      تراز وسط
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 19H13V22H11V19H4V13H11V11H7V5H11V2H13V5H17V11H13V13H20V19Z" />
                      </svg>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      تراز چپ
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 13V19H6V13H22M6 5V11H16V5H6M2 2V22H4V2H2" />
                      </svg>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        تراز بالا
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path class="icon-color" fill="currentColor" d="M11 22H5V6H11V22M19 6H13V16H19V6M22 2H2V4H22V2Z" />
                      </svg>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      تراز میانی
                      <!--<svg class="icon" style="width:20px;height:20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 19H13V22H11V19H4V13H11V11H7V5H11V2H13V5H17V11H13V13H20V19Z" />
                      </svg>-->
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 20V13H2V11H5V4H11V11H13V7H19V11H22V13H19V17H13V13H11V20H5Z" />
                      </svg>
                    </a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                      تراز پایین
                      <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 18H5V2H11V18M19 8H13V18H19V8M22 20H2V22H22V20Z" />
                      </svg>
                    </a>
                  </a-menu-item>

                </a-menu>
              </template>
            </a-dropdown>
            <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
              <template #title>قفل  - جلوگیری از تغییر </template>
              <a-button class="mr-2"  :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
               <!-- <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color" fill="currentColor" d="M10 13C11.1 13 12 13.89 12 15C12 16.11 11.11 17 10 17S8 16.11 8 15 8.9 13 10 13M18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3S21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1M16 10V20H4V10H16Z" />
                </svg>-->
                <home theme="filled"/>
                <icon-park type="AddText" theme="filled"/>
                <!--<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color" fill="currentColor" d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                </svg>-->
              </a-button>
            </a-tooltip>

            <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
              <template #title>کپی</template>
              <a-button class="mr-2"  :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                <svg class="icon"  style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color" fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              </a-button>
            </a-tooltip>


            <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
              <template #title>حذف</template>
              <a-button class="mr-2" :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                <svg class="icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color" fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                </svg>
              </a-button>
            </a-tooltip>



           <!-- <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.zoom_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
                <template #title>بزرگ نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')" v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
              <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                <template #title>کوچک نمایی</template>
                <a-button :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')" v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
                  <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M15.5,14H14.71L14.43,13.73C15.41,12.59 16,11.11 16,9.5A6.5,6.5 0 0,0 9.5,3A6.5,6.5 0 0,0 3,9.5A6.5,6.5 0 0,0 9.5,16C11.11,16 12.59,15.41 13.73,14.43L14,14.71V15.5L19,20.5L20.5,19L15.5,14M9.5,14C7,14 5,12 5,9.5C5,7 7,5 9.5,5C12,5 14,7 14,9.5C14,12 12,14 9.5,14M7,9H12V10H7V9Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
            </a-button-group>
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.fullscreen_fit_button')">
              <a-tooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')" >
                &lt;!&ndash;<template #title v-if="isFullscreen"> حال عادی</template>&ndash;&gt;
                &lt;!&ndash;<template #title v-else>تمام صفحه</template>&ndash;&gt;
                <template #title>تمام صفحه</template>
                <a-button @click="toggle" :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')">
                  &lt;!&ndash; <svg style="width:20px;height:20px" viewBox="0 0 24 24"  >
                     <path class="icon-color" d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z" />
                   </svg>&ndash;&gt;
                  <svg v-if="isFullscreen" style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"/>
                  </svg>
                  <svg v-else style="width:20px;height:20px" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/>
                  </svg>
                </a-button>
              </a-tooltip>
              <a-button :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')" v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')">
                100%
              </a-button>
            </a-button-group>
            <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
              <a-button :disabled="!uiStore.isActive('ui.preview_button')"  >
                <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M2,3H10A2,2 0 0,1 12,1A2,2 0 0,1 14,3H22V5H21V16H15.25L17,22H15L13.25,16H10.75L9,22H7L8.75,16H3V5H2V3M5,5V14H19V5H5Z"/>
                </svg>
              </a-button>
            </a-button-group>-->

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
              <!--<p v-for="i in 500">{{ i }}</p>-->

              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>


              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>
              <p class="text-xs font-bold">قرارگیری</p>
              <div class="flex mt-6">
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V6H9V4H4V9H6V11H2V2M22,13V22H13V18H15V20H20V15H18V13H22M8,8H16V16H8V8Z"/>
                  </svg>
                  <span class="text-xs">رویی</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color"
                          d="M2,2H11V11H2V2M9,4H4V9H9V4M22,13V22H13V13H22M15,20H20V15H15V20M16,8V11H13V8H16M11,16H8V13H11V16Z"/>
                  </svg>
                  <span class="text-xs">زیرین</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H18V8H22M4,4V14H14V4H4Z"/>
                  </svg>
                  <span class="text-xs">برو زیر</span>
                </div>
                <div class="flex-1">
                  <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
                    <path class="icon-color" d="M2,2H16V16H2V2M22,8V22H8V18H10V20H20V10H18V8H22Z"/>
                  </svg>
                  <span class="text-xs">بیار رو</span>
                </div>
              </div>

              <a-divider/>

            </div>
            <div class="col-span-2 border-l	border-gray-300 overflow-auto max-h-screen" >
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


import {ref,inject,watch} from 'vue'
import {useFullscreen} from "@vueuse/core"
import UiElementStore from './core/ui'
let uiStore : UiElementStore  = inject('uiStore') as UiElementStore;
/*import ToolBar from "./components/ToolBar/ToolBar.vue";*/
//full screen page
const fullScreen = ref<HTMLElement | null>(null);
const {isFullscreen, enter, exit, toggle} = useFullscreen(fullScreen);
watch(isFullscreen,()=>{
 /* if(isFullscreen.value){
    uiStore.hide('ui.topbar');
  }
  else{
    uiStore.show('ui.topbar');
  }*/
});
</script>

<style lang="less">

.main-footer {
  background: #fff;
}

/*.toolbar-menu {

}*/

.main-board {
  background: #E5E5E5;
}

/*.tools {
  background: #fff;
}*/

.config-tool {
  /*background: #fff;*/
  /*height: 200px;*/
  /*overflow: hidden;
  position: relative;
  border: 1px solid #ebedf0;
  borderRadius: 2px;
  padding: 48px;
  textAlign: center;*/
  /* background: #fafafa;*/
  /*width: 100%;*/
}

</style>
