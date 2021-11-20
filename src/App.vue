<template>
  <div class="h-screen relative w-full">
    <router-view id="main-container" v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName || 'scale'">
        <component :is="Component" />
      </transition>
    </router-view>
    <ASide />
  </div>
</template>

<script lang="ts" setup>
  import ASide from './components/ASide.vue'
</script>
<style lang="less">
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.5s cubic-bezier(0.7, 0, 0.15, 0.97);
  }

  .scale-enter-to {
    position: absolute;
    width: 100%;
    top: 0;
  }
  .scale-enter-from,
  .scale-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

  #main-container {
    padding-right: @cp-side-width;
  }
</style>
