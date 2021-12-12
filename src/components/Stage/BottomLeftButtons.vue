<template>
  <div>
    <a-button-group class="ml-3">
      <AButton type="primary">
        <Icon icon="ion:book-outline" size="23" />
      </AButton>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.preview_button')">
      <AButton :disabled="!uiStore.isActive('ui.preview_button')" @click="stageStore.applyTest()">
        <Icon icon="ion:play-outline" size="23" />
      </AButton>
    </a-button-group>

    <a-button-group v-if="uiStore.isVisible('ui.fullscreen_fit_button')" class="mr-3" dir="ltr">
      <ATooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')">
        <template v-if="isFullscreen" #title> حال عادی</template>
        <template v-else #title>تمام صفحه</template>
        <AButton
          :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')"
          @click="toggle"
        >
          <div v-if="isFullscreen">
            <!--            <Icon icon="akar-icons:normal-screen" />-->
            <Icon icon="ion:contract-outline" size="23" />
          </div>
          <div v-else>
            <Icon icon="ion:expand-outline" size="23" />
          </div>
        </AButton>
      </ATooltip>
      <AButton
        v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fit')"
        :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fit')"
        @click="stageStore.applyFitScreen()"
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
          @click="stageStore.applyZoomIn()"
        >
          <Icon icon="fluent:zoom-in-20-regular" size="23" />
        </AButton>
      </ATooltip>
      <ATooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
        <template #title>کوچک نمایی</template>
        <AButton
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')"
          @click="stageStore.applyZoomOut()"
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
  import { useFullscreen } from '@vueuse/core'

  const body = document.getElementsByTagName('body')
  const { isFullscreen, enter, exit, toggle } = useFullscreen(body[0])
</script>

<style scoped></style>
