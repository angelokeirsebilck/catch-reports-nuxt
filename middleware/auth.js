export default function ({ $fire, store, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    try {
      return redirect('/login')
    } catch {}
  }
}
