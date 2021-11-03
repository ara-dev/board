<template>
  <div class="p-4 h-screen flex flex-col">
    <div class="flex items-center">
      <ControlPLogo class="flex-1" />
      <AButton class="ml-4">ذخیره طرح</AButton>
      <a-button type="primary">سبد سفارش</a-button>
    </div>
    <ADivider />
    <div class="grid grid-cols-12 gap-4 pt-5 flex-1 items-stretch">
      <ProfileMenu class="col-span-3" />
      <div class="col-span-9 relative">
        <router-view v-slot="{ Component }" id="profile-inner-container">
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
  import ProfileMenu from './ProfileMenu.vue'

  const { prefixCls } = useDesign('profile')
</script>

<style lang="less">
  @pre: ~'@{namespace}-profile';
  #@{pre}-design-adv{
    border-radius: @border-radius-base*2;
  }
</style>
<style lang="less">
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
</style>
