<template>
  <Menu id="shape-context-menu" :selectable="false" class="shape-context-menu">
    <MenuItem key="shape_copy" @click="stageStore.applyCopy()">
      <Icon icon="ion:copy-outline" size="23" />
      کپی
    </MenuItem>
    <MenuItem
      key="shape_paste"
      :disabled="!stageStore.enablePaste()"
      @click="stageStore.applyPaste()"
    >
      <Icon icon="ion:clipboard-outline" size="20" />
      جایگذاری
    </MenuItem>
    <MenuItem key="shape_duplicate" @click="stageStore.applyDuplicate()">
      <Icon icon="ion:duplicate-outline" size="23" />
      تکرار
    </MenuItem>
    <MenuItem key="shape_delete" @click="stageStore.applyDelete()">
      <Icon icon="ion:trash-outline" size="23" />
      حذف
    </MenuItem>
    <MenuDivider />
    <MenuItem key="shape_lock_unlock" @click="stageStore.applyToggleLockUnlock()">
      <div v-if="stageStore.layerLock" class="inline">
        <Icon icon="ion:lock-closed-outline" size="23" />
      </div>
      <div v-else class="inline">
        <Icon icon="ion:lock-open-outline" size="23" />
      </div>
      {{ stageStore.layerLock ? 'بازگشایی قفل' : 'قفل کردن' }}
    </MenuItem>
  </Menu>
</template>

<script lang="ts" setup>
  import { stageStore } from '@b/core'
  import Icon from '@b/components/Icon/Icon.vue'
  import { MenuItem, MenuDivider, Menu } from 'ant-design-vue/es'
</script>

<style scoped></style>
