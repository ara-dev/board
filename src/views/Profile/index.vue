<template>
  <div class="p-4 h-screen flex flex-col">
    <div class="flex pr-5 items-center justify-between">
      <div>
        <ControlPLogo />
      </div>
      <div>
        <AButton :class="['ml-4', `${prefixVar}-button`]">ذخیره طرح</AButton>
        <AButton type="primary">سبد سفارش</AButton>
      </div>
    </div>
    <ADivider />
    <div class="grid grid-cols-12 gap-4 pt-2 flex-1 items-stretch">
      <ProfileMenu class="col-span-3 px-3 border-l border-gray-100" />
      <div class="col-span-9 relative">
        <router-view id="profile-inner-container" v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ControlPLogo from '../../components/ControlPLogo.vue'
  import { useDesign } from '../../utils/useDesign'
  import ProfileMenu from '../../components/Profile/ProfileMenu.vue'

  const { prefixCls } = useDesign('profile')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{namespace}-profile';
  #@{pre}-design-adv{
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
