<template>
  <div class="h-full">
    <ACard>
      <div style="direction: ltr">
        <a-tabs v-model:activeKey="activeKey" :class="[`${prefixCls}`]">
          <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
          <a-tab-pane key="2" force-render tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>

          <template #renderTabBar="{ DefaultTabBar, ...props }">
            <component
              :is="DefaultTabBar"
              :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
              v-bind="props"
            />
          </template>

          <template #tabBarExtraContent>
            <a-button>Extra Action</a-button>
          </template>
        </a-tabs>
      </div>
    </ACard>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useDesign } from '../../../utils/useDesign'
  const { prefixCls } = useDesign('tabs')
  const { prefixVar } = useDesign('')
  const activeKey = ref('1')
</script>

<style lang="less">
  @pre: ~'@{namespace}-tabs';



  .@{pre}{
    //background: red;
     .ant-tabs-extra-content{
      float: left !important;
    }
  }
</style>
