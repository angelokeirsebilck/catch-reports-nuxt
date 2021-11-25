<template>
  <div class="max-w-screen-xl mx-auto justify-start align-middle w-full pa-5">
    <ReportFilter />
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
    // reports() {
    //   return this.$store.state.report.reports
    // },
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
    this.$store.dispatch('report/getAllReports')
    this.$store.dispatch('bait/getAllBaitFromCurentUser')
    this.$store.dispatch('technique/getAllTechniqueFromCurentUser')
    this.$store.dispatch('location/getAllLocationFromCurentUser')
  },
}
</script>
