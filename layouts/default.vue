<template>
  <v-app class="text-base relative">
    <LayoutTheHeader />
    <div
      class="
        bg-black
        fixed
        top-0
        left-0
        bottom-0
        right-0
        h-full
        w-full
        opacity-40
        z-100
        flex flex-col
        items-center
        justify-center
      "
      v-if="isLoading"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <Nuxt keep-alive />
  </v-app>
</template>

<script>
export default {
  // middleware: 'auth',
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
  },
}
</script>
