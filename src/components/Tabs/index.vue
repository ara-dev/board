<template>
  <!--  , 'h-full'-->
  <ACard :class="[`${prefixCls}-main-card`]">
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
          <ATabs
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
          </ATabs>
        </div>
      </div>
      <div>
        <ADivider />
        <div class="flex justify-between pb-4 px-3">
          <div> تعداد رکورد یافت شده: {{ props.total }} رکورد </div>
          <div>
            <APagination
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
  </ACard>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useDesign } from '../../utils/useDesign'
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
      left: 15px;
      top: 8px;
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

  .ant-pagination-item-link{
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
</style>
