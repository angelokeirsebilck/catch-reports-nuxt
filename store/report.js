export const state = () => ({
  reports: null,
  media: null,
  selectedReport: null,
  reportLoading: false,
})

export const mutations = {
  setAllReports(state, payload) {
    state.reports = payload.slice()
  },
  setSelectedReport(state, payload) {
    state.selectedReport = payload
  },
  setReportLoading(state, payload) {
    state.reportLoading = payload
  },
}

export const actions = {
  async addReport(context, payload) {
    const report = payload
    this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userReports')
      .doc()
      .set({
        report,
        createdAt: this.$fireModule.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('Added')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async getAllReports(context, payload) {
    let reports = []

    await this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userReports')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          let report = {
            id: null,
            report: null,
          }
          report.id = doc.id
          report.report = doc.data()
          reports.push(report)
        })
      })
    context.dispatch('setAllReports', reports)
  },
  async getReport(context, payload) {
    let report = {
      id: null,
      report: null,
    }
    if (payload !== null) {
      await this.$fire.firestore
        .collection('report')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userReports')
        .doc(payload)
        .get()
        .then((doc) => {
          report.id = doc.id
          report.report = doc.data()
          context.dispatch('setSelectedReport', report)
        })
    } else {
      context.dispatch('setSelectedReport', null)
    }
  },
  setAllReports(context, payload) {
    context.commit('setAllReports', payload)
  },
  setSelectedReport(context, payload) {
    context.commit('setSelectedReport', payload)
  },
  setReportLoading(context, payload) {
    context.commit('setReportLoading', payload)
  },
}

export const getters = {
  allReports(state) {
    return state.reports
  },
}
