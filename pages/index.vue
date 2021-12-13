<template>
  <div
    class="
      max-w-screen-xl
      mx-auto
      justify-start
      align-middle
      w-full
      pa-5
      sticky-end
    "
    :class="[
      reports && reports.length == 1 ? 'pt-5' : '',
      reports && reports.length == 0 ? 'py-5' : '',
    ]"
  >
    <div
      class=""
      v-show="
        this.$store.state.report.reports &&
        this.$store.state.report.reports.length > 1
      "
    >
      <ReportFilter :isOpen="isOpen" v-show="showFilterButton" />
      <div
        class="sticky-nav z-3 pb-5 bg-white w-full"
        :class="[showFilterButton ? 'pt-5' : 'pt-1']"
      >
        <div class="mb-5 w-full">
          <UiButton
            label="Filter"
            iconPos="left"
            @click-handler="setIsOpen(!isOpen)"
            icon="mdi-filter"
            btnStyle="primary-outline"
            v-show="showFilterButton"
          />
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
          v-show="reports && reports.length > 1"
        >
          <ReportSort />
        </div>
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
    <div class="text-md lg:text-5xl text-primary-default" v-else>
      Helaas geen reports gevonden. <br />
      Spendeer meer tijd aan het water of voeg meer reports toe.
    </div>
  </div>
</template>

<script>
let st
export default {
  middleware: ['auth', 'loadReports'],
  computed: {
    reports() {
      return this.$store.getters['report/allReports']
    },
    isOpen() {
      return this.$store.state.filter.isOpen
    },
    showFilterButton() {
      if (this.$store.getters['report/allYears'].length > 1) return true
      if (this.$store.getters['location/userLocation'].length > 0) return true
      if (this.$store.getters['bait/userBait'].length > 0) return true
      if (this.$store.getters['technique/userTechnique'].length > 0) return true
      if (
        this.$store.state.report.filters.weight.min !==
          this.$store.state.report.filters.weight.max &&
        this.$store.state.report.filters.weight.max -
          this.$store.state.report.filters.weight.min !=
          2
      )
        return true
      return false
    },
  },
  methods: {
    reportClickHandler(id) {
      this.$store.commit('loading/setIsLoading', true)
      this.$store.dispatch('report/getReport', id)
      this.$router.push({
        path: `reports/${id}`,
      })
    },
    setIsOpen(value) {
      this.$store.commit('filter/setIsOpen', value)
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
    st = this.$ScrollTrigger.create({
      trigger: '.sticky-nav',
      start: 'top top',
      pin: true,
      endTrigger: '.sticky-end',
      end: 'bottom top',
      scrub: true,
      pinSpacing: false,
    })
    let tl = this.$gsap.timeline()
    tl.scrollTrigger = st
  },
  updated() {
    this.$nextTick(() => {
      st.refresh()

      if (window) {
        window.dispatchEvent(new Event('resize'))
      }
    })
  },
}
</script>
