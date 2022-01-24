<template>
  <div style="direction: ltr">
    <Tabs v-model:activeKey="active">
      <TabPane :key="4" tab="تصویر">
        <multi-upload />
      </TabPane>

      <TabPane :key="3" tab="بافت">Content of Tab Pane 3</TabPane>
      <TabPane :key="2" force-render tab="شیب رنگ">Content of Tab Pane 2</TabPane>
      <TabPane :key="1" tab="رنگ">Content of Tab Pane 1</TabPane>

      <template #renderTabBar="{ DefaultTabBar, ...props }">
        <component
          :is="DefaultTabBar"
          :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
          v-bind="props"
        />
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import MultiUpload from '../Upload/MultiUpload.vue'
  import { Tabs, TabPane } from 'ant-design-vue/es'
  const active = ref(1)
</script>

<style></style>
