<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    class="side-menu"
    mode="inline"
    :items="permissionStore.menus"
    :inline-collapsed="appStore.collapsed"
    @click="handleMenuSelect"
  />
</template>

<script setup>
import { useAppStore, usePermissionStore } from '@/store'
import { isExternal } from '@/utils'

const router = useRouter()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const openKeys = ref([])
const selectedKeys = ref([])

function handleMenuSelect({ item }) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    router.push(item.path)
  }
}
</script>

<style lang="scss"></style>
