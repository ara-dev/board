<template>
  <div class="h-screen" style="background:#fff">
    <!-- START TOPBAR -->
    <div class="w-full p-3 topbar" v-if="uiStore.isVisible('ui.topbar')">
      <a-button>ذخیره و ادامه</a-button>
    </div>
    <!-- END TOPBAR -->
    <!-- START MAIN -->
    <div class="main">
      <div class="grid grid-cols-12">
        <!-- START CONFIG TOOLBAR -->
        <div class="col-span-2 border-r border-gray-300 px-2 pt-2 pb-5 max-h-screen overflow-auto" dir="rtl">

          <transition :css="false">
            <text-options v-if="uiStore.isVisible('ui.text_option')"
                          v-motion="'cube'"
                          :initial="{x: -400,opacity: 0}" :enter="{x: 0,opacity: 1}"
                          :leave="{x: 400,opacity: 0}" />
          </transition>

        </div>
        <!-- END CONFIG TOOLBAR -->

        <!-- START MAIN BOARD -->
        <div class="relative col-span-8 main-board overflow-auto h-screen">

          <div class="absolute left-3 top-3" style="z-index: 100">
            <top-left-buttons/>
          </div>

          <div class="absolute bottom-board right-3 top-3" style="z-index: 100;"
               v-if="uiStore.isVisible('ui.stage_top_right_menu')">
            <top-right-buttons/>
          </div>


          <div class="absolute bottom-board left-3 bottom-3" style="z-index: 100;">
            <bottom-left-buttons/>
          </div>

          <div class="stages">
            <stage style="height:100vh" v-for="(item,index) in stageStore.pages" :key="`stage_${index}`"/>
            <div id="test"></div>
          </div>
        </div>
        <!-- END BOARD -->

        <!-- START TOOLBAR -->
        <div class="col-span-2 border-l border-gray-300 h-screen">
          <div class="grid grid-cols-12 h-screen">
            <div class="col-span-10 px-3 pt-2 pb-10 overflow-auto max-h-screen" dir="rtl">


              <transition :css="false">
                <shape-style v-if="uiStore.isActive('ui.right_sidebar.children.shape')"
                             v-motion="'cube'"
                             :initial="{x: 400,opacity: 0}" :enter="{x: 0,opacity: 1}"
                             :leave="{x: -400,opacity: 0}"/>
              </transition>

              <transition :css="false">
                <text-style v-if="uiStore.isActive('ui.right_sidebar.children.text')"
                            v-motion="'cube'"
                            :initial="{x: 400,opacity: 0}" :enter="{x: 0,opacity: 1}"
                            :leave="{x: -400,opacity: 0}" />
              </transition>

              <transition :css="false">
                <background-style v-if="uiStore.isActive('ui.right_sidebar.children.background')"
                                  v-motion="'cube'"
                                  :initial="{x: 400,opacity: 0}" :enter="{x: 0,opacity: 1}"
                                  :leave="{x: -400,opacity: 0}" />
              </transition>





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

import {onMounted} from 'vue'
import {DEFAULT_ICON_CONFIGS, IconProvider} from '@icon-park/vue-next'
import TopRightButtons from "./components/Stage/TopRightButtons.vue";
import TopLeftButtons from "./components/Stage/TopLeftButtons.vue";
import BottomLeftButtons from "./components/Stage/BottomLeftButtons.vue";
import TextOptions from "./components/Option/TextOptions.vue";
import TextStyle from "./components/Style/TextStyle.vue";
import BackgroundStyle from "./components/Style/BackgroundStyle.vue";
import ShapeStyle from "./components/Style/ShapeStyle.vue";
IconProvider({...DEFAULT_ICON_CONFIGS, "size": 24, "theme": "outline", "strokeWidth": 2, "strokeLinejoin": "bevel"});
import {uiStore , stageStore} from "./core";

//const toolbarAnimation =
onMounted(() => {
  stageStore.AddPage();
});


</script>

<style lang="less">

.main-footer {
  background: #fff;
}

.main-board {
  background: #E5E5E5;
}


</style>
