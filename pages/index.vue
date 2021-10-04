<template>
  <div class="max-w-screen-xl mx-auto">
    <!-- <button
      class="
        bg-primary-default
        h-16
        text-white
        font-medium
        uppercase
        transition-colors
        w-full
      "
      @click="logout"
    >
      Logout
    </button> -->
    <!-- <NuxtLink
      to="/add-report"
      class="
        bg-green-600
        hover:bg-green-300
        h-16
        text-white
        hover:text-black
        font-medium
        uppercase
        transition-colors
        w-full
      "
      >Add Report</NuxtLink
    > -->
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/setUser', null)
          console.log('Sign Out Succes.')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // async getAllBaitFromCurentUser() {
    //   let baitArray = []
    //   await this.$fire.firestore
    //     .collection('bait')
    //     .doc(this.$fire.auth.currentUser.uid)
    //     .collection('userBaits')
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.map((doc) => {
    //         baitArray.push(doc.data())
    //       })
    //     })
    //   this.$store.dispatch('bait/setUserBait', baitArray)
    // },
  },
  mounted() {
    // this.getAllBaitFromCurentUser()
    this.$store.dispatch('bait/getAllBaitFromCurentUser')
    this.$store.dispatch('technique/getAllTechniqueFromCurentUser')
    this.$store.dispatch('location/getAllLocationFromCurentUser')
  },
}
</script>
