<template>
  <div
    class="
      max-w-screen-xl
      mx-auto
      justify-start
      align-middle
      w-full
      pa-5
      min-h-full
      relative
    "
  >
    <div v-if="selectedReport != null">
      <ReportView :report="selectedReport" />
    </div>
    <v-progress-circular
      v-else
      indeterminate
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      color="primary"
    ></v-progress-circular>
    <!-- <div v-else class="">No report found for this id.</div> -->
  </div>
</template>

<script>
export default {
  computed: {
    selectedReport() {
      return this.$store.state.report.selectedReport
    },
    isReportLoading() {
      return this.$store.state.report.reportLoading
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('report/getReport', null)
    next()
  },
}
</script>
