<template>
  <div v-if="uiStore.isVisible('ui.redo_undo_button')">
    <IconButton
      class="undo-button"
      icon="tabler:arrow-forward"
      @click="handleUndo"
      v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')"
      :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')"
  /></div>
</template>

<script lang="ts" setup>
  import { uiStore } from '../../core'
  import useHistory from '../../utils/useHistory'
  import IconButton from '../Button/IconButton.vue'

  const { handleRedo, handleUndo } = useHistory()
</script>

<style lang="less">
  .undo-button {
    transform: rotate(180deg);
  }
</style>
