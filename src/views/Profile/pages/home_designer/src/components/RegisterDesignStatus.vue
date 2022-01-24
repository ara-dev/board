<template>
  <Tag :class="[`${prefixCls}-tag`, currentStatus.className]">{{ currentStatus.title }}</Tag>
</template>

<script lang="ts" setup>
  import { useDesign } from '@b/utils/useDesign'
  import { status, StatusItem } from '../types/status'
  import { computed } from 'vue'
  import { Tag } from 'ant-design-vue'
  const { prefixCls } = useDesign('register-design-status')

  interface Props {
    sts: number
  }

  const props = withDefaults(defineProps<Props>(), {
    sts: 1,
  })

  const currentStatus = computed((): StatusItem => {
    const _sts = status.find((item) => item.id == props.sts)
    if (_sts) {
      return _sts
    }
    return {
      className: '',
      title: '',
      show: true,
    }
  })
</script>

<style lang="less">
  @pre: ~'@{prefix}-register-design-status';

  .@{prefix}-tag{
    font-size: 15px !important;
    padding:5px 10px !important;
    background: #fff !important;
    //color: #fff !important;



  }

  .success-job{
    background: @primary-color;
  }

  .no-upload{
    border-color: @secondary-color !important;
    color: @secondary-color;
  }

  .need-edit{
    background: #DC2626;
  }

  .final-accepted{
    border-color: @primary-color !important;
    color: @primary-color;
  }

  .rejected{
    border-color: #DC2626 !important;
    color: #DC2626;
  }

  .worked{
    border-color:#3B82F6 !important;
    color: #3B82F6;
  }

  .wating-for-accept{
    border-color: #F97316 !important;
    color: #F97316;
  }
</style>
