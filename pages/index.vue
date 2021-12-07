<template>
  <div
    class="
      max-w-screen-xl
      mx-auto
      justify-start
      align-middle
      w-full
      pa-5
      pt-0
      sticky-end
    "
  >
    <ReportFilter :isOpen="isOpen" />
    <div class="sticky-nav z-3 pb-5 pt-5 bg-white">
      <div class="mb-5">
        <UiButton
          label="Filter"
          iconPos="left"
          @click-handler="setIsOpen(!isOpen)"
          icon="mdi-filter"
          btnStyle="primary-outline"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
      Helaas geen reports gevonden. Spendeer meer tijd aan het water.
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
