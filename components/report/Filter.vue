<template>
  <div class="">
    <div
      @click="drawer = true"
      class="
        cursor-pointer
        border-2 border-primary-default
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        mb-5
      "
    >
      <v-icon large color="primary"> mdi-filter </v-icon>
      <span class="text-black font-medium ps-2">Toon Filter</span>
    </div>
    <v-navigation-drawer absolute v-model="drawer" :width="filterWidth">
      <v-list class="min-h-screen px-5 pt-8">
        <UiRangeSlider
          @change-values="setWeight"
          :min="weightMin"
          :max="weightMax"
          label="Gewicht (Kg)"
        />
        <UiCombobox :list="yearList" @change-values="setYear" label="Jaar" />
        <UiCombobox
          :list="locationList"
          @change-values="setLocation"
          label="Plaats"
        />
        <UiCombobox :list="baitList" @change-values="setBait" label="Aas" />
        <UiCombobox
          :list="techniqueList"
          @change-values="setTechnique"
          label="Techniek"
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
  },
}
</script>
