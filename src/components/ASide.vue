<template>
  <div class="profile-right-toolbar text-center" :class="{'active':isProfile}">
    <a-button type="text" class="mt-10" @click="toggleMenu">
      <icon-close size="20" fill="#fff"/>
    </a-button>
    <logo class="absolute" style="right:15px;bottom: 20px"/>
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
