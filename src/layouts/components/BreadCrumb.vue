<template>
  <a-breadcrumb class="ml-20">
    <a-breadcrumb-item v-if="!breadItems?.length" :clickable="false">
      {{ route.meta.title }}
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, index) of breadItems" v-else :key="item.code">
      <!-- <i :class="item.icon" class="mr-8" /> -->
      {{ item.name }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { usePermissionStore } from '@/store'
const route = useRoute()
const permissionStore = usePermissionStore()

const breadItems = ref([])
watch(
  () => route.name,
  (v) => {
    breadItems.value = findMatchs(permissionStore.permissions, v)
  },
  { immediate: true }
)

function findMatchs(tree, code, parents = []) {
  for (const item of tree) {
    if (item.code === code) {
      return [...parents, item]
    }
    if (item.children?.length) {
      const found = findMatchs(item.children, code, [...parents, item])
      if (found) {
        return found
      }
    }
  }
  return null
}
</script>
