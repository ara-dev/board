<template>
  <div style="direction: ltr">
    <!--    <ATabs v-model:activeKey="activeKey" :class="[`${prefixCls}`]" :tabBarGutter="1">
      <a-tab-pane key="2" tab="نیاز به اصلاح">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="1" force-render tab="در انتظار تایید کار">Content of Tab Pane 2</a-tab-pane>
      <template #renderTabBar="{ DefaultTabBar, ...props }">
        <component
          :is="DefaultTabBar"
          :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
          v-bind="props"
        />
      </template>
    </ATabs>-->
    <ATabs v-model:activeKey="activeKey" :tabBarGutter="1">
      <a-tab-pane key="2" tab="تیکت ها">
        <div style="direction: rtl">
          <Ticket />
        </div>
      </a-tab-pane>
      <a-tab-pane key="1" force-render tab="رویداد های طرح">
        <Events />
      </a-tab-pane>
      <template #renderTabBar="{ DefaultTabBar, ...props }">
        <component
          :is="DefaultTabBar"
          :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
          v-bind="props"
        />
      </template>
    </ATabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import Ticket from '../Ticket/Ticket.vue'
  import Events from './Events.vue'
  const activeKey = ref('1')
</script>

<style lang="less"></style>
