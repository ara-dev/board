<template>
  <div class="h-screen" style="background:#fff" >
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

         <text-options />

        </div>
        <!-- END CONFIG TOOLBAR -->

        <!-- START MAIN BOARD -->
        <div class="relative col-span-7 main-board overflow-auto h-screen">

          <div class="absolute left-3 top-3" style="z-index: 100">
            <top-left-buttons />
          </div>

          <div class="absolute bottom-board right-3 top-3" style="z-index: 100;"
               v-if="uiStore.isVisible('ui.stage_top_right_menu')">
            <top-right-buttons/>
          </div>


          <div class="absolute bottom-board left-3 bottom-3" style="z-index: 100;">
            <bottom-left-buttons/>
          </div>


          <div class="stages">
            <stage style="height:100vh"/>
          </div>
        </div>
        <!-- END BOARD -->

        <!-- START TOOLBAR -->
        <div class="col-span-3 border-l border-gray-300 h-screen">
          <div class="grid grid-cols-12 h-screen">
            <div class="col-span-10 px-3 pt-2 pb-10 overflow-auto max-h-screen" dir="rtl">

              <shape-style v-if="uiStore.isActive('ui.right_sidebar.children.shape')" />

              <text-style v-if="uiStore.isActive('ui.right_sidebar.children.text')" />

              <background-style v-if="uiStore.isActive('ui.right_sidebar.children.background')" />


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
import {inject} from 'vue'
import UiElementStore from './core/store/ui'
import {DEFAULT_ICON_CONFIGS, IconProvider} from '@icon-park/vue-next'
import StageOptionStore from "./core/store/stage";
import TopRightButtons from "./components/Stage/TopRightButtons.vue";
import TopLeftButtons from "./components/Stage/TopLeftButtons.vue";
import BottomLeftButtons from "./components/Stage/BottomLeftButtons.vue";
import TextOptions from "./components/Option/TextOptions.vue";
import TextStyle from "./components/Style/TextStyle.vue";
import ShapeStyle from "./components/Style/ShapeStyle.vue";
import BackgroundStyle from "./components/Style/BackgroundStyle.vue";
IconProvider({...DEFAULT_ICON_CONFIGS, "size": 24, "theme": "outline", "strokeWidth": 2, "strokeLinejoin": "bevel"});
let uiStore : UiElementStore = inject('uiStore') as UiElementStore;
let stageStore: StageOptionStore = inject('stageStore') as StageOptionStore;

</script>

<style lang="less">

.main-footer {
  background: #fff;
}

.main-board {
  background: #E5E5E5;
}


</style>
