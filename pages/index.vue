<template>
  <div class="text-base">
    <button
      class="
        bg-green-600
        hover:bg-green-300
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
    </button>
    <NuxtLink
      to="/add-report"
      class="
        bg-green-600
        hover:bg-green-300
        h-16
        text-white
        font-medium
        uppercase
        transition-colors
        w-full
      "
      >Add Report</NuxtLink
    >
  </div>
</template>

<script>
export default {
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
}
</script>
