<template>
  <div class="h-full">
    <div class="flex mb-3">
      <Icon :icon="info.icon" size="23" />
      <span class="mr-2 font-bold">{{ info.title }}</span>
    </div>
    <!--    <Tabs />-->
  </div>
</template>

<script lang="ts" setup>
  import { computed, ComputedRef } from 'vue'
  import menus, { ProfileMenus } from '../../../components/Profile/profiles-menus'
  const info: ComputedRef<ProfileMenus | undefined> = computed(() => {
    return menus.find((item: ProfileMenus) => item.id == 'important-dates')
  })
</script>

<style lang="less"></style>
