<template>
  <!--  , 'h-full'-->
  <ACard :class="[`${prefixCls}`]">
    <div :class="[`${prefixCls}-search-icon`]">
      <AButton shape="circle" type="text" @click="showSearchBox = true">
        <template #icon>
          <Icon icon="ion:search-outline" size="23" />
        </template>
      </AButton>
    </div>

    <div>
      <div>
        <div style="direction: ltr; position: relative; overflow: hidden">
          <div
            :class="[
              `${prefixCls}-search-box`,
              showSearchBox ? '' : `${prefixCls}-search-box-hide`,
            ]"
          >
            <AInput class="text-right" placeholder="جستجو" size="large">
              <template #prefix>
                <AButton shape="circle" type="text" @click="showSearchBox = false">
                  <Icon icon="ion:close-outline" size="20" />
                </AButton>
              </template>
            </AInput>
          </div>
          <a-tabs v-model:activeKey="activeKey" :class="[`${prefixCls}`]" :tabBarGutter="1">
            <a-tab-pane key="4" tab="درآمد">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="3" force-render tab="ناموفق">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="2" tab="انجام شده">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="1" class="p-2" tab="همگی">
              <ListItem />
            </a-tab-pane>

            <template #renderTabBar="{ DefaultTabBar, ...props }">
              <component
                :is="DefaultTabBar"
                :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
                v-bind="props"
              />
            </template>
          </a-tabs>
        </div>
      </div>
      <div>
        <ADivider />
        <div class="flex justify-between">
          <div> تعداد رکورد یافت شده: 100 رکورد </div>
          <div>
            <APagination v-model:current="current" :total="50" show-less-items />
          </div>
        </div>
      </div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useDesign } from '../../utils/useDesign'
  import ListItem from '../Transaction/listItem.vue'
  const { prefixCls } = useDesign('tabs')
  const { prefixVar } = useDesign('')
  const showSearchBox = ref(false)
  const current = ref(2)
  const activeKey = ref('1')
</script>

<style lang="less">
  @pre: ~'@{namespace}-tabs';

  .@{pre}{

    .ant-input{
      direction: rtl;
    }

    &-search-icon{
      position: absolute;
      left: 5px;
      top: 15px;
      z-index: 1;
    }

    &-search-box{
      position: absolute;
      padding: 10px;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      background: #fff;
      transition: all 0.3s cubic-bezier(0.84, 0.03, 0.1, 1.02);

      &-hide{
        top:-60px;
      }
    }
  }

  .ant-pagination{
    .anticon-right,
    .anticon-left  {
      transform: rotate(180deg);
    }
    .ant-pagination-next{
      margin-right:8px;
    }
  }
</style>
