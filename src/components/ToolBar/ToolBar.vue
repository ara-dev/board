<template>
  <div class="flex flex-col">
    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.image')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.image')" title="تصاویر"
                   @click="changeMenu('ui.right_sidebar.children.image')" >
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color" d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" />
      </svg>
     <!-- <svg height="24" viewBox="0 0 24 24" width="24" class="mx-auto my-0">
        <path d="M5,3H18A3,3 0 0,1 21,6V19A3,3 0 0,1 18,22H5A3,3 0 0,1 2,19V6A3,3 0 0,1 5,3M5,4A2,2 0 0,0 3,6V17.59L7.29,13.29L9.79,15.79L14.79,10.79L20,16V6A2,2 0 0,0 18,4H5M9.79,17.21L7.29,14.71L3,19A2,2 0 0,0 5,21H18A2,2 0 0,0 20,19V17.41L14.79,12.21L9.79,17.21M7.5,6A2.5,2.5 0 0,1 10,8.5A2.5,2.5 0 0,1 7.5,11A2.5,2.5 0 0,1 5,8.5A2.5,2.5 0 0,1 7.5,6M7.5,7A1.5,1.5 0 0,0 6,8.5A1.5,1.5 0 0,0 7.5,10A1.5,1.5 0 0,0 9,8.5A1.5,1.5 0 0,0 7.5,7Z"/>
      </svg>-->
    </tool-bar-item>
    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.text')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.text')" title="متن"
                   @click="changeMenu('ui.right_sidebar.children.text')" >
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <!--<path class="icon-color" d="M21,7V3H17V4H7V3H3V7H4V17H3V21H7V20H17V21H21V17H20V7H21M18,4H20V6H18V4M4,4H6V6H4V4M6,20H4V18H6V20M20,20H18V18H20V20M18,17H17V18H7V17H6V7H7V6H17V7H18V17M16,8V10H13V16H11V10H8V8H16Z" />-->
        <path class="icon-color" d="M2 4C2 2.9 2.9 2 4 2H8V4H4V8H2V4M22 20C22 21.11 21.11 22 20 22H16V20H20V16H22V20M4 22C2.9 22 2 21.11 2 20V16H4V20H8V22H4M20 2C21.11 2 22 2.9 22 4V8H20V4H16V2H20M9 7V9H11V17H13V9H15V7H9Z" />
      </svg>
    </tool-bar-item>
    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.shape')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.shape')" title="استیکر"
                   @click="changeMenu('ui.right_sidebar.children.shape')" >
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color" d="M2,2H11V11H2V2M17.5,2C20,2 22,4 22,6.5C22,9 20,11 17.5,11C15,11 13,9 13,6.5C13,4 15,2 17.5,2M6.5,14L11,22H2L6.5,14M19,17H22V19H19V22H17V19H14V17H17V14H19V17Z" />
      </svg>
    </tool-bar-item>

    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.template')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.template')"
                   title="چارچوب ها"
                   @click="changeMenu('ui.right_sidebar.children.template')" >
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color" d="M3 21H11V13H3M5 15H9V19H5M3 11H11V3H3M5 5H9V9H5M13 3V11H21V3M19 9H15V5H19M18 16H21V18H18V21H16V18H13V16H16V13H18Z" />
      </svg>
    </tool-bar-item>
    <tool-bar-item v-if="uiStore.isVisible('ui.right_sidebar.children.background')"
                   :selected="uiStore.isActive('ui.right_sidebar.children.background')" title="پس زمینه"
                   @click="changeMenu('ui.right_sidebar.children.background')" >
      <svg viewBox="0 0 24 24" width="24" height="24" class="mx-auto my-0">
        <path class="icon-color" d="M19,11.5C19,11.5 17,13.67 17,15A2,2 0 0,0 19,17A2,2 0 0,0 21,15C21,13.67 19,11.5 19,11.5M5.21,10L10,5.21L14.79,10M16.56,8.94L7.62,0L6.21,1.41L8.59,3.79L3.44,8.94C2.85,9.5 2.85,10.47 3.44,11.06L8.94,16.56C9.23,16.85 9.62,17 10,17C10.38,17 10.77,16.85 11.06,16.56L16.56,11.06C17.15,10.47 17.15,9.5 16.56,8.94Z" />
      </svg>
    </tool-bar-item>
  </div>
</template>

<script lang="ts" setup>
import {inject} from 'vue'
/*import icon from '../../icon/icon'*/
import UiElementStore from "../../core/ui";
let uiStore : UiElementStore  = inject('uiStore') as UiElementStore;

const changeMenu= (activeMenuId : string) : void =>
{
  const prefix = 'ui.right_sidebar.children.';
  uiStore.deactive(`${prefix}image`) ;
  uiStore.deactive(`${prefix}text`) ;
  uiStore.deactive(`${prefix}shape`) ;
  uiStore.deactive(`${prefix}template`) ;
  uiStore.deactive(`${prefix}background`);
  uiStore.active(activeMenuId);
}

</script>

<style scoped>

</style>
