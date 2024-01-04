<template>
  <a-dropdown>
    <div class="flex cursor-pointer items-center">
      <a-avatar round :size="36" :src="userStore.avatar" />
      <div v-if="userStore.userInfo" class="ml-12 flex-col flex-shrink-0 items-center">
        <span class="text-14">{{ userStore.nickName ?? userStore.username }}</span>
        <span class="text-12 opacity-50">[{{ userStore.currentRole?.name }}]</span>
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="item in options" :key="item.key" :icon="item.icon">
          <a @click="item.func">{{ item.label }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useUserStore, useAuthStore } from '@/store'
import api from '@/api'

const userStore = useUserStore()
const authStore = useAuthStore()

const options = reactive([
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-mdi:exit-to-app text-14' }),
    func: () => {
      $dialog.confirm({
        title: '提示',
        content: '确认退出？',
        okText: '确认',
        cancelText: '取消',
        async onOk() {
          try {
            await api.logout()
          } catch (error) {
            console.error(error)
          }
          authStore.logout()
          $message.success('已退出登录')
        },
      })
    },
  },
])
</script>
