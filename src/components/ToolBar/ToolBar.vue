<template>
  <div class="flex flex-col">
    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.image')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.image')" title="تصاویر"
                   @click="changeMenu('ui.right_sidebar.children.image')" >
      <icon-pic class="toolbar-icon" />
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.text')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.text')" title="متن"
                   @click="changeMenu('ui.right_sidebar.children.text')" >
      <icon-text-recognition class="toolbar-icon" />
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.shape')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.shape')" title="استیکر"
                   @click="changeMenu('ui.right_sidebar.children.shape')" >
      <icon-stickers class="toolbar-icon" />
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.template')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.template')"
                   title="چارچوب ها"
                   @click="changeMenu('ui.right_sidebar.children.template')" >
      <icon-page-template class="toolbar-icon" />
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.background')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.background')" title="پس زمینه"
                   @click="changeMenu('ui.right_sidebar.children.background')" >
      <icon-background-color  class="toolbar-icon"/>
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.resize')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.resize')" title="تغییر سایز"
                   @click="changeMenu('ui.right_sidebar.children.resize')" >
      <icon-scale class="toolbar-icon"/>
    </tool-bar-item>



  </div>
</template>

<script lang="ts" setup>
import { uiStore} from "../../core";

const changeMenu= (activeMenuId : string) : void =>
{
  const prefix = 'ui.right_sidebar.children.';
  uiStore.deActive(`${prefix}image`) ;
  uiStore.deActive(`${prefix}text`) ;
  uiStore.deActive(`${prefix}shape`) ;
  uiStore.deActive(`${prefix}template`) ;
  uiStore.deActive(`${prefix}background`);
  uiStore.deActive(`${prefix}resize`);
  uiStore.active(activeMenuId);
}

</script>

<style>

</style>
