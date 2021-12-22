<template>
  <div :class="{ 'hide-menu': !visible }" class="flex flex-col">
    <ToolBarItem
      v-for="(item, index) in getVisibleTools"
      :key="index"
      :class="[`${prefixCls}-child-${index}`, `${prefixCls}-menu-btn`]"
      :selected="uiStore.isActive(item.id)"
      :title="item.title"
      @click="changeMenu(item.id)"
    >
      <Icon :icon="item.icon" size="20" />
    </ToolBarItem>
  </div>
</template>

<script lang="ts" setup>
  import { uiStore } from '../../core'
  import ToolBarItem from './ToolBarItem.vue'
  import Tools from './toolbar.ts'
  import Icon from '../Icon/Icon.vue'
  import { computed } from 'vue'
  import { useDesign } from '../../utils/useDesign'
  import { Toolbar } from './toolbar.ts'

  const changeMenu = (activeMenuId: string): void => {
    const prefix = 'ui.right_sidebar.children.'
    uiStore.deActive(`${prefix}image`)
    uiStore.deActive(`${prefix}text`)
    uiStore.deActive(`${prefix}shape`)
    uiStore.deActive(`${prefix}template`)
    uiStore.deActive(`${prefix}background`)
    uiStore.deActive(`${prefix}resize`)
    uiStore.deActive(`${prefix}upload`)
    uiStore.active(activeMenuId)
  }

  const { prefixCls } = useDesign('toolbar')

  withDefaults(
    defineProps<{
      visible?: boolean
    }>(),
    { visible: false },
  )

  const getVisibleTools = computed(() => {
    return Tools.filter((item: Toolbar) => uiStore.isVisible(item.id))
  })
</script>

<style lang="less">
  @pre: ~'@{prefix}-toolbar';

  .@{pre}-menu-btn {
    transition: all 0.2s ease;
    position: relative;
    right: 0;
  }

  @children:0, 1, 2, 3, 4, 5, 6, 7, 8, 9;

  each(@children, {
    .@{pre}-child-@{value}{
      transition-delay: 50ms * @value;
    }
  });

  .hide-menu .@{pre}-menu-btn {
    right: -5vw;
  }
</style>
