<template>
  <div>
    <a-button-group class="ml-3">
      <a-button type="primary">
        <Icon icon="ion:book-outline" size="23" />
      </a-button>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
      <a-button :disabled="!uiStore.isActive('ui.preview_button')" @click="stageStore.applyTest()">
        <Icon icon="fluent:play-20-regular" size="23" />
      </a-button>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.fullscreen_fit_button')" class="mr-3" dir="ltr">
      <a-tooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')">
        <!--<template #title v-if="isFullscreen"> حال عادی</template>-->
        <!--<template #title v-else>تمام صفحه</template>-->
        <template #title>تمام صفحه</template>
        <a-button :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')">
          <Icon v-if="false" icon="akar-icons:normal-screen" />
          <Icon v-else icon="ion:expand-outline" size="23" />
        </a-button>
      </a-tooltip>
      <a-button
        v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')"
        :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')"
      >
        100%
      </a-button>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.zoom_button')" class="mr-3" dir="ltr">
      <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
        <template #title>بزرگ نمایی</template>
        <a-button
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')"
        >
          <Icon icon="fluent:zoom-in-20-regular" size="23" />
        </a-button>
      </a-tooltip>
      <a-tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
        <template #title>کوچک نمایی</template>
        <a-button
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')"
        >
          <Icon icon="fluent:zoom-out-20-regular" size="23" />
        </a-button>
      </a-tooltip>
    </a-button-group>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore, stageStore } from '../../core'
  import Icon from '../Icon/Icon.vue'

  /*const body = ref<HTMLElement | null>(null);
const {isFullscreen, enter, exit, toggle} = useFullscreen(body);*/
</script>

<style scoped></style>
