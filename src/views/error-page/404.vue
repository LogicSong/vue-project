<template>
  <CommonPage :show-header="false">
    <div class="wh-full flex justify-center">
      <a-result status="404" title="404 您访问的页面不存在" sub-title="生活总归带点荒谬">
        <template #extra>
          <a-button type="primary" @click="replace('/')">返回首页</a-button>
        </template>
      </a-result>
    </div>
  </CommonPage>
</template>

<script setup>
const { replace } = useRouter()
</script>
