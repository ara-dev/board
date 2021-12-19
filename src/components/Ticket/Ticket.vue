<template>
  <div class="flex flex-col">
    <DateTimeMessage />
    <Message type="message" />
    <Message type="reply" />
  </div>
</template>

<script lang="ts" setup>
  import Message from './Message.vue'
  import DateTimeMessage from './DateTimeMessage.vue'
</script>

<style lang="less"></style>
