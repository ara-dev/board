<template>
  <div class="relative flex flex-col">
    <div class="flex flex-col gap-4 mt-4">
      <div>
        <div class="flex justify-between items-center">
          <div>
            <div class="flex items-center">
              <div>
                <img class="rounded-lg inline-block" src="@b/assets/img/temp/profile-img.png" />
              </div>
              <div class="pl-5">
                <span>{{ userStore.state.name }}</span>
                <br />
                <span>{{ userStore.state.mobile }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex gap-2 items-center">
          <span>نقش ها:</span>
          <Tag
            class="!mx-0"
            v-for="(item, index) in userStore.state.roles"
            :key="index"
            color="green"
          >
            {{ userStore.getRoleStr(item) }}
          </Tag>
          <div class="flex-1"></div>
          <div>
            <Button @click="userStore.logout()" type="link" danger class="p-0">
              <template #icon>
                <Icon icon="ion:log-out-outline" class="ml-2" size="16" />
              </template>
              <span> خروج</span>
            </Button>
          </div>
        </div>
      </div>

      <Divider class="!my-2" />
    </div>
    <!--    style="display: grid; grid-template-rows: auto 15%"-->
    <div class="flex-1">
      <!--     -->
      <div>
        <Menu
          v-model:selectedKeys="currentMenu"
          :class="[`${prefixCls}-menu`]"
          class="flex-1"
          style="border: none"
          @select="selectMenu"
        >
          <MenuItem v-for="item in Menus" :key="item.path">
            <div class="flex items-center">
              <Icon :icon="item.icon" class="mr-2" size="25" />
              <span>{{ item.title }}</span>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <!--      <div>
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
      </div>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Menus from './../services/profiles-menus'
  import { useDesign } from '@b/utils/useDesign'
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { userStore } from '@b/model/user'

  import Icon from '@b/components/Icon/Icon.vue'
  import { MenuItem, Menu, Button, Divider, Tag } from 'ant-design-vue/es'

  const { prefixCls } = useDesign('profile')
  const currentMenu = ref<string[]>([])

  const router = useRouter()

  const route = useRoute()

  onMounted(() => {
    currentMenu.value = [route.path]
  })

  function selectMenu(menu: any) {
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
      border-radius: @border-radius-base*1.8;
    }

    .ant-menu:not(.ant-menu-horizontal),
    .ant-menu-item-selected {
      color: #fff;
      background-color: @primary-color !important;
    }

    .ant-menu-item-selected:hover {
      color: #fff !important;
    }

    .ant-menu-item:not(.ant-menu-item-selected):hover {
      background-color: lighten(@primary-color, 50%) !important;
    }
  }
</style>
