export const state = () => ({
  location: null,
  currentLocationSpots: null,
  locationId: null,
})

export const mutations = {
  setUserLocation(state, payload) {
    state.location = payload
  },
  setCurrentLocationSpots(state, payload) {
    state.currentLocationSpots = payload
  },
  setLocationIds(state, payload) {
    state.locationId = payload
  },
  clearAll(state, payload) {
    state.location = null
    state.currentLocationSpots = null
    state.locationId = null
  },
}

export const actions = {
  setCurrentLocationSpots(context, payload) {
    let isChanged = false
    if (state.location !== null) {
      context.state.location.forEach((loc) => {
        if (loc.name == payload) {
          isChanged = true
          context.commit('setCurrentLocationSpots', loc.spots)
          context.commit('setLocationIds', loc.id)
        }
      })
      if (!isChanged) {
        context.commit('setCurrentLocationSpots', [])
        context.commit('setLocationIds', null)
      }
    }
  },
  async getAllLocationFromCurentUser(context, payload) {
    let locationArray = []
    await this.$fire.firestore
      .collection('users')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('userLocations')
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          let locObject = {
            id: doc.id,
            name: doc.data().name,
            spots: [],
          }
          locationArray.push(locObject)
        })
      })

    Promise.all(
      // Array of "Promises"
      locationArray.map((loc) => {
        return this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.uid)
          .collection('userLocations')
          .doc(loc.id)
          .collection('userLocationSpots')
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              locationArray.forEach((locItem, index, arr) => {
                if (loc.id == locItem.id) {
                  arr[index].spots.push(doc.data())
                }
              })
            })
          })
      })
    )
      .then(() => {
        console.log(`All spots fetched`)
        context.dispatch('setUserLocation', locationArray)
      })
      .catch((error) => {
        console.log(`Some failed: `, error.message)
      })
  },
  setUserLocation(context, payload) {
    context.commit('setUserLocation', payload)
  },
}

export const getters = {
  userLocation(state) {
    let locationArray = []
    if (state.location !== null) {
      state.location.forEach((loc) => {
        locationArray.push(loc.name)
      })
    }

    return locationArray
  },
  userSpotsForSelectedLocation(state) {
    let spotArray = []
    if (state.currentLocationSpots !== null) {
      state.currentLocationSpots.forEach((spot) => {
        spotArray.push(spot.name)
      })
    }

    return spotArray
  },
}
