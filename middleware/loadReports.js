export default function ({ $fire, store, redirect }) {
  store.dispatch('report/getAllReports')
  store.dispatch('bait/getAllBaitFromCurentUser')
  store.dispatch('technique/getAllTechniqueFromCurentUser')
  store.dispatch('location/getAllLocationFromCurentUser')
}
