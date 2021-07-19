export const state = () => ({})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {},
}

export const actions = {
  onAuthStateChangedAction(context, { authUser, claims }) {
    if (authUser) {
      const { uid, email } = authUser
      console.log(uid)
      this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          console.log('snapshot : ', snapshot.data())
          if (snapshot.exists) {
            this.app.store.dispatch('auth/setUser', snapshot.data())
          } else {
            console.log('Does not exist.')
          }
        })
    } else {
      console.log('no auth user')
    }
  },
}

export const getters = {}
