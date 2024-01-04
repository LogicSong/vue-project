import { message, Modal } from 'ant-design-vue'

export function setupNaiveDiscreteApi() {
  window.$message = message
  window.$dialog = Modal
}
