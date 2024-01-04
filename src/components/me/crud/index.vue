<template>
  <AppCard
    v-if="searchItems?.length > 0"
    bordered
    bg="#fafafc dark:black"
    class="mb-30 min-h-60 flex justify-between rounded-4 p-16"
  >
    <a-form
      flex-1
      :model="queryItems"
      autocomplete="off"
      layout="inline"
      :label-col="formProps.labelCol || { span: 6 }"
      :wrapper-col="formProps.wrapperCol || { span: 18 }"
    >
      <a-row flex-1 :gutter="[10, 10]">
        <a-col v-for="item in searchItems" :key="item.name" :span="8">
          <a-form-item :label="item.label" :name="item.name" :rules="item.rules">
            <slot :name="item.name" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="flex-shrink-0">
      <a-button type="primary" @click="handleReset">重置</a-button>
      <a-button class="ml-20" type="primary" @click="handleSearch">搜索</a-button>
    </div>
  </AppCard>

  <a-table
    :loading="loading"
    :scroll="{ x: true }"
    :columns="columns"
    :data-source="tableData"
    :row-key="(row) => row[rowKey]"
    :pagination="isPagination ? pagination : false"
  />
</template>

<script setup>
import { utils, writeFile } from 'xlsx'

const props = defineProps({
  /**
   * @remote true: 后端分页  false： 前端分页
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @remote 是否分页
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  // scrollX: {
  //   type: Number,
  //   default: 1200,
  // },
  rowKey: {
    type: String,
    default: 'id',
  },
  columns: {
    type: Array,
    required: true,
  },
  /** queryBar中的参数 */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  searchItems: {
    type: Array,
    default() {
      return []
    },
  },
  formProps: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * ! 约定接口入参出参
   * * 分页模式需约定分页接口入参
   *    @pageSize 分页参数：一页展示多少条，默认10
   *    @pageNo   分页参数：页码，默认1
   * * 需约定接口出参
   *    @pageData 分页模式必须,非分页模式如果没有pageData则取上一层data
   *    @total    分页模式必须，非分页模式如果没有total则取上一层data.length
   */
  getData: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])
const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const pagination = reactive({ current: 1, pageSize: 10, showTotal: (total) => `共${total}条` })

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    // 如果非分页模式或者使用前端分页,则无需传分页参数
    if (props.isPagination && props.remote) {
      paginationParams = { pageNo: pagination.current, pageSize: pagination.pageSize }
    }
    const { data } = await props.getData({
      ...props.queryItems,
      ...paginationParams,
    })
    tableData.value = data?.pageData || data
    pagination.total = data.total ?? data.length
  } catch (error) {
    tableData.value = []
    pagination.total = 0
  } finally {
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}
function handleSearch() {
  pagination.current = 1
  handleQuery()
}
async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = null
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.current = 1
  handleQuery()
}
function onPageChange(currentPage) {
  pagination.current = currentPage
  if (props.remote) {
    handleQuery()
  }
}
function onChecked(rowKeys) {
  if (props.columns.some((item) => item.type === 'selection')) {
    emit('onChecked', rowKeys)
  }
}
function handleExport(columns = props.columns, data = tableData.value) {
  if (!data?.length) return $message.warning('没有数据')
  const columnsData = columns.filter((item) => !!item.title && !item.hideInExcel)
  const thKeys = columnsData.map((item) => item.key)
  const thData = columnsData.map((item) => item.title)
  const trData = data.map((item) => thKeys.map((key) => item[key]))
  const sheet = utils.aoa_to_sheet([thData, ...trData])
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, sheet, '数据报表')
  writeFile(workBook, '数据报表.xlsx')
}

defineExpose({
  handleSearch,
  handleReset,
  handleExport,
})
</script>
