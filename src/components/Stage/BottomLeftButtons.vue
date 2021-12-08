<template>
  <div>
    <a-button-group class="ml-3">
      <AButton type="primary">
        <Icon icon="ion:book-outline" size="23" />
      </AButton>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
      <AButton :disabled="!uiStore.isActive('ui.preview_button')" @click="stageStore.applyTest()">
        <Icon icon="fluent:play-20-regular" size="23" />
      </AButton>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.fullscreen_fit_button')" class="mr-3" dir="ltr">
      <ATooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')">
        <!--<template #title v-if="isFullscreen"> حال عادی</template>-->
        <!--<template #title v-else>تمام صفحه</template>-->
        <template #title>تمام صفحه</template>
        <AButton :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')">
          <Icon v-if="false" icon="akar-icons:normal-screen" />
          <Icon v-else icon="ion:expand-outline" size="23" />
        </AButton>
      </ATooltip>
      <AButton
        v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')"
        :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')"
      >
        100%
      </AButton>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.zoom_button')" class="mr-3" dir="ltr">
      <ATooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
        <template #title>بزرگ نمایی</template>
        <AButton
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')"
          @click="stageStore.applyZoom()"
        >
          <Icon icon="fluent:zoom-in-20-regular" size="23" />
        </AButton>
      </ATooltip>
      <ATooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
        <template #title>کوچک نمایی</template>
        <AButton
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')"
        >
          <Icon icon="fluent:zoom-out-20-regular" size="23" />
        </AButton>
      </ATooltip>
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
