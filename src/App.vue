<template>
  <div class="h-screen relative w-full">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transitionName || 'scale'">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
  import { userStore } from './model/user'
  import { onMounted } from 'vue'

  onMounted(() => {
    userStore.getUserInfo()
  })
</script>
<style lang="less"></style>
