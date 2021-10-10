<template>
  <div class="text-center">
    <a-button :type="buttonType('justify')" class="mr-3 py-0 px-1" @click="changeAlign('justify')">
      <icon-align-text-both :size="20"/>
    </a-button>
    <a-button :type="buttonType('right')" class="mr-3 py-0 px-1" @click="changeAlign('right')">
      <icon-align-text-right :size="20"/>
    </a-button>
    <a-button :type="buttonType('center')" class="mr-3 py-0 px-1" @click="changeAlign('center')">
      <icon-align-text-center :size="20"/>
    </a-button>
    <a-button :type="buttonType('left')" class="mr-3 py-0 px-1" @click="changeAlign('left')">
      <icon-align-text-left :size="20"/>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
/*import { inject} from "vue";
import StageOptionStore from "../../core/store/stage";*/
/*let stageStore: StageOptionStore = inject('stageStore') as StageOptionStore;*/
import {stageStore } from "../../core";

const buttonType = function (type: string): string {
  if (type == stageStore.textOption.align)
    return "primary"
  return "text"
}

const changeAlign = function (type: string): void {
  stageStore.textOption.align = type;
  stageStore.applyTextAlign();
}


/*const type=computed(() => {

  if()
})*/
</script>

<style>

</style>