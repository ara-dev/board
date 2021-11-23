<template>
  <AMenu id="background-context-menu" :selectable="false" class="background-context-menu">
    <AMenuItem
      key="background_paste"
      :disabled="!stageStore.enablePaste()"
      @click="stageStore.applyPaste()"
    >
      <Icon icon="ion:clipboard-outline" size="20" />
      جایگذاری
    </AMenuItem>
    <AMenuItem key="background_selectall" @click="stageStore.applySelectAll()">
      <Icon icon="fluent:select-all-off-24-regular" size="20" />
      انتخاب همه
    </AMenuItem>
    <AMenuItem key="background_deleteall" @click="stageStore.applyDeleteAll()">
      <Icon icon="ion:trash-outline" size="20" />
      حذف همه
    </AMenuItem>
  </AMenu>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../core'
  import Icon from '../Icon/Icon.vue'
</script>

<style scoped></style>
