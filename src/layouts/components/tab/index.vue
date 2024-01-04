<template>
  <div>
    <a-tabs
      v-model:activeKey="tabStore.activeTab"
      type="card"
      tab-position="top"
      style="margin: 0"
      tab-bar-gutter="20"
      @tab-click="handleItemClick"
    >
      <a-tab-pane v-for="item in tabStore.tabs" :key="item.path" :tab="item.title" />
    </a-tabs>

    <!-- <ContextMenu
      v-if="contextMenuOption.show"
      v-model:show="contextMenuOption.show"
      :current-path="contextMenuOption.currentPath"
      :x="contextMenuOption.x"
      :y="contextMenuOption.y"
    /> -->
  </div>
</template>

<script setup>
// import ContextMenu from './ContextMenu.vue'
import { useTabStore, useAppStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
const tabStore = useTabStore()

const contextMenuOption = reactive({
  show: false,
  x: 0,
  y: 0,
  currentPath: '',
})

const handleItemClick = (path) => {
  tabStore.setActiveTab(path)
  router.push(path)
}

function showContextMenu() {
  contextMenuOption.show = true
}
function hideContextMenu() {
  contextMenuOption.show = false
}
function setContextMenu(x, y, currentPath) {
  Object.assign(contextMenuOption, { x, y, currentPath })
}

// 右击菜单
async function handleContextMenu(e, tagItem) {
  const { clientX, clientY } = e
  hideContextMenu()
  setContextMenu(clientX, clientY, tagItem.path)
  await nextTick()
  showContextMenu()
}
</script>

<style scoped lang="scss">
:deep(.ant-tabs) {
  .ant-tabs-nav {
    margin: 0;
  }
}
</style>
