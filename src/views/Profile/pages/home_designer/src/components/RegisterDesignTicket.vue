<template>
  <div style="direction: ltr">
    <Tabs v-model:activeKey="activeKey" :tabBarGutter="1">
      <TabPane key="2" tab="تیکت ها">
        <div style="direction: rtl">
          <Ticket />
        </div>
      </TabPane>
      <TabPane key="1" force-render tab="رویداد های طرح">
        <Events />
      </TabPane>
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
  import Ticket from '../../../../../../components/Ticket/Ticket.vue'
  import Events from './Events.vue'
  import { TabPane, Tabs } from 'ant-design-vue/es'

  const activeKey = ref('1')
</script>

<style lang="less"></style>
