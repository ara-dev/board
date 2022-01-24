<template>
  <Tabs v-model:activeKey="activeKey">
    <slot></slot>
    <template #renderTabBar="{ DefaultTabBar, ...props }">
      <component
        :is="DefaultTabBar"
        :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
        v-bind="props"
      />
    </template>
  </Tabs>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Tabs } from 'ant-design-vue/es'
  const activeKey = ref('1')
</script>

<style lang="less"></style>
