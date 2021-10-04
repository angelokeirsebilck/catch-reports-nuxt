export const state = () => ({
  location: null,
})

export const mutations = {
  setUserLocation(state, payload) {
    state.location = payload.slice()
  },
}

export const actions = {
  async getAllLocationFromCurentUser(context, payload) {
    let locationArray = []
    let newArray = []
    await this.$fire.firestore
      .collection('location')
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
    await locationArray.forEach((loc) => {
      this.$fire.firestore
        .collection('location')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userLocations')
        .doc(loc.id)
        .collection('locationSpots')
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            newArray = newArray.map((locItem) => {
              if (loc.id == locItem.id) {
                locItem.spots.push(doc.data())
              }
            })
          })
        })
    })

    context.dispatch('setUserLocation', newArray)
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
}
