<template>
  <div class="h-full">
    <div class="flex mb-3">
      <Icon :icon="pageInfo?.icon" size="23" />
      <span class="mr-2 font-bold">{{ pageInfo?.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { usePageInfo } from '../../../utils/usePageInfo'
  const pageInfo = usePageInfo('important-dates')
</script>

<style lang="less"></style>
