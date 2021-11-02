<template>

    <div class="p-5">

      <div class="p-5" dir="rtl" style="border-bottom:1px solid #ebebeb">
        <control-p-logo/>
        <a-button>ذخیره طرح</a-button>
        <a-button type="primary">سبد سفارش</a-button>
      </div>

      <div class="grid grid-cols-12 gap-4 h-screen pt-5">
        <div class="col-span-2 pr-3 pl-3" style="border-right:1px solid #ebebeb " dir="rtl">
          <span>طرح پیشنهادی</span>
        </div>
        <div class="col-span-7 pr-3 pl-3" style="border-right:1px solid #ebebeb" dir="rtl">
          <span>آخرین طرح های من</span>
        </div>
        <div class="col-span-3 relative" dir="rtl">
          <div class="pt-5 pb-10" style="border-bottom:1px solid #ebebeb">
            <div class="flex justify-between items-center">
              <div>
                  <div class="flex items-center">
                    <div>
                      <img src="../../assets/img/profile-img.png" class="rounded-lg	inline-block"/>
                    </div>
                    <div class="pr-5">
                      <span>علی قسامی</span>
                      <br>
                      <span>09135517425</span>
                    </div>
                  </div>
              </div>
              <div>
                <a-button>125 امتیاز</a-button>
              </div>
            </div>
          </div>

          <a-menu style="border:none">
            <a-menu-item key="1">
              <icon-bank-card size="28" class="ml-2"/>
              تراکنش ها واعتبارات من
            </a-menu-item>
            <a-menu-item key="2">
              <icon-order size="28" class="ml-2"/>
              سفارش ها
            </a-menu-item>
            <a-menu-item key="3">
              <icon-graphic-design size="28" class="ml-2"/>
              طرح های من
            </a-menu-item>
            <a-menu-item key="4">
              <icon-user size="28" class="ml-2"/>
              حساب من
            </a-menu-item>
            <a-menu-item key="5">
              <icon-calendar-thirty-two size="28" class="ml-2"/>
              تاریخ های مهم
            </a-menu-item>
            <a-menu-item key="6">
              <icon-address-book size="28" class="ml-2"/>
              آدرس های من
            </a-menu-item>
          </a-menu>

          <div class="absolute border-2 border-dashed">
            <p>
              در کنترل پی طراح شوید
              <br>
              و برای خود درآمد زایی کنید
            </p>
          </div>
        </div>
      </div>
    </div>

</template>

<script lang="ts" setup>
import Logo from "../../components/Logo.vue";
import ControlPLogo from "../../components/ControlPLogo.vue";
</script>

<style scoped>

</style>