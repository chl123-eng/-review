import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, logout } from '@/api/user';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
  };
};
const state = getDefaultState();

const mutations = {
  SET_TOKEN: (token) => {
    state.token = token;
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((res) => {
          const { data } = res;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken();
          commit('RESET_STATE');
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken();
      commit('RESET_STATE');
      resolve;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
