<template>
  <a-tabs v-model:activeKey="activeKey">
    <slot></slot>
    <template #renderTabBar="{ DefaultTabBar, ...props }">
      <component
        :is="DefaultTabBar"
        :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
        v-bind="props"
      />
    </template>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const activeKey = ref('1')
</script>

<style lang="less"></style>
