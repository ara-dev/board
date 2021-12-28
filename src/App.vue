<template>
  <!--  class="h-screen relative w-full"-->
  <div>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transitionName || 'scale'">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less"></style>
