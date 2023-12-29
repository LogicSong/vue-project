import { defineStore } from 'pinia';
import { store } from '@/store';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: 'amdin',
    perms: [],
    menus: [],
    userInfo: {}
  }),
  getters: {
    getName() {
      return this.name;
    },
    getPerms() {
      return this.perms;
    }
  },
  actions: {
    /** 清空token及用户信息 */
    resetToken() {
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
    },
    /** 登录成功保存token */
    setToken(token) {
      console.log(token);
    },
    /** 登录 */
    async login(params) {
      try {
        // const { data } = await login(params);
        // this.setToken(data.token);
        // return this.afterLogin();
        // TODO 登录
        console.log(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      // TODO 权限路由
      // try {
      //   const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
      //   this.perms = perms;
      //   this.name = userInfo.name;
      //   this.userInfo = userInfo;
      //   // 生成路由
      //   const generatorResult = await generatorDynamicRouter(menus);
      //   this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);
      //   return { menus, perms, userInfo };
      // } catch (error) {
      //   return Promise.reject(error);
      //   // return this.logout();
      // }
    },
    /** 登出 */
    async logout() {
      // TODO 登出
    }
  }
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
