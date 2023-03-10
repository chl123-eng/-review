const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
