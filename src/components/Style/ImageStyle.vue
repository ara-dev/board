<template>
  <div class="grid grid-cols-2 gap-2 mt-3 ml-2">
    <img v-for="i in 3" :src="`https://picsum.photos/200?rand=${i}`" @dragstart="dragStart" />
  </div>
</template>

<script lang="ts" setup>
  function dragStart(e: Event): void {
    //e.dataTransfer.setData('text', e.target.id)
    //console.log(e, 'sdfsdfsdfsfs')
  }
</script>

<style></style>
