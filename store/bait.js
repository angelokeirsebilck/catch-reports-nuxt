export const state = () => ({
  bait: null,
})

export const mutations = {
  setUserBait(state, payload) {
    state.bait = payload
  },
}

export const actions = {
  getAllBaitFromCurentUser(context, payload) {
    this.$fire.firestore
      .collection('bait')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userBaits')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          payload.push(doc.data())
        })
      })
    context.commit('setUserBait', payload)
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
