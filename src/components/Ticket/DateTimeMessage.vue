<template>
  <div :class="['text-center text-xs mb-5', `${prefixVar}-text-color-primary`]">سه ساعت پیش</div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixVar } = useDesign('')
</script>

<style lang="less"></style>
