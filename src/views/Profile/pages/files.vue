<template>
  <div class="h-full">
    <div class="h-full">
      <div class="flex mb-3">
        <Icon :icon="pageInfo.icon" size="23" />
        <span class="mr-2 font-bold">{{ pageInfo.title }}</span>
      </div>
      <Tabs />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { usePageInfo } from '../../../utils/usePageInfo'
  const pageInfo = usePageInfo('files')
</script>

<style lang="less"></style>
