<template>
  <a-menu id="background-context-menu" class="background-context-menu" :selectable="false">
<!--    <a-menu-item key="1">
      Undo
    </a-menu-item>
    <a-menu-item key="2">
      Redo
    </a-menu-item>-->
    <a-menu-divider />
    <a-menu-item key="background_paste" :disabled="!stageStore.enablePaste()" @click="stageStore.applyPaste()" >
      (Ctrl+V) جایگذاری
      <icon-file-editing />
    </a-menu-item>
    <a-menu-item key="background_selectall" @click="stageStore.applySelectAll()">
      انتخاب همه
      <icon-waterfalls-h />
    </a-menu-item>
<!--    <a-menu-item key="background_deselectall">
      DeselectAll
    </a-menu-item>-->
    <a-menu-item key="background_deleteall"  @click="stageStore.applyDeleteAll()">
      حذف همه
      <icon-delete-themes />
    </a-menu-item>
<!--    <a-menu-divider />-->
<!--    <a-menu-item key="background_zoomin">
      بزرگ نمایی
    </a-menu-item>
    <a-menu-item key="background_zoomout">
      کوچک نمایی
    </a-menu-item>-->
  </a-menu>
</template>

<script lang="ts" setup>
import {stageStore} from "../../core";
</script>

<style scoped>

</style>