<template>
  <div class="">
    <!-- <UiButton
      label="Filter"
      iconPos="left"
      @click-handler="drawer = true"
      icon="mdi-filter"
      btnStyle="primary-outline"
    /> -->
    <v-navigation-drawer
      class="z-100"
      fixed
      v-model="drawer"
      :width="filterWidth"
    >
      <v-list class="px-5 pt-8">
        <UiRangeSlider
          v-show="showWeightFilter"
          @change-values="setWeight"
          :min="weightMin"
          :max="weightMax"
          label="Gewicht (Kg)"
          :range="[weightMinFilter, weightMaxFilter]"
        />
        <UiCombobox
          v-if="yearList.length > 1"
          :list="yearList"
          @change-values="setYear"
          label="Jaar"
          :value="yearsFilter"
        />
        <UiCombobox
          v-if="locationList.length > 0"
          :list="locationList"
          @change-values="setLocation"
          label="Plaats"
          :value="locationsFilter"
        />
        <UiCombobox
          v-if="baitList.length > 0"
          :list="baitList"
          @change-values="setBait"
          label="Aas"
          :value="baitsFilter"
        />
        <UiCombobox
          v-if="techniqueList.length > 0"
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
import vClickOutside from 'v-click-outside'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      drawer: false,
      initialClick: false,
    }
  },
  watch: {
    isOpen() {
      this.drawer = this.isOpen
    },
    drawer() {
      if (!this.drawer) {
        this.$store.commit('filter/setIsOpen', false)
      }
    },
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
    showWeightFilter() {
      if (
        this.$store.state.report.filters.weight.min !=
        this.$store.state.report.filters.weight.max
      )
        return true

      return false
    },
  },
  methods: {
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
  mounted() {
    console.log('filter mounted')
  },
}
</script>
