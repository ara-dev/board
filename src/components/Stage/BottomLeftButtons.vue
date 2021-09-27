<template>
  <div>
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
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";
import UiElementStore from "../../core/store/ui";
import {useFullscreen} from "@vueuse/core";

let uiStore = inject<UiElementStore>('uiStore');

const body = ref<HTMLElement | null>(null);
const {isFullscreen, enter, exit, toggle} = useFullscreen(body);
</script>

<style scoped>

</style>