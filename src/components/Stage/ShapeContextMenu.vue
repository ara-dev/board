<template>
  <AMenu id="shape-context-menu" :selectable="false" class="shape-context-menu">
    <AMenuItem key="shape_copy" @click="stageStore.applyCopy()">
      <Icon icon="ion:copy-outline" size="23" />
      کپی
    </AMenuItem>
    <AMenuItem
      key="shape_paste"
      :disabled="!stageStore.enablePaste()"
      @click="stageStore.applyPaste()"
    >
      <Icon icon="ion:clipboard-outline" size="20" />
      جایگذاری
    </AMenuItem>
    <AMenuItem key="shape_duplicate" @click="stageStore.applyDuplicate()">
      <Icon icon="ion:duplicate-outline" size="23" />
      تکرار
    </AMenuItem>
    <a-menu-item key="shape_delete" @click="stageStore.applyDelete()">
      <Icon icon="ion:trash-outline" size="23" />
      حذف
    </a-menu-item>
    <a-menu-divider />
    <AMenuItem key="shape_lock_unlock" @click="stageStore.applyToggleLockUnlock()">
      <div v-if="stageStore.layerLock" class="inline">
        <Icon icon="ion:lock-closed-outline" size="23" />
      </div>
      <div v-else class="inline">
        <Icon icon="ion:lock-open-outline" size="23" />
      </div>
      {{ stageStore.layerLock ? 'بازگشایی قفل' : 'قفل کردن' }}
    </AMenuItem>
  </AMenu>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../core'
</script>

<style scoped></style>
