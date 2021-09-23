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
              <svg class="mr-1" style="width:22px;height:22px" viewBox="0 0 24 24">
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
        <!--p-2-->
        <div class="relative col-span-7 main-board overflow-auto h-screen">
          <div class="absolute left-3 top-3" style="z-index: 100">
            <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.redo_undo_button')">
              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z"/>
                </svg>
              </a-button>
              <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')" v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path class="icon-color"
                        d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z"/>
                </svg>
              </a-button>
            </a-button-group>
          </div>
          <div class="absolute bottom-board left-3" style="z-index: 100;bottom:80px">
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
          <!--mt-10 mb-28-->
          <div class="stages">
            <stage style="height:100vh"/>
            <!-- <stage style="height:100vh" />
             <stage style="height:100vh" />
             <stage style="height:100vh" />
             <stage style="height:100vh" />-->
            <!-- {{ a.a }}-->
            <!--<p v-if="a.b">{{ a.b }}</p>-->
          </div>
          <!-- <solid :value="colors" />-->
            <!--<div class=" auto-rows-min max-h-screen">
          </div>-->
          <!-- <div style="relative">
             <div class="absolute">
               <a-button-group class="mr-3">
                 <a-button>
                   <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                     <path class="icon-color" d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" />
                   </svg>
                 </a-button>
                 <a-button>
                   <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                     <path class="icon-color" d="M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z" />
                   </svg>
                 </a-button>
               </a-button-group>
             </div>
             <div class="pt-10">
               sdfsdfsdfs
               &lt;!&ndash;<button @click="toggle">
                 Go Fullscreen
               </button>&ndash;&gt;
             </div>

           </div>-->
        </div>
        <!-- END BOARD -->
        <!-- START TOOLBAR -->
        <div class="col-span-3 border-l border-gray-300 h-screen toolbar-menu">
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
            <!---->
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
import {ref, inject,watch} from 'vue'
import {useFullscreen} from "@vueuse/core"
import UiElementStore from './core/ui'
let uiStore : UiElementStore  = inject('uiStore') as UiElementStore;
import ToolBar from "./components/ToolBar/ToolBar.vue";
//full screen page
const fullScreen = ref<HTMLElement | null>(null);
const {isFullscreen, enter, exit, toggle} = useFullscreen(fullScreen);

watch(isFullscreen,()=>{
  if(isFullscreen.value){
    uiStore.hide('ui.topbar');
  }
  else{
    uiStore.show('ui.topbar');
  }
});

</script>

<style lang="less">

.main-footer {
  background: #fff;
}

.toolbar-menu {

}

.main-board {
  background: #E5E5E5;
}

.tools {
  background: #fff;
}

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
