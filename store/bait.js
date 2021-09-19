export const state = () => ({
  bait: null,
})

export const mutations = {
  setUserBait(state, payload) {
    state.bait = payload.slice()
  },
}

export const actions = {
  async getAllBaitFromCurentUser(context, payload) {
    let baitArray = []
    await this.$fire.firestore
      .collection('bait')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userBaits')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          baitArray.push(doc.data())
        })
      })
    context.dispatch('setUserBait', baitArray)
  },
  setUserBait(context, payload) {
    context.commit('setUserBait', payload)
  },
}

export const getters = {
  userBait(state) {
    let baitArray = []
    state.bait.forEach((bait) => {
      baitArray.push(bait.name)
    })
    return baitArray
  },
}
