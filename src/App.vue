<template>
  <div class="h-screen relative w-full">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transitionName || 'scale'">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less"></style>
