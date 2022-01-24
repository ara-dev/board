<template>
  <div class="h-full p-4">
    <div class="flex mb-3">
      <Icon :icon="pageInfo?.icon" size="23" />
      <span class="ml-2 font-bold">{{ pageInfo?.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { usePageInfo } from '@b/views/Profile/hook/usePageInfo'

  const pageInfo = usePageInfo('addresses')
</script>

<style lang="less"></style>
