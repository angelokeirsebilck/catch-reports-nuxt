export const state = () => ({
  appLoaded: false,
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {},
  setAppLoaded(state, payload) {
    state.appLoaded = payload
  },
}

export const actions = {
  onAuthStateChangedAction(context, { authUser, claims }) {
    if (authUser) {
      const { uid, email } = authUser
      this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            // console.log(this.app)
            this.app.store.dispatch('auth/setUser', snapshot.data())
            this.app.context.redirect('/')
            context.commit('loading/setIsLoading', false)
          } else {
            console.log('Does not exist.')
            context.commit('loading/setIsLoading', false)
          }
        })
    } else {
      console.log('no auth user')
      this.app.context.redirect('/login')
      context.commit('loading/setIsLoading', false)
    }
  },
  setAppLoaded(context, payload) {
    context.commit('setAppLoaded', payload)
  },
}

export const getters = {
  appLoaded(state) {
    return state.appLoaded
  },
}
