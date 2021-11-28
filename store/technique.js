export const state = () => ({
  technique: null,
})

export const mutations = {
  setUserTechnique(state, payload) {
    state.technique = payload.slice()
  },
}

export const actions = {
  async getAllTechniqueFromCurentUser(context, payload) {
    let techniqueArray = []
    await this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userTechniques')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          techniqueArray.push(doc.data())
        })
      })
    context.dispatch('setUserTechnique', techniqueArray)
  },
  setUserTechnique(context, payload) {
    context.commit('setUserTechnique', payload)
  },
}

export const getters = {
  userTechnique(state) {
    let techniqueArray = []
    if (state.technique !== null) {
      state.technique.forEach((technique) => {
        techniqueArray.push(technique.name)
      })
    }

    return techniqueArray
  },
}
