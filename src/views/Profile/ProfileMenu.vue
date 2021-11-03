<template>
  <div class="relative flex flex-col">
    <div class="pt-5 pb-10">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center">
            <div>
              <img src="../../assets/img/profile-img.png" class="rounded-lg inline-block" />
            </div>
            <div class="pr-5">
              <span>علی قسامی</span>
              <br />
              <span>09135517425</span>
            </div>
          </div>
        </div>
        <div>
          <a-button>125 امتیاز</a-button>
        </div>
      </div>
    </div>
    <ADivider />
    <AMenu
      v-model:selectedKeys="currentMenu"
      style="border: none"
      class="flex-1"
      :class="[`${prefixCls}-menu`]"
      @select="selectMenu"
    >
      <AMenuItem v-for="item in Menus" :key="item.path">
        <div class="flex items-center">
          <Icon size="25" :icon="item.icon" class="ml-4" />
          <span>{{ item.title }}</span>
        </div>
      </AMenuItem>
    </AMenu>

    <AButton
      :id="`${prefixCls}-design-adv`"
      class="
        border-2
        text-center text-gray-300
        border-dashed
        w-full
        h-20
        flex
        items-center
        justify-center
      "
    >
      <p class="">
        در کنترل پی طراح شوید
        <br />
        و برای خود درآمد زایی کنید
      </p>
    </AButton>
  </div>
</template>
<script lang="ts" setup>
  import Menus from './profiles-menus'
  import Icon from '../../components/Icon/Icon.vue'
  import { useDesign } from '../../utils/useDesign'
  import { ref, toRaw, unref } from 'vue'
  import { useRouter } from 'vue-router'

  const { prefixCls } = useDesign('profile')

  const currentMenu = ref<string[]>([])

  const router = useRouter()
  function selectMenu(menu) {
    console.log('menu ===>', menu.key)
    router.push(`/${menu.key}`)
    console.log('currentMenu ===>', toRaw(unref(currentMenu)))
  }
</script>
<style lang="less">
  @pre: ~'@{namespace}-profile';
  #@{pre}-design-adv {
    border-radius: @border-radius-base*2;
  }

  .@{pre}-menu {
    .ant-menu-item {
      color: @gray-base;
      border-radius: @border-radius-base*2;
    }

    .ant-menu:not(.ant-menu-horizontal),
    .ant-menu-item-selected {
      color: @primary-color;
      background-color: lighten(@primary-color, 55%) !important;
    }
  }
</style>
