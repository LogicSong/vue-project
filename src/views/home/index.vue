<template>
  <AppPage show-footer>
    <div class="flex">
      <a-card class="min-w-200 w-30%">
        <div class="flex items-center">
          <a-avatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20 opacity-80">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-50">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">一个人几乎可以在任何他怀有无限热忱的事情上成功。</p>
        <p class="mt-12 text-right text-12 opacity-40">—— 查尔斯·史考伯</p>
      </a-card>
      <a-card class="ml-12 w-70%" title="✨">
        <p class="opacity-60"></p>
      </a-card>
    </div>
    <div class="mt-12 flex">
      <a-card class="w-50%" title="💯">
        <div class="mt-20"></div>
      </a-card>

      <a-card class="ml-12 w-50%" title="🛠️">
        <div class="mt-100"></div>
      </a-card>
    </div>

    <a-card class="mt-12" title="⚡️">
      <div class="mt-100"></div>
    </a-card>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>
