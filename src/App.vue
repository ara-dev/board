<template>
  <div class="flex h-screen relative w-full">
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" class="flex-1" />
      </transition>
    </router-view>
    <ASide/>
  </div>
</template>

<script lang="ts" setup>
import ASide from "./components/ASide.vue";

</script>

