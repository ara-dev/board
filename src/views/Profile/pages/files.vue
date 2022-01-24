<template>
  <div class="h-full p-4">
    <div class="h-full">
      <div class="flex mb-3">
        <Icon :icon="pageInfo?.icon" size="23" />
        <span class="ml-2 font-bold">{{ pageInfo?.title }}</span>
      </div>
      <Tabs>
        <TabPane key="4" tab="درآمد">Content of Tab Pane 1</TabPane>
        <TabPane key="3" force-render tab="ناموفق">Content of Tab Pane 2</TabPane>
        <TabPane key="2" tab="انجام شده">Content of Tab Pane 3</TabPane>
        <TabPane key="1" class="p-2" tab="همگی">
          <ListItem />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Tabs from '../../../components/Tabs/index.vue'
  import { usePageInfo } from '@b/views/Profile/hook/usePageInfo'
  import { TabPane } from 'ant-design-vue/es'
  import ListItem from '@b/components/Transaction/ListItem'
  import Icon from '@b/components/Icon/Icon.vue'

  const pageInfo = usePageInfo('files')
</script>

<style lang="less"></style>
