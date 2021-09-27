<template>
  <div style="direction: ltr">
    <a-tabs v-model:activeKey="active" >
      <a-tab-pane :key="4" tab="تصویر">

        <multi-upload />

      </a-tab-pane>


      <a-tab-pane :key="3" tab="بافت">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane :key="2" tab="شیب رنگ" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane :key="1" tab="رنگ">Content of Tab Pane 1</a-tab-pane>


      <template #renderTabBar="{ DefaultTabBar, ...props }">
        <component
            :is="DefaultTabBar"
            v-bind="props"
            :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
        />
      </template>

    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import MultiUpload from "../Upload/MultiUpload.vue";
const active=ref(1);
</script>

<style>

</style>