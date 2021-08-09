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
  },
  // created() {
  //   this.$store.dispatch('setAppLoaded', true)
  // },
}
</script>
