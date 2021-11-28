<template>
  <div class="max-w-screen-xl mx-auto justify-start align-middle w-full pa-5">
    <div v-if="selectedReport != null" class="max-w-7xl mx-auto">
      <ReportUpdate :oldReport="selectedReport" />
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
  </div>
</template>
<style></style>
<script>
export default {
  props: {},
  data() {
    return {}
  },
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
