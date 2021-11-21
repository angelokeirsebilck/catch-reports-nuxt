<template>
  <div class="max-w-7xl">
    <UiCombobox :list="locationList" @change-values="setLocation" />
    <UiRangeSlider
      @change-values="setWeight"
      :min="weightMin"
      :max="weightMax"
      suffix="Kg"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    weightMin() {
      return this.$store.state.report.weightRange.min
    },
    weightMax() {
      return this.$store.state.report.weightRange.max
    },
    locationList() {
      return this.$store.getters['location/userLocation']
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
  },
}
</script>
