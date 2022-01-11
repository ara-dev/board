<template>
  <div :class="[`${prefixCls}`]">
    <div :class="['absolute', `${prefixCls}-shape-right`]"></div>
    <img
      class="absolute left-0"
      src="../../assets/img/login/left-bottom.svg"
      style="bottom: -100px"
    />
    <div :class="['absolute', `${prefixCls}-shape-left-bottom`]"> </div>
    <div class="h-screen flex flex-col justify-center">
      <ACard :class="['w-8/12 h-4/6', `${prefixCls}-box`]">
        <div class="grid grid-cols-12 h-full">
          <div class="col-span-8 flex p-5 items-center justify-center">
            <div class="w-4/12">
              <a-spin :spinning="spinning">
                <AForm ref="formLogin" :model="formState" :rules="rules">
                  <span class="mb-1 block"> نام کاربری</span>
                  <AFormItem name="mobile">
                    <AInput
                      v-model:value="formState.mobile"
                      placeholder="نام کاربری"
                      @keydown.enter="onSubmit"
                    />
                  </AFormItem>
                  <span class="mb-1 block">رمز عبور</span>
                  <AFormItem name="password">
                    <AInputPassword
                      v-model:value="formState.password"
                      placeholder="رمز عبور"
                      @keydown.enter="onSubmit"
                    />
                  </AFormItem>
                  <a class="block float-left" href="">رمز عبور را فراموش کردم</a>
                  <br />
                  <AButton
                    class="block mt-3 float-left"
                    size="large"
                    type="primary"
                    @click="onSubmit"
                    >ورود به سیستم
                  </AButton>
                </AForm>
              </a-spin>
            </div>
          </div>
          <div
            :class="[
              'col-span-4 p-5 h-full flex items-center justify-center text-white',
              `${prefixVar}-background-primary`,
            ]"
          >
            <div class="px-20">
              <h6 class="text-white text-2xl font-bold">سلام دوست عزیز!</h6>
              <p>به ویزاین خوش آمدید</p>
              <p
                >به ویزاین خوش آمدید در صورتی که هنوز ثبت نام نکرده اید با ما در لینک زیر همراه
                باشید.</p
              >
              <AButton :class="[`${prefixCls}-btn-register`]" ghost size="large"
                >ثبت نام در وب دیزاین</AButton
              >
            </div>
          </div>
        </div>
      </ACard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '../../utils/useDesign'
  import { reactive, ref, UnwrapRef } from 'vue'
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
  import { userStore } from '../../model/user'
  import { notification } from 'ant-design-vue'
  import router from '../../router'

  const { prefixCls } = useDesign('login')
  const { prefixVar } = useDesign('')
  const spinning = ref<boolean>(false)
  const isOnSendRequest = ref<boolean>(false)

  interface FormLogin {
    mobile: string
    password: string
  }
  const formLogin = ref()
  const formState: UnwrapRef<FormLogin> = reactive({
    mobile: '',
    password: '',
  })
  const rules = {
    mobile: [{ required: true, message: 'نام کاربری را وارد نمایید', trigger: 'blur' }],
    password: [{ required: true, message: 'رمز عبور را وارد نمایید', trigger: 'change' }],
  }

  function onSubmit() {
    if (isOnSendRequest.value) return
    //console.log('on submit')
    //document.body.focus()
    //return
    formLogin.value
      .validate()
      .then(async () => {
        try {
          spinning.value = true
          isOnSendRequest.value = true
          await userStore.login(formState.mobile, formState.password)
          await router.push({ name: 'profile' })
        } catch (e) {
          notification.error({
            message: 'خطا در ورود',
            description: 'نام کاربری یا رمز عبور اشتباه است',
          })
        } finally {
          spinning.value = false
          isOnSendRequest.value = false
        }
      })
      .catch((error: ValidateErrorEntity<FormLogin>) => {
        console.log('error', error)
      })
  }
</script>

<style lang="less">
  @pre: ~'@{prefix}-login';

  .@{pre}{

    &-btn-register{
      &:focus{
        border-color:#fff !important;
        color:#fff !important;
      }

      &:hover{
        border-color:#fff !important;
        color:#fff !important;
      }
    }

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
      border-radius: 50%;
      width:@shape-width;
      height: @shape-width;
      left:-150px; //calc((@shape-width / 3) * -2);
      bottom: -270px;
    }

    &-box{
      margin: 0 auto !important;
      & .ant-card-body{
        padding: 0;
        height: 100%;
      }
    }

  }
</style>
