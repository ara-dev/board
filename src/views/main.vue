<template>
  <div class="h-screen relative w-full">
    <ASide />
    <RouterView id="main-container" v-slot="{ Component, route }">
      <Transition :name="route.meta.transitionName || 'scale'">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
  import ASide from '../components/ASide.vue'
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
    padding-left: @cp-side-width;
  }
</style>
