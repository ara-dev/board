<template>
  <Menu id="background-context-menu" :selectable="false" class="background-context-menu">
    <MenuItem
      key="background_paste"
      :disabled="!stageStore.enablePaste()"
      @click="stageStore.applyPaste()"
    >
      <Icon icon="ion:clipboard-outline" size="20" />
      جایگذاری
    </MenuItem>
    <MenuItem key="background_selectall" @click="stageStore.applySelectAll()">
      <Icon icon="fluent:select-all-off-24-regular" size="20" />
      انتخاب همه
    </MenuItem>
    <MenuItem key="background_deleteall" @click="stageStore.applyDeleteAll()">
      <Icon icon="ion:trash-outline" size="20" />
      حذف همه
    </MenuItem>
  </Menu>
</template>

<script lang="ts" setup>
  import { stageStore } from '@b/core'
  import { MenuItem, Menu } from 'ant-design-vue/es'
  import Icon from '@b/components/Icon/Icon.vue'
</script>

<style scoped></style>
