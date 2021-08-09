<template>
  <!-- <v-app class="text-base">
    <v-progress-circular
      v-if="!isAppLoaded"
      :width="3"
      :size="50"
      color="green"
      indeterminate
    ></v-progress-circular>

    <div v-else>
      <LayoutTheHeader />
      <Nuxt />
    </div>
  </v-app> -->
  <v-app class="text-base">
    <LayoutTheHeader />
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  // middleware: 'auth',
}
</script>
