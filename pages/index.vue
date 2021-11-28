<template>
  <div
    class="max-w-screen-xl mx-auto justify-start align-middle w-full pt-5 pa-5"
  >
    <div class="">
      <ReportFilter />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
        <ReportSort />
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-max"
      v-if="reports && reports.length > 0"
    >
      <div
        @click="reportClickHandler(report.id)"
        class="flex group relative flex-col cursor-pointer"
        v-for="(report, index) in reports"
        :key="index"
      >
        <ReportCard :report="report.report.report" />
      </div>
    </div>
    <div class="text-5xl text-primary-default" v-else>
      Helaas geen reports gevonden met deze gegevens.
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    reports() {
      return this.$store.getters['report/allReports']
    },
  },
  methods: {
    reportClickHandler(id) {
      this.$store.dispatch('report/getReport', id)
      this.$router.push({
        path: `reports/${id}`,
      })
    },
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
  mounted() {
    this.$store.dispatch('report/getAllReports')
    this.$store.dispatch('bait/getAllBaitFromCurentUser')
    this.$store.dispatch('technique/getAllTechniqueFromCurentUser')
    this.$store.dispatch('location/getAllLocationFromCurentUser')
  },
}
</script>
