<template>
  <div class="h-screen">
    <shape-context-menu />
    <background-context-menu />
    <!-- start main -->
    <!--class="flex h-screen"-->
    <div :class="`${prefixCls}-main`">
      <div
        class="h-screen border-l border-r border-gray-300 max-h-screen overflow-auto"
        style="display: grid; grid-template-rows: auto 4vw; height: 100%"
      >
        <div class="px-2 pt-2 overflow-auto">
          <transition :css="false">
            <ImageStyle
              v-if="uiStore.isActive('ui.right_sidebar.children.image')"
              v-motion="'cube'"
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: 400, opacity: 0 }"
              :leave="{ x: -400, opacity: 0 }"
            />
          </transition>

          <transition :css="false">
            <ShapeStyle
              v-if="uiStore.isActive('ui.right_sidebar.children.shape')"
              v-motion="'cube'"
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: 400, opacity: 0 }"
              :leave="{ x: -400, opacity: 0 }"
            />
          </transition>

          <transition :css="false">
            <TextStyle
              v-if="uiStore.isActive('ui.right_sidebar.children.text')"
              v-motion="'cube'"
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: 400, opacity: 0 }"
              :leave="{ x: -400, opacity: 0 }"
            />
          </transition>

          <transition :css="false">
            <BackgroundStyle
              v-if="uiStore.isActive('ui.right_sidebar.children.background')"
              v-motion="'cube'"
              :enter="{ x: 0, opacity: 1 }"
              :initial="{ x: 400, opacity: 0 }"
              :leave="{ x: -400, opacity: 0 }"
            />
          </transition>
        </div>
        <div class="price">قیمت کل : 25000</div>
      </div>
      <div class="h-screen relative h-screen board-main">
        <div class="absolute z-50 p-3 w-full" style="background: #fff">
          <div class="flex justify-between">
            <TopRightButtons />
            <TopLeftButtons />
          </div>
        </div>
        <div class="absolute bottom-board left-0 bottom-0 z-50 p-3" style="background: #fff">
          <BottomLeftButtons />
        </div>
        <pages v-if="false" />

        <div class="stages overflow-auto">
          <Stage />
        </div>
      </div>
      <div class="h-screen px-3 pt-2 pb-10 overflow-auto max-h-screen border-r border-gray-300">
        <transition :css="false">
          <TextOptions
            v-if="uiStore.isVisible('ui.text_option')"
            v-motion="'cube'"
            :enter="{ x: 0, opacity: 1 }"
            :initial="{ x: -400, opacity: 0 }"
            :leave="{ x: 400, opacity: 0 }"
          />
        </transition>
      </div>
      <!--   overflow-auto   -->
    </div>
    <!-- end main -->
  </div>
</template>

<script lang="ts" setup>
  import TopRightButtons from '../../components/Stage/TopRightButtons.vue'
  import BottomLeftButtons from '../../components/Stage/BottomLeftButtons.vue'
  import TextOptions from '../../components/Option/TextOptions.vue'
  import { uiStore } from '../../core'
  import ShapeContextMenu from '../../components/Stage/ShapeContextMenu.vue'
  import BackgroundContextMenu from '../../components/Stage/BackgroundContextMenu.vue'
  import Stage from '../../components/Stage/Stage.vue'
  import { useDesign } from '../../utils/useDesign'
  import Pages from '../../components/Stage/Pages.vue'
  import ImageStyle from '../../components/Style/ImageStyle.vue'
  import ShapeStyle from '../../components/Style/ShapeStyle.vue'
  import TextStyle from '../../components/Style/TextStyle.vue'
  import BackgroundStyle from '../../components/Style/BackgroundStyle.vue'
  import TopLeftButtons from '../../components/Stage/TopLeftButtons.vue'

  const { prefixCls } = useDesign('board')
</script>

<style lang="less">
  @pre: ~'@{namespace}-board';

  .@{pre}-main {
    display: grid;
    grid-template-columns: 230px auto 230px;
  }

  .board-main {
    background: #e5e5e5;
  }

  .shape-context-menu,
  .background-context-menu {
    position: absolute;
    width: 230px;
    border-radius: @border-radius-base;
    z-index: 100;
    display: none;
    border: 1px solid #ddd;
  }

  .price {
    background: @cp-price-background;
  }
</style>
