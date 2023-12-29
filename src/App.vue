<script setup>
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>

<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#00b96b'
      }
    }"
    :locale="zhCN"
  >
    <RouterView />
  </ConfigProvider>
</template>

<style scoped></style>
