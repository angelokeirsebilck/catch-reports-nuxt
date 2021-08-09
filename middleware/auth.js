export default function ({ $fire, store, redirect }) {
  // console.log(store.getters)
  // console.log(store.getters['auth/user'])
  // If the user is not authenticated
  // console.log(store.state)
  // if (!store.getters['auth/isAuthenticated']) {
  //   return redirect('/login')
  // }
  // store.dispatch('onAuthStateChangedAction')
  // console.log(context)
  // console.log($fire.auth.currentUser)
  // console.log(store)
  // store.dispatch('setAppLoaded', true)
  // if (store.getters['appLoaded']) {
  //   if (!store.getters['auth/isAuthenticated']) {
  //     console.log('loop?')
  //     return redirect('/login')
  //   }
  // }
  console.log(store.getters['auth/isAuthenticated'])
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/login')
  }
}
