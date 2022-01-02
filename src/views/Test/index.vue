<template>
  <!--  <div ref="mainboard" class="relative h-screen">
    <div id="container"></div>
  </div>-->
  <!--
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
-->
  <div dir="ltr">
    <Tab>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane key="2" force-render tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    </Tab>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import Tab from './tab.vue'

  //import 'ant-design-vue/lib/notification/style/css'

  // import { useElementSize } from '@vueuse/core'
  //const mainboard = ref(null)
  //const { width, height } = useElementSize(mainboard)
  const openNotification = () => {
    /*notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })*/
  }

  /* watch([width, height], () => {
    //stageStore.resizeStage(width.value, height.value)
  })
*/
  onMounted(() => {
    //stageStore.addPage('container', width.value, height.value)
    //stageStore.toJson('container')
  })
</script>

<style></style>
