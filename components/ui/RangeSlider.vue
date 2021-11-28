<template>
  <div class="mb-4">
    <div class="text-base opacity-60">{{ label }}</div>
    <v-range-slider
      v-model="range"
      :max="max"
      :min="min"
      hide-details
      track-color="gray"
      thumb-label
      class="align-center"
      @change="setParentValues"
    >
      <template v-slot:prepend>
        <div class="hidden md:block">
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
        </div>
      </template>
      <template v-slot:append>
        <div class="hidden md:block">
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
        </div>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
export default {
  emits: ['change-values'],
  props: {
    label: {
      type: String,
      required: true,
    },
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
    // range: {
    //   type: Array,
    //   required: true,
    // },
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
