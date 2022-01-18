<template>
  <div>
    <a-button-group v-if="uiStore.isVisible('ui.redo_undo_button')" class="mr-3" dir="ltr">
      <AButton
        @click="handleRedo"
        v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')"
        :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')"
      >
        <Icon icon="ion:arrow-redo-outline" size="20" />
      </AButton>
      <AButton
        @click="handleUndo"
        v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')"
        :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')"
      >
        <Icon icon="ion:arrow-undo-outline" size="20" />
      </AButton>
    </a-button-group>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore } from '../../core'
  import Icon from '../Icon/Icon.vue'
  import useHistory from '../../utils/useHistory'

  const { handleRedo, handleUndo } = useHistory()
</script>

<style lang="less"></style>
