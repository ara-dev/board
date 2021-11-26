<template>
  <div class="grid grid-cols-4 h-full">
    <div class="col-span-3 px-3">
      <span class="font-bold mb-3 block text-gray-400">آخرین طرح های من</span>
      <div class="grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <MyDesign v-for="i in 5" :key="i" />
      </div>
    </div>
    <div class="col-span-1 pr-3 items-stretch border-r border-gray-100">
      <span class="font-bold block mb-3 text-gray-400">طرح های پیشنهادی</span>
      <div class="overflow-auto">
        <div class="grid grid-cols-1 gap-4">
          <SuggestionDesign v-for="i in 3" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MyDesign from '../../../components/Profile/MyDesign.vue'
  import SuggestionDesign from '../../../components/Profile/SuggestionDesign.vue'
</script>

<style lang="less"></style>
