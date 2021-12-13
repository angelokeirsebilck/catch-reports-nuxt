export const state = () => ({
  reports: null,
  media: null,
  selectedReport: null,
  reportLoading: false,
  weightRange: {
    min: 1,
    max: 1,
  },
  filters: {
    weight: {
      min: 0,
      max: 30,
    },
    locations: [],
    baits: [],
    techniques: [],
    years: [],
  },
  sort: 'Gewicht hoog-laag',
})

export const mutations = {
  clearAll(state, payload) {
    state.reports = null
    state.selectedReport = null
    state.rep = false
    state.weightRange = {
      min: 1,
      max: 1,
    }
    state.filters = {
      weight: {
        min: 0,
        max: 30,
      },
      locations: [],
      baits: [],
      techniques: [],
      years: [],
    }
    state.sort = 'Gewicht hoog-laag'
  },
  setAllReports(state, payload) {
    state.reports = payload.slice()
  },
  setSelectedReport(state, payload) {
    state.selectedReport = payload
  },
  setReportLoading(state, payload) {
    state.reportLoading = payload
  },
  setWeightFilter(state, payload) {
    state.filters.weight.min = payload.min
    state.filters.weight.max = payload.max
  },
  setLocationFilter(state, payload) {
    state.filters.locations = payload
  },
  setWeightRange(state, payload) {
    state.weightRange.min = payload.min
    state.weightRange.max = payload.max
  },
  setBaitsFilter(state, payload) {
    state.filters.baits = payload
  },
  setTechniquesFilter(state, payload) {
    state.filters.techniques = payload
  },
  setYearsFilter(state, payload) {
    state.filters.years = payload
  },
  setSortCriteria(state, payload) {
    state.sort = payload
  },
  clearAllFilters(state, payload) {
    state.filters = {
      weight: {
        min: state.weightRange.min,
        max: state.weightRange.max,
      },
      locations: [],
      baits: [],
      techniques: [],
      years: [],
    }
  },
}

export const actions = {
  setWeightFilter(context, payload) {
    context.commit('setWeightFilter', payload)
  },
  setLocationFilter(context, payload) {
    context.commit('setLocationFilter', payload)
  },
  async addReport(context, payload) {
    const report = payload.report

    const router = payload.router
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
        context.dispatch('getAllReports')
        router.push('/')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async updateReport(context, payload) {
    const report = payload.report

    console.log(report)

    const id = payload.id
    const router = payload.router
    this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userReports')
      .doc(id)
      .update({
        report,
      })
      .then(() => {
        console.log('Updated')
        context.dispatch('getAllReports')
        router.push('/')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async getAllReports(context, payload) {
    context.dispatch('loading/setIsLoading', true, { root: true })
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

    let weightRangeMin = context.state.weightRange.min
    let weightRangeMax = context.state.weightRange.max

    let isFirstMinMaxSet = false

    reports.forEach((report) => {
      const weight = report.report.report.general.weight

      if (weight !== null) {
        if (!isFirstMinMaxSet) {
          weightRangeMin = parseFloat(weight) - 1
          weightRangeMax = parseFloat(weight) + 1

          isFirstMinMaxSet = true
        }

        if (parseFloat(weight) < weightRangeMin) {
          weightRangeMin = parseInt(weight) - 1
        }

        if (parseFloat(weight) > weightRangeMax) {
          weightRangeMax = parseInt(weight) + 1
        }
      }
    })

    const weightRange = {
      min: parseInt(weightRangeMin),
      max: parseInt(weightRangeMax),
    }

    context.commit('setWeightRange', weightRange)
    context.commit('setWeightFilter', weightRange)
    context.dispatch('loading/setIsLoading', false, { root: true })
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
          context.dispatch('loading/setIsLoading', false, { root: true })
        })
    } else {
      context.dispatch('setSelectedReport', null)
    }
  },
  async deleteReport(context, payload) {
    const id = payload.id
    const router = payload.router

    await this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userReports')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Report deleted')
        router.push('/')
      })
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
    let reports = state.reports

    if (reports !== null && reports.length > 1) {
      reports = filterReports(state, reports)
      reports = sortReports(state, reports)
    }

    return reports
  },
  allYears(state) {
    let reports = state.reports
    let years = []

    if (reports && reports.length > 0) {
      reports.forEach((report) => {
        const date = new Date(report.report.report.general.date)
        const year = date.getFullYear()
        if (!years.includes(year)) {
          years.push(year)
        }
      })
    }

    return years
  },
  showClearFilterButton(state) {
    if (state.filters.locations.length > 0) return true
    if (state.filters.baits.length > 0) return true
    if (state.filters.techniques.length > 0) return true
    if (state.filters.years.length > 0) return true

    if (state.filters.weight.min !== state.weightRange.min) return true
    if (state.filters.weight.max !== state.weightRange.max) return true

    return false
  },
}

