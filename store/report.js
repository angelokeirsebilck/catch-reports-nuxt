export const state = () => ({
  reports: null,
  media: null,
})

export const mutations = {}

export const actions = {
  async addReport(context, payload) {
    const report = payload
    this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userReports')
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
