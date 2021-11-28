<template>
  <div class="mb-5">
    <UiButton
      label="Filter"
      iconPos="left"
      @click-handler="drawer = true"
      icon="mdi-filter"
      btnStyle="primary-outline"
    />
    <v-navigation-drawer fixed v-model="drawer" :width="filterWidth">
      <v-list class="px-5 pt-8">
        <UiRangeSlider
          @change-values="setWeight"
          :min="weightMin"
          :max="weightMax"
          label="Gewicht (Kg)"
          :range="[weightMinFilter, weightMaxFilter]"
        />
        <UiCombobox
          :list="yearList"
          @change-values="setYear"
          label="Jaar"
          :value="yearsFilter"
        />
        <UiCombobox
          :list="locationList"
          @change-values="setLocation"
          label="Plaats"
          :value="locationsFilter"
        />
        <UiCombobox
          :list="baitList"
          @change-values="setBait"
          label="Aas"
          :value="baitsFilter"
        />
        <UiCombobox
          :list="techniqueList"
          @change-values="setTechnique"
          label="Techniek"
          :value="techniquesFilter"
        />
      </v-list>
      <v-list class="px-5 pt-4" v-if="showClearFilterButton">
        <UiButton
          iconPos="right"
          label="Verwijder alle filters"
          icon="mdi-close-circle"
          btnStyle="primary-outline"
          @click-handler="clearAllFilters"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    filterWidth() {
      if (process.client) {
        const width = window.innerWidth

        if (width > 768) {
          return 600
        }

        return 300
      }

      return 100
    },
    weightMin() {
      return this.$store.state.report.weightRange.min
    },
    weightMax() {
      return this.$store.state.report.weightRange.max
    },
    locationList() {
      return this.$store.getters['location/userLocation']
    },
    baitList() {
      return this.$store.getters['bait/userBait']
    },
    techniqueList() {
      return this.$store.getters['technique/userTechnique']
    },
    yearList() {
      return this.$store.getters['report/allYears']
    },
    locationsFilter() {
      return this.$store.state.report.filters.locations
    },
    yearsFilter() {
      return this.$store.state.report.filters.years
    },
    baitsFilter() {
      return this.$store.state.report.filters.baits
    },
    techniquesFilter() {
      return this.$store.state.report.filters.techniques
    },
    weightMinFilter() {
      return this.$store.state.report.filters.weight.min
    },
    weightMaxFilter() {
      return this.$store.state.report.filters.weight.max
    },
    showClearFilterButton() {
      return this.$store.getters['report/showClearFilterButton']
    },
  },
  methods: {
    changeFilterState() {
      this.filterIsOpen = !this.filterIsOpen
    },
    setWeight(min, max) {
      this.$store.dispatch('report/setWeightFilter', {
        min,
        max,
      })
    },
    setLocation(locations) {
      this.$store.dispatch('report/setLocationFilter', locations)
    },
    setBait(baits) {
      this.$store.commit('report/setBaitsFilter', baits)
    },
    setTechnique(techniques) {
      this.$store.commit('report/setTechniquesFilter', techniques)
    },
    setYear(years) {
      this.$store.commit('report/setYearsFilter', years)
    },
    clearAllFilters() {
      this.$store.commit('report/clearAllFilters')
    },
  },
}
</script>
