<template>
  <CommonPage :show-header="false">
    <div class="wh-full flex justify-center">
      <a-result
        status="403"
        title="403 禁止访问"
        sub-title="抱歉，您暂无权限访问，请联系管理员开通权限。"
      >
        <template #extra>
          <a-button v-if="back" type="primary" class="ml-20" @click="router.replace(back)">
            返回上一页
          </a-button>
          <a-button type="primary" @click="router.replace('/')">返回首页</a-button>
        </template>
      </a-result>
    </div>
  </CommonPage>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const back = history.state.back

if (history.state.from === 'permission-guard') {
  delete history.state.from
} else if (route.query.path) {
  router.replace(route.query.path)
}
</script>
