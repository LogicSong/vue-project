<template>
  <CommonPage>
    <template #action>
      <a-button v-permission="'AddUser'" type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建新用户
      </a-button>
    </template>

    <MeCrud
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.read"
      :search-items="[
        {
          name: 'username',
          label: '用户名',
        },
        {
          name: 'gender',
          label: '性别',
        },
        {
          name: 'enable',
          label: '状态',
        },
      ]"
    >
      <template #username>
        <a-input v-model:value="queryItems.username" />
      </template>
      <template #gender>
        <a-select v-model:value="queryItems.gender" allow-clear :options="genders" />
      </template>
      <template #enable>
        <a-select
          v-model:value="queryItems.enable"
          allow-clear
          :options="[
            { label: '启用', value: 1 },
            { label: '停用', value: 0 },
          ]"
        />
      </template>
    </MeCrud>

    <MeModal ref="modalRef" width="520px" title="新增">
      <a-form
        ref="modalFormRef"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        :model="modalForm"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rule="{
            required: true,
            message: '请输入用户名',
            trigger: ['input', 'blur'],
          }"
        >
          <a-input v-model:value="modalForm.username" :disabled="modalAction !== 'add'" />
        </a-form-item>
        <a-form-item
          v-if="['add', 'reset'].includes(modalAction)"
          :label="modalAction === 'reset' ? '重置密码' : '初始密码'"
          name="password"
          :rule="{
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur'],
          }"
        >
          <a-input v-model:value="modalForm.password" />
        </a-form-item>

        <a-form-item v-if="['add', 'setRole'].includes(modalAction)" label="角色" name="roleIds">
          <a-select v-model:value="modalForm.roleIds" :options="roles" allow-clear multiple />
        </a-form-item>
        <a-form-item v-if="modalAction === 'add'" label="状态" name="enable">
          <a-switch v-model:checked="modalForm.enable">
            <template #checkedChildren>启用</template>
            <template #unCheckedChildren>停用</template>
          </a-switch>
        </a-form-item>
      </a-form>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { Avatar, Button, Switch, Tag } from 'ant-design-vue'
import { formatDateTime } from '@/utils'
import { MeCrud, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from './api'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const genders = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
const roles = ref([])
api.getAllRoles().then(({ data = [] }) => (roles.value = data))

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: ({ text }) =>
      h(Avatar, {
        size: 'large',
        src: text,
      }),
  },
  { title: '用户名', dataIndex: 'username', width: 150, ellipsis: { tooltip: true } },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
    ellipsis: true,
    customRender: ({ text }) => {
      if (text?.length) {
        return text.map((item, index) =>
          h(
            Tag,
            { type: 'success', style: index > 0 ? 'margin-left: 8px;' : '' },
            { default: () => item.name }
          )
        )
      }
      return '暂无角色'
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    customRender: ({ text }) => genders.find((item) => text === item.value)?.label ?? '',
  },
  { title: '邮箱', dataIndex: 'email', width: 150, ellipsis: { tooltip: true } },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: 180,
    customRender({ record }) {
      return h('span', formatDateTime(record['createTime']))
    },
  },
  {
    title: '状态',
    dataIndex: 'enable',
    width: 120,
    customRender: ({ record }) =>
      h(
        Switch,
        {
          checked: record.enable,
          loading: !!record.enableLoading,
          onChange: () => handleEnable(record),
        },
        {
          checked: () => '启用',
          unchecked: () => '停用',
        }
      ),
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 320,
    align: 'right',
    fixed: 'right',
    hideInExcel: true,
    customRender({ record }) {
      return [
        h(
          Button,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleOpenRolesSet(record),
          },
          {
            default: () => '分配角色',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
        h(
          Button,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            onClick: () => handleOpen({ action: 'reset', title: '重置密码', record, onOk: onSave }),
          },
          {
            default: () => '重置密码',
            icon: () => h('i', { class: 'i-radix-icons:reset text-14' }),
          }
        ),

        h(
          Button,
          {
            size: 'small',
            type: 'primary',
            danger: true,
            style: 'margin-left: 12px;',
            onClick: () => handleDelete(record.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
      ]
    },
  },
]

async function handleEnable(row) {
  row.enableLoading = true
  try {
    await api.update({ id: row.id, enable: !row.enable })
    row.enableLoading = false
    $message.success('操作成功')
    $table.value?.handleSearch()
  } catch (error) {
    row.enableLoading = false
  }
}

function handleOpenRolesSet(row) {
  const roleIds = row.roles.map((item) => item.id)
  handleOpen({
    action: 'setRole',
    title: '分配角色',
    row: { id: row.id, username: row.username, roleIds },
    onOk: onSave,
  })
}

const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
  handleDelete,
  handleOpen,
  handleSave,
} = useCrud({
  name: '用户',
  initForm: { enable: true },
  doCreate: api.create,
  doDelete: api.delete,
  doUpdate: api.update,
  refresh: () => $table.value?.handleSearch(),
})

function onSave() {
  if (modalAction.value === 'setRole') {
    return handleSave({
      api: () => api.update(modalForm.value),
      cb: () => $message.success('分配成功'),
    })
  } else if (modalAction.value === 'reset') {
    return handleSave({
      api: () => api.resetPwd(modalForm.value.id, modalForm.value),
      cb: () => $message.success('密码重置成功'),
    })
  }
  handleSave()
}
</script>
