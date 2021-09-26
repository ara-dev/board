<template>
  <div class="py-3 px-1 cursor-pointer select-none text-center" :class="{'toolbar-item-selected' : selected}" >
    <slot></slot>
    <p class="text-xs text-center	mt-1.5">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "ToolBarItem",
  props: {
    selected: {
      default: false,
      type: Boolean
    },
    title:{
      default:'',
      type:String
    }
  },
}
</script>

<style scoped lang="less">
.toolbar-item-selected{
  background: rgba(99,102,241,0.3);
  border-left: 2px solid #6366F1;
  margin-left: -1px;
  svg path{
    fill: #6366F1;
  }

  p {
    color:#6366F1;
  }

}
</style>
