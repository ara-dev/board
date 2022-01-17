<template>
  <div class="h-full p-4">
    <div class="flex mb-3">
      <Icon :icon="pageInfo.icon" size="23" />
      <span class="mr-2 font-bold">{{ pageInfo.title }}</span>
    </div>
    <Tabs>
      <a-tab-pane key="4" tab="درآمد">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="3" force-render tab="ناموفق">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="2" tab="انجام شده">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane key="1" class="p-2" tab="همگی">
        <ListItem />
      </a-tab-pane>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { usePageInfo } from '@/views/Profile/hook/usePageInfo'
  const pageInfo = usePageInfo('transactions')
</script>

<style lang="less"></style>
