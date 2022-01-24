<template>
  <div class="text-center flex items-center">
    <!--<a-button :type="buttonType('justify')" class="ml-3 py-0 px-1" @click="changeAlign('justify')">
      <icon-align-text-both :size="20"/>
    </a-button>-->
    <Button :type="buttonType('left')" class="ml-3 py-0 px-1" @click="changeAlign('left')">
      <Icon icon="akar-icons:text-align-left" size="20" />
    </Button>
    <Button :type="buttonType('center')" class="ml-3 py-0 px-1" @click="changeAlign('center')">
      <Icon icon="akar-icons:text-align-center" size="20" />
    </Button>
    <Button :type="buttonType('right')" class="ml-3 py-0 px-1" @click="changeAlign('right')">
      <Icon icon="akar-icons:text-align-right" size="20" />
    </Button>
  </div>
</template>

<script lang="ts" setup>
  import { stageStore } from '../../core'
  import Icon from '../Icon/Icon.vue'
  import { Button } from 'ant-design-vue'

  const buttonType = function (type: string): string {
    if (type == stageStore.textOption.align) return 'primary'
    return 'text'
  }

  const changeAlign = function (type: string): void {
    stageStore.textOption.align = type
    stageStore.applyTextAlign()
  }
</script>

<style></style>
