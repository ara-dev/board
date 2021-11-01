<template>
  <div class="h-screen" style="background:#fff">
    <shape-context-menu />
    <background-context-menu />
    <!-- start toolbar -->
    <div class="w-full p-3 topbar" v-if="uiStore.isVisible('ui.topbar')">
      <a-button>ذخیره و ادامه</a-button>
    </div>
    <!-- end top-bar -->
    <!-- start main -->
    <div class="main flex h-screen">

      <div class="h-screen border-r border-gray-300 px-2 pt-2 pb-5 max-h-screen overflow-auto g " dir="rtl" style="width:18%">
        <transition :css="false">
          <text-options v-if="uiStore.isVisible('ui.text_option')"
                        v-motion="'cube'"
                        :initial="{x: -400,opacity: 0}" :enter="{x: 0,opacity: 1}"
                        :leave="{x: 400,opacity: 0}" />
        </transition>

      </div>
<!--   overflow-auto   -->
      <div class="h-screen relative main-board  h-screen" style="width: 59%">

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

          <div class="stages overflow-auto" >
            <stage />
          </div>
      </div>
      <div class="h-screen px-3 pt-2 pb-10 overflow-auto max-h-screen" style="width: 18%">
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
      <div class="border-l	border-gray-300 overflow-auto max-h-screen h-screen" style="width: 5%">
        <tool-bar/>
      </div>
    </div>
    <!-- end main -->
  </div>
</template>


<script lang="ts" setup>
import {onMounted, ref,watch} from 'vue'
import {DEFAULT_ICON_CONFIGS, IconProvider} from '@icon-park/vue-next'
import TopRightButtons from "../components/Stage/TopRightButtons.vue";
import TopLeftButtons from "../components/Stage/TopLeftButtons.vue";
import BottomLeftButtons from "../components/Stage/BottomLeftButtons.vue";
import TextOptions from "../components/Option/TextOptions.vue";
import TextStyle from "../components/Style/TextStyle.vue";
import BackgroundStyle from "../components/Style/BackgroundStyle.vue";
import ShapeStyle from "../components/Style/ShapeStyle.vue";
IconProvider({...DEFAULT_ICON_CONFIGS, "size": 24, "theme": "outline", "strokeWidth": 2, "strokeLinejoin": "bevel"});
import {uiStore , stageStore} from "../core";
import ToolBar from "../components/ToolBar/ToolBar.vue";
import ShapeContextMenu from "../components/Stage/ShapeContextMenu.vue";
import BackgroundContextMenu from "../components/Stage/BackgroundContextMenu.vue";
import Stage from "../components/Stage/Stage.vue";
import Sketch from "../components/ColorPicker/Solid/Sketch.vue";
import Swatches from "../components/ColorPicker/Solid/Swatches.vue";
import Twitter from "../components/ColorPicker/Solid/Twitter.vue";

onMounted(() => {
  //stageStore.AddPage();
});

/*
window.onbeforeunload = confirmExit;
function confirmExit() {
  return "You have attempted to leave this page. Are you sure?";
}
*/
/*var message = "You have not filled out the form.";
window.onbeforeunload = function(event) {
  var e = e || window.event;
  if (e) {
    e.returnValue = message;
  }
  return message;
};*/
/*function closedWin() {
  confirm("close ?");
  return false; /!* which will not allow to close the window *!/
}
if(window.addEventListener) {
  window.addEventListener("close", closedWin, false);
}

window.onclose = closedWin;*/

/*window.onbeforeunload = function() {
  if (data_needs_saving()) {
    return "Do you really want to leave our brilliant application?";
  } else {
    return;
  }
};*/

/*window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
});*/

/*
window.addEventListener('beforeunload', function (e) {
  // the absence of a returnValue property on the event will guarantee the browser unload happens
  delete e['returnValue'];
});
*/

</script>

<style lang="less">
@import '../assets/css/var.less';
.main-footer {
  background: #fff;
}

.main-board {
  background: #E5E5E5;
}

</style>
