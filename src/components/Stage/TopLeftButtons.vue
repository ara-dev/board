<template>
  <div>
    <a-button-group class="mr-3" v-if="uiStore.isVisible('ui.redo_undo_button')">
      <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.undo')"
                v-if="uiStore.isVisible('ui.redo_undo_button.children.undo')">
        <icon-redo/>
      </a-button>

      <a-button :disabled="!uiStore.isActive('ui.redo_undo_button.children.redo')"
                v-if="uiStore.isVisible('ui.redo_undo_button.children.redo')">
        <icon-undo/>
      </a-button>
    </a-button-group>
  </div>
</template>

<script lang="ts" setup>
import {uiStore} from "../../core";


</script>

<style scoped>

</style>