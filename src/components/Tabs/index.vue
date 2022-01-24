<template>
  <!--  , 'h-full'-->
  <Card :class="[`${prefixCls}-main-card`]" class="flex flex-col">
    <div class="flex-1">
      <div>
        <div style="direction: ltr; position: relative; overflow: hidden">
          <div
            :class="[
              `${prefixCls}-search-box`,
              showSearchBox ? '' : `${prefixCls}-search-box-hide`,
            ]"
          >
            <Input class="text-right" placeholder="جستجو" size="large">
              <template #prefix>
                <Button shape="circle" type="text" @click="showSearchBox = false">
                  <Icon icon="ion:close-outline" size="20" />
                </Button>
              </template>
            </Input>
          </div>
          <Tabs
            v-model:activeKey="activeKey"
            :animated="false"
            :class="[`${prefixCls}`]"
            :tabBarGutter="1"
            @change="changeTab"
          >
            <slot></slot>
            <template #renderTabBar="{ DefaultTabBar, ...props }">
              <component
                :is="DefaultTabBar"
                :style="{ zIndex: 1, background: '#fff', textAlign: 'right' }"
                v-bind="props"
              />
            </template>
          </Tabs>
        </div>
      </div>
      <div>
        <Divider class="!my-0" />
        <div class="flex justify-between items-center p-2">
          <span class="text-xs">
            تعداد رکورد یافت شده:
            <span class="ant-tag"> {{ props.total }} رکورد</span>
          </span>
          <div>
            <Pagination
              :current="props.page"
              :pageSize="props.pageSize"
              :total="props.total"
              show-less-items
              @change="changePage"
            />
          </div>
        </div>
      </div>
    </div>
    <div :class="[`${prefixCls}-search-icon`]" class="flex items-center gap-2">
      <slot name="extra-action"></slot>
      <IconButton icon="ion:search-outline" @click="showSearchBox = true" />
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useDesign } from '@b/utils/useDesign'
  import IconButton from '../Button/IconButton.vue'
  import { Button, Input, Divider, Pagination, Tabs, Card } from 'ant-design-vue/es'
  import Icon from '@b/components/Icon/Icon.vue'

  const { prefixCls } = useDesign('tabs')
  const showSearchBox = ref(false)
  const activeKey = ref(1)

  interface Props {
    page?: number
    total?: number
    pageSize?: number
    activeTab?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    page: 1,
    pageSize: 10,
    total: 50,
    activeTab: 1,
  })

  const emit = defineEmits<{
    (e: 'changePage', page: number, pageSize: number): void
    (e: 'changeTab', activeKey: any): void
  }>()

  function changePage(page: number, pageSize: number) {
    emit('changePage', page, pageSize)
  }

  function changeTab(activeKey: any) {
    emit('changeTab', activeKey)
  }

  onMounted(() => {
    emit('changeTab', props.activeTab)
    activeKey.value = props.activeTab
  })
</script>

<style lang="less">
  @pre: ~'@{prefix}-tabs';

  .@{pre}{

    .ant-input{
      direction: rtl;
    }

    &-main-card{

      & > .ant-card-body{
        padding: 0;
      }

    }

    &-search-icon{
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 1;
    }

    .ant-tabs-tab{
      height: 48px;
      display: inline-flex;
      align-items: center;
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
      margin-left:8px;
    }
  }

  .ant-pagination-item-link{
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
</style>
