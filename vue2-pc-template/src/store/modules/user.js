import { getToken, setToken } from "../../utils/auth";
import { login } from "@/api/user";

const getDefaultState = () => {
  return {
    token: getToken(),
  };
};

const state = getDefaultState();

const mutations = {
  /**
   *  设置token
   */
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
};
const actions = {
  /**
   *  获取用户信息,token
   */
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   *
   * 获取用户信息
   */
  getUserInfo() {},
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
