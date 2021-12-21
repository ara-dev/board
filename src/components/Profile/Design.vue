<template>
  <div
    :class="[
      'relative overflow-hidden',
      `${prefixCls}`,
      props.hoverable ? `${prefixCls}-hoverable` : '',
    ]"
  >
    <slot name="image"></slot>
    <div :class="[`${prefixCls}-details`, 'p-3']">
      <slot name="info"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  import { defineProps } from 'vue'

  const { prefixCls } = useDesign('design')

  interface Props {
    hoverable?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    hoverable: false,
  })

  /*interface Props {
    hoverable?: boolean
  }

  const props = defineProps<Props>()*/
</script>

<style lang="less">
  @pre: ~'@{prefix}-design';

  .@{pre}{
    border: 1px solid #eeee;
    border-radius:@border-radius-base ;
    height:220px;

    .@{pre}-details{
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      background: #fff;
      height: 60px;
      transition: all 0.3s;
    }
  }

  .@{pre}-hoverable{

      .@{pre}-details{
        bottom: -60px;
        //display: none;
      }

      &:hover {
        .@{pre}-details {
          //display: inline;
          bottom: 0;
        }
      }
    }
</style>
