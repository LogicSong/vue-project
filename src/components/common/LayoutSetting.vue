<template>
  <div>
    <a-tooltip trigger="hover" placement="left">
      <template #title>布局设置</template>
      <i class="i-fe:settings cursor-pointer text-32 color-primary" @click="handleOpen" />
    </a-tooltip>

    <a-modal v-model:open="open" title="布局设置" width="600px" :footer="null">
      <a-space class="flex" style="justify-content: space-between; align-items: baseline">
        <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('simple')">
          <div class="flex">
            <a-skeleton :width="20" :height="60" />
            <div class="ml-4">
              <a-skeleton :width="80" :height="60" />
            </div>
          </div>
          <a-button
            class="mt-12"
            size="small"
            :type="appStore.layout === 'simple' ? 'primary' : ''"
            ghost
          >
            简约
          </a-button>
        </div>
        <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('normal')">
          <div class="flex">
            <a-skeleton :width="20" :height="60" />
            <div class="ml-4">
              <a-skeleton :width="80" :height="10" />
              <a-skeleton class="mt-4" :width="80" :height="46" />
            </div>
          </div>
          <a-button
            class="mt-12"
            size="small"
            :type="appStore.layout === 'normal' ? 'primary' : ''"
            ghost
          >
            通用
          </a-button>
        </div>

        <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('full')">
          <div class="flex">
            <a-skeleton :width="20" :height="60" />
            <div class="ml-4">
              <a-skeleton :width="80" :height="6" />
              <a-skeleton class="mt-4" :width="80" :height="4" />
              <a-skeleton class="mt-4" :width="80" :height="42" />
            </div>
          </div>
          <a-button
            class="mt-12"
            size="small"
            :type="appStore.layout === 'full' ? 'primary' : ''"
            ghost
          >
            全面
          </a-button>
        </div>
        <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('empty')">
          <div class="flex">
            <a-skeleton :width="104" :height="60" />
          </div>
          <a-button
            class="mt-12"
            size="small"
            :type="appStore.layout === 'empty' ? 'primary' : ''"
            ghost
          >
            空白
          </a-button>
        </div>
      </a-space>
      <p class="mt-16 opacity-50">
        注: 此设置仅对未设置layout或者设置成跟随系统的页面有效，菜单设置的layout优先级最高
      </p>
    </a-modal>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
const open = ref(false)

const handleOpen = () => {
  open.value = true
}
</script>
