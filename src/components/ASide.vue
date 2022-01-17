<template>
  <div :class="{ 'active-profile': isProfile }" class="profile-right-toolbar text-center">
    <div v-if="stageStore.isEditMode" id="close-btn">
      <AButton id="close-btn-profile" type="text" @click="toggleMenu">
        <Icon color="#ffffff" icon="ion:close-outline" size="20" />
      </AButton>
    </div>

    <div id="back-aside">
      <Logo class="cursor-pointer" @click="toggleMenu" />
    </div>
    <div class="relative h-full" style="z-index: 0">
      <ToolBar :visible="!isProfile" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { stageStore } from '../core'
  import { computed } from 'vue'
  import ToolBar from './ToolBar/ToolBar.vue'
  import Logo from './Logo.vue'
  import Icon from './Icon/Icon.vue'

  const router = useRouter()

  const isProfile = computed<boolean>(() => {
    console.log('router.currentRoute.value.name ===>', router.currentRoute.value)
    return !(
      router.currentRoute.value &&
      router.currentRoute.value.name &&
      router.currentRoute.value.name.startsWith('board')
    )
  })

  function toggleMenu() {
    if (isProfile.value) {
      router.push({ name: 'board' })
    } else {
      router.push({ name: 'profile' })
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
    right: @cp-side-width * 0.1;
    height: @cp-side-width * 0.6;
    opacity: 0;
    transition: all 0.3s 0.3s ease;
  }

  .active-profile {
    #close-btn-profile {
      top: @cp-side-width * 0.2;
      opacity: 1;
    }

    #close-btn {
      z-index: 2;
    }
  }
  #close-btn {
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 0;
    height: @cp-side-width;
    width: @cp-side-width;
  }

  #back-aside {
    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: 0;
    height: @cp-side-width;
    width: @cp-side-width;
    background-color: @cp-price-background;
    z-index: 1;
  }

  .active-profile #back-aside {
    background-color: #494949 !important;
    height: 100vh;
  }
</style>
