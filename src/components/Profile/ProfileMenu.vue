<template>
  <div class="relative flex flex-col">
    <div class="pt-5 pb-3">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex items-center">
            <div>
              <img class="rounded-lg inline-block" src="../../assets/img/temp/profile-img.png" />
            </div>
            <div class="pr-5">
              <span>علی قسامی</span>
              <br />
              <span>09135517425</span>
            </div>
          </div>
        </div>
        <div>
          <AButton type="primary" ghost>125 امتیاز</AButton>
        </div>
      </div>
    </div>
    <ADivider />

    <div class="h-full" style="display: grid; grid-template-rows: auto 15%">
      <div class="overflow-auto" style="height: 85%">
        <AMenu
          v-model:selectedKeys="currentMenu"
          :class="[`${prefixCls}-menu`]"
          class="flex-1"
          style="border: none"
          @select="selectMenu"
        >
          <AMenuItem v-for="item in Menus" :key="item.path">
            <div class="flex items-center">
              <Icon :icon="item.icon" class="ml-4" size="25" />
              <span>{{ item.title }}</span>
            </div>
          </AMenuItem>
        </AMenu>
      </div>
      <div>
        <AButton
          :id="`${prefixCls}-design-adv`"
          class="border-2 text-center text-gray-300 border-dashed w-full h-20 flex items-center justify-center"
        >
          <p class="">
            در کنترل پی طراح شوید
            <br />
            و برای خود درآمد زایی کنید
          </p>
        </AButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Menus from './profiles-menus'
  import { useDesign } from '../../utils/useDesign'
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const { prefixCls } = useDesign('profile')
  const { prefixVar } = useDesign('')
  const currentMenu = ref<string[]>([])

  const router = useRouter()

  const route = useRoute()

  onMounted(() => {
    currentMenu.value = [route.path]
  })

  function selectMenu(menu) {
    //console.log('menu ===>', menu.key)
    router.push(`${menu.key}`)
    //console.log('currentMenu ===>', toRaw(unref(currentMenu)))
  }
</script>
<style lang="less">
  @pre: ~'@{prefix}-profile';
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
      color: #fff;
      background-color: @primary-color !important;
    }

    .ant-menu-item-selected:hover {
      color: #fff;
    }

    .ant-menu-item:not(.ant-menu-item-selected):hover {
      background-color: lighten(@primary-color, 50%) !important;
    }
  }
</style>
