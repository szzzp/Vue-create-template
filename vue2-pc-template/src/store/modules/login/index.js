
import { login } from '@/api/user.js'
import * as types from './types.js'
import { setToken } from '@/utils/auth.js'
export default {
  namespaced: true,
  state: {
    token: 'xxxxxxxxxxxx'
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    // 获取用户信息 --- token
    getUserInfo({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    token: state => state.token
  }
}

