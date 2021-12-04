export const state = () => ({
  isLoading: false,
})

export const mutations = {
  setIsLoading(state, payload) {
    state.isLoading = payload
  },
}

export const actions = {
  setIsLoading(context, payload) {
    context.commit('setIsLoading', payload)
  },
}

export const getters = {}
