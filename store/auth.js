export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },
}

export const actions = {
  setUser(context, payload) {
    context.commit('setUser', {
      user: payload,
    })
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  },
}