const isBetween = (min, max, value) => value >= min && value <= max
const isIncluded = (array, value) => {
  return array.includes(value)
}

const sortReports = (state, reports) => {
  if (state.sort == 'Gewicht hoog-laag') {
    reports.sort((a, b) => {
      const aWeight = a.report.report.general.weight
      const bWeight = b.report.report.general.weight

      const reportA =
        aWeight !== null ? parseFloat(a.report.report.general.weight) : aWeight
      const reportB =
        bWeight !== null ? parseFloat(b.report.report.general.weight) : bWeight

      if (reportA === reportB) {
        return 0
      } else if (reportA === null) {
        return 1
      } else if (reportB === null) {
        return -1
      } else {
        return reportA < reportB ? 1 : -1
      }
    })
  } else if (state.sort == 'Gewicht laag-hoog') {
    reports.sort((a, b) => {
      const aWeight = a.report.report.general.weight
      const bWeight = b.report.report.general.weight

      const reportA =
        aWeight !== null ? parseFloat(a.report.report.general.weight) : aWeight
      const reportB =
        bWeight !== null ? parseFloat(b.report.report.general.weight) : bWeight

      if (reportA === reportB) {
        return 0
      } else if (reportA === null) {
        return 1
      } else if (reportB === null) {
        return -1
      } else {
        return reportA < reportB ? -1 : 1
      }
    })
  } else if (state.sort == 'Datum nieuw-oud') {
    reports.sort((a, b) => {
      const aDate = a.report.report.general.date
      const bDate = b.report.report.general.date

      const reportA =
        aDate !== null ? new Date(a.report.report.general.date) : aDate
      const reportB =
        bDate !== null ? new Date(b.report.report.general.date) : bDate

      if (reportA === reportB) {
        return 0
      } else if (reportA === null) {
        return 1
      } else if (reportB === null) {
        return -1
      } else {
        return reportA < reportB ? 1 : -1
      }
    })
  } else {
    reports.sort((a, b) => {
      const aDate = a.report.report.general.date
      const bDate = b.report.report.general.date
      const reportA =
        aDate !== null ? new Date(a.report.report.general.date) : aDate
      const reportB =
        bDate !== null ? new Date(b.report.report.general.date) : bDate

      if (reportA === reportB) {
        return 0
      } else if (reportA === null) {
        return 1
      } else if (reportB === null) {
        return -1
      } else {
        return reportA < reportB ? -1 : 1
      }
    })
  }
  return reports
}

const filterReports = (state, reports) => {
  if (reports !== null) {
    const reportsWeightFiltered = reports.filter((report) => {
      if (report.report.report.general.weight == null) return true
      return isBetween(
        state.filters.weight.min,
        state.filters.weight.max,
        report.report.report.general.weight
      )
    })
    reports = reportsWeightFiltered

    if (state.filters.locations.length > 0) {
      const reportsLocationsFiltered = reports.filter((report) =>
        isIncluded(state.filters.locations, report.report.report.location.place)
      )
      reports = reportsLocationsFiltered
    }

    if (state.filters.baits.length > 0) {
      const reportsBaitssFiltered = reports.filter((report) =>
        isIncluded(state.filters.baits, report.report.report.general.bait)
      )
      reports = reportsBaitssFiltered
    }

    if (state.filters.techniques.length > 0) {
      const reportsTechniquesFiltered = reports.filter((report) =>
        isIncluded(
          state.filters.techniques,
          report.report.report.general.technique
        )
      )
      reports = reportsTechniquesFiltered
    }

    if (state.filters.years.length > 0) {
      const reportsYearsFiltered = reports.filter((report) => {
        const year = new Date(report.report.report.general.date).getFullYear()
        return isIncluded(state.filters.years, year)
      })
      reports = reportsYearsFiltered
    }
  }

  return reports
}
