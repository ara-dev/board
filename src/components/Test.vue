<template>
<div>

</div>
</template>

<script lang="ts" setup>
import {defineProps , reactive} from 'vue'

interface props {
  name?: string,
  id: number,
  a: boolean
}


interface data {
  active?: boolean,
  id: number
}


const r = reactive<data>()
const a = reactive<data>()
const b = reactive<data>()
const c = reactive<data>()
const fd = reactive<data>()

defineProps<props>()


</script>

<style scoped>

</style>
