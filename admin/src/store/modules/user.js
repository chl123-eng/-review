import { getToken, setToken } from '@/utils/auth';
import { login } from '@/api/user';
const state = {
  token: getToken(),
};
const mutations = {
  SET_TOKEN: (token) => {
    state.token = token;
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
          resolve;
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
