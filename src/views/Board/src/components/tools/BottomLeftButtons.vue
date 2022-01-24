<template>
  <div class="flex items-center gap-2">
    <IconButton icon="ion:book-outline" />

    <IconButton
      icon="ion:play-outline"
      v-if="uiStore.isVisible('ui.preview_button')"
      @click="stageStore.applyTest()"
    />
    <Divider type="vertical" />

    <Tooltip v-if="uiStore.isVisible('ui.fullscreen_fit_button.children.fullscreen')">
      <template v-if="isFullscreen" #title> حال عادی</template>
      <template v-else #title>تمام صفحه</template>
      <IconButton
        :icon="getFullscreenIcon"
        :disabled="!uiStore.isActive('ui.fullscreen_fit_button.children.fullscreen')"
        @click="toggle"
      />
    </Tooltip>

    <Divider type="vertical" />
    <div v-if="uiStore.isVisible('ui.zoom_button')" class="flex gap-2">
      <Tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')">
        <template #title>بزرگ نمایی</template>
        <IconButton
          icon="fluent:zoom-in-20-regular"
          size="20"
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_in')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_in')"
          @click="stageStore.applyZoomIn()"
        />
      </Tooltip>
      <Tooltip v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')">
        <template #title>کوچک نمایی</template>
        <IconButton
          size="20"
          icon="fluent:zoom-out-20-regular"
          v-if="uiStore.isVisible('ui.zoom_button.children.zoom_out')"
          :disabled="!uiStore.isActive('ui.zoom_button.children.zoom_out')"
          @click="stageStore.applyZoomOut()"
        />
      </Tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore, stageStore } from '../../../../../core'
  import { useFullscreen } from '@vueuse/core'
  import IconButton from '../../../../../components/Button/IconButton.vue'
  import { computed } from 'vue'
  import { Divider, Tooltip } from 'ant-design-vue'

  const body = document.getElementsByTagName('body')
  const { isFullscreen, enter, exit, toggle } = useFullscreen(body[0])

  const getFullscreenIcon = computed(() => {
    if (isFullscreen.value) {
      return 'ion:contract-outline'
    } else {
      return 'ion:expand-outline'
    }
  })
</script>

<style></style>
