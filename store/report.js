export const state = () => ({
  reports: null,
})

export const mutations = {}

export const actions = {
  addReport(context, payload) {
    const report = payload
    console.log(report)
    this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('reports')
      .doc()
      .set(report)
      .then(() => {
        console.log('Added')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
}

export const getters = {}
