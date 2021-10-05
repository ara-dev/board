<template>
  <a-menu id="shape-context-menu" class="shape-context-menu" :selectable="false">
    <a-menu-item key="shape_copy" @click="stageStore.applyCopy()" >
      (Ctrl+C) کپی
      <icon-copy/>
    </a-menu-item>
    <a-menu-item key="shape_paste" :disabled="!stageStore.enablePaste()" @click="stageStore.applyPaste()" >
      (Ctrl+V) جایگذاری
      <icon-file-editing />
    </a-menu-item>
    <a-menu-item key="shape_duplicate" @click="stageStore.applyDuplicate()">
         (Ctrl+D) تکرار
      <icon-copy/>
    </a-menu-item>
    <a-menu-item key="shape_delete" @click="stageStore.applyDelete()">
      (Delete) حذف
      <icon-delete/>
    </a-menu-item>
    <a-menu-divider />
    <a-menu-item key="shape_lock_unlock" @click="stageStore.applyToggleLockUnlock()">
      (Ctrl+L) {{ stageStore.layerLock ? 'بازگشایی قفل' : 'قفل کردن' }}
      <icon-lock v-if="stageStore.layerLock"/>
      <icon-unlock v-else />
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import {stageStore} from "../../core";

</script>

<style scoped>

</style>