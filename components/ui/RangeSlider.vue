<template>
  <div>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      hide-details
      track-color="gray"
      class="align-center"
      @change="setParentValues"
    >
      <template v-slot:prepend>
        <v-text-field
          :value="range[0]"
          hide-details
          single-line
          outlined
          :suffix="suffix"
          :min="min"
          :max="max"
          type="number"
          @change="(value) => setMinValue(value)"
        ></v-text-field>
      </template>
      <template v-slot:append>
        <v-text-field
          :value="range[1]"
          hide-details
          single-line
          outlined
          :min="min"
          :suffix="suffix"
          type="number"
          :max="max"
          @change="(value) => setMaxValue(value)"
        ></v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
export default {
  emits: ['change-values'],
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
    },
  },
  data() {
    return {
      minComponent: this.min,
      maxComponent: this.max,
    }
  },
  computed: {
    // range() {
    //   return [this.minComponent, this.maxComponent]
    // },
    range: {
      get() {
        return [this.minComponent, this.maxComponent]
      },
      set(array) {
        this.minComponent = array[0]
        this.maxComponent = array[1]
      },
    },
  },
  watch: {
    min() {
      this.minComponent = this.min
    },
    max() {
      this.maxComponent = this.max
    },
  },
  methods: {
    setMaxValue(event) {
      this.$set(this.range, 1, event)
      // this.range[1] = parseInt(event)
      this.range = [this.minComponent, parseInt(event)]
      this.setParentValues()
    },
    setMinValue(event) {
      this.$set(this.range, 0, event)
      // this.range[0] = parseInt(event)
      this.range = [parseInt(event), this.maxComponent]
      this.setParentValues()
    },
    setParentValues() {
      this.$emit('change-values', this.range[0], this.range[1])
    },
  },
}
</script>
