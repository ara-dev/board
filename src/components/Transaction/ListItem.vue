<template>
  <List item-layout="horizontal">
    <ListItem v-for="(item, index) in data" :key="index">
      <div class="flex text-right">
        <div>
          <div
            style="
              padding: 17px;
              width: 60px;
              height: 60px;
              border: 3px solid #2da771;
              border-radius: 50%;
            "
          >
            <Icon :icon="item.icon" size="20" />
          </div>
        </div>
        <div class="flex flex-col ml-3">
          <div>
            <span class="font-bold">{{ item.price }}</span>
            <span class="ml-1">تومان</span>
          </div>

          <div>
            <Tag :color="item.tagColor">{{ item.tagTitle }}</Tag>
            <span class="ml-3 text-gray-400">{{ item.transactionDetail }}</span>
          </div>
          <div class="flex">
            <div class="flex">
              <span class="text-2xl font-bold text-gray-400">&#8226;</span>
              <span class="ml-1 mt-1 text-gray-400">شماره تراکنش :</span>
              <span class="ml-1 mt-1 font-bold">{{ item.transaction.id }}</span>
            </div>
            <div class="flex ml-10">
              <span class="text-2xl font-bold text-gray-400">&#8226;</span>
              <span class="ml-1 mt-1 text-gray-400">زمان تراکنش :</span>
              <span class="ml-1 mt-1 font-bold">{{ item.transaction.date }}</span>
            </div>
            <div class="flex ml-10">
              <span class="text-2xl font-bold text-gray-400">&#8226;</span>
              <span class="ml-1 mt-1 text-gray-400">وضعیت تراکنش :</span>
              <span class="ml-1 mt-1 font-bold">{{ item.transaction.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </ListItem>
  </List>
</template>

<script lang="ts" setup>
  import Icon from '@b/components/Icon/Icon.vue'
  import { List, ListItem, Tag } from 'ant-design-vue/es'

  interface Item {
    icon: string
    price: string
    tagTitle: string
    tagColor: string
    transactionDetail: string
    transaction: {
      id: string
      date: string
      status: string
    }
  }
  const data: Item[] = [
    {
      icon: 'ion:add-circle-outline',
      price: '250،000',
      tagTitle: 'تراکنش خرید',
      tagColor: '#2DA771',
      transactionDetail: 'بابت سفارش #ct524521 و انصراف سفارش و مروجوعی کردن مبلغ',
      transaction: {
        id: '#5623',
        date: '1400/08/25 14:45',
        status: 'در حال بررسی',
      },
    },
    {
      icon: 'ion:add-circle-outline',
      price: '250،000',
      tagTitle: 'تراکنش خرید',
      tagColor: '#EF4444',
      transactionDetail: 'بابت سفارش #ct524521 و انصراف سفارش و مروجوعی کردن مبلغ',
      transaction: {
        id: '#5623',
        date: '1400/08/25 14:45',
        status: 'در حال بررسی',
      },
    },
  ]
</script>

<style scoped></style>
