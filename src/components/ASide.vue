<template>
  <div class="profile-right-toolbar text-center" :class="{ 'active-profile': isProfile }">
    <div id="back-aside">
      <AButton type="text" id="close-btn-profile" @click="toggleMenu">
        <icon-close size="20" fill="#fff" />
      </AButton>
      <Logo @click="toggleMenu" />
    </div>
    <div class="relative h-full" style="z-index: 0">
      <ToolBar :visible="!isProfile" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'
  import ToolBar from './ToolBar/ToolBar.vue'
  import Logo from './Logo.vue'

  const router = useRouter()

  const isProfile = computed<boolean>(() => {
    return router.currentRoute.value.name != 'board'
  })

  function toggleMenu() {
    if (isProfile.value) {
      router.push('/board')
    } else {
      router.push('/profile')
    }
  }
</script>
<style lang="less">
  .profile-right-toolbar {
    position: fixed;
    right: 0;
    width: @cp-side-width;
    top: 0;
    bottom: 0;
    transition: all 0.3s ease-in-out;
  }

  #close-btn-profile {
    position: absolute;
    top: @cp-side-width * -1;
    width: @cp-side-width * 0.6;
    right: @cp-side-width * 0.2;
    height: @cp-side-width * 0.6;
    opacity: 0;
    transition: all 0.5s 0.2s ease;
  }

  .active-profile {
    #close-btn-profile {
      top: @cp-side-width * 0.2;
      opacity: 1;
    }
  }

  #back-aside {
    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: 0;
    height: @cp-side-width;
    width: @cp-side-width;
    background-color: #ebebeb;
    z-index: 1;
  }

  .active-profile #back-aside {
    background-color: #494949 !important;
    height: 100vh;
  }
</style>
