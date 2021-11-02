<template>
  <div class="profile-right-toolbar text-center" :class="{'active-profile':isProfile}">
    <a-button type="text"  id="close-btn-profile" @click="toggleMenu">
      <icon-close size="20" fill="#fff"/>
    </a-button>
    <logo class="absolute" style="right:15px;bottom: 20px" @click="toggleMenu"/>
  </div>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed, watch} from "vue";

const router = useRouter();

const isProfile = computed<boolean>(()=>{
  return router.currentRoute.value.name != 'board';
})

function toggleMenu() {
  if (isProfile.value) {
    router.push('/board')
  } else {
    router.push('/profile');
  }
}


</script>
<style lang="less">
.profile-right-toolbar{
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;
}

#close-btn-profile{
  position: absolute;
  top: -5vw;
  width: 3vw;
  right: 1vw;
  height: 3vw;
  opacity: 0;
  transition: all 0.5s  0.2s ease;
}

.active-profile{
  background-color: #494949 !important;
  #close-btn-profile{
    top: 1vw;
    opacity: 1;
  }
}
</style>