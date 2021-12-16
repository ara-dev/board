<template>
  <div :class="[`${prefixCls}`]">
    <div :class="['absolute', `${prefixCls}-shape-right`]"></div>
    <img
      src="../../assets/img/login/left-bottom.svg"
      class="absolute"
      style="left: 0; bottom: -100px"
    />
    <div :class="['absolute', `${prefixCls}-shape-left-bottom`]"> </div>
    <div class="h-screen flex flex-col justify-center">
      <ACard :class="['w-8/12', `${prefixCls}-box`]" style="margin: 0 auto; height: 600px">
        <div class="grid grid-cols-12 h-full">
          <div class="col-span-8 flex p-5 items-center justify-center">
            <div class="w-4/12">
              <AForm>
                <span class="mb-1 block"> نام کاربری</span>
                <a-form-item>
                  <AInput placeholder="نام کاربری" />
                </a-form-item>
                <span class="mb-1 block">رمز عبور</span>
                <a-form-item>
                  <a-input-password placeholder="رمز عبور" />
                </a-form-item>
                <a href="" class="block float-left">رمز عبور را فراموش کردم</a>
                <br />
                <a-button class="block mt-3 float-left" type="primary">ورود به سیستم</a-button>
              </AForm>
            </div>
          </div>
          <div class="col-span-4 p-5 h-full" style="background: #2da771">
            <h6>سلام دوست عزیز!</h6>
            <p>به ویزاین خوش آمدید</p>
            <p
              >به ویزاین خوش آمدید در صورتی که هنوز ثبت نام نکرده اید با ما در لینک زیر همراه
              باشید.</p
            >
            <a-button ghost>Default</a-button>
          </div>
        </div>
      </ACard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  const { prefixCls } = useDesign('login')
  const { prefixVar } = useDesign('')
</script>

<style lang="less">
  @pre: ~'@{prefix}-login';

  .@{pre}{
    &-shape-right{
      @shape-width:237px;
      background-color: #51c9d0;
      border-radius: 50%;
      width:@shape-width;
      height: @shape-width;
      right: calc((@shape-width / 3) * -2);
      top: calc(50% - (@shape-width / 2));
    }

    &-shape-left-bottom{
      @shape-width:540px;
      border: 10px solid #FFC301;
      //background-color: #51c9d0;
      border-radius: 50%;
      width:@shape-width;
      height: @shape-width;
      left:-150px; //calc((@shape-width / 3) * -2);
      bottom: -270px;
    }

    &-box{
      & .ant-card-body{
        padding: 0;
        height: 100%;
      }
    }

  }
</style>
