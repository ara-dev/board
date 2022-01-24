<template>
  <div class="h-screen flex flex-col">
    <div class="grid grid-cols-12 flex-1 items-stretch h-full">
      <div class="col-span-2 px-3 border-l border-gray-100 overflow-auto">
        <ProfileMenu />
      </div>
      <div class="col-span-10 relative overflow-auto">
        <RouterView id="profile-inner-container" v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  import ProfileMenu from './components/ProfileMenu.vue'

  const { prefixCls } = useDesign('profile')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-profile';
  #@{pre}-design-adv {
    border-radius: @border-radius-base * 2;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.7, 0, 0.15, 0.97);
  }

  .fade-enter-to {
    position: absolute;
    width: 100%;
    top: 0;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .profile-right-toolbar {
    background-color: white;
  }
</style>
