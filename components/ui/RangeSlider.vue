<template>
  <div class="mb-4">
    <div class="text-base opacity-60">{{ label }}</div>
    <v-range-slider
      v-model="rangeComputed"
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
            :value="rangeComputed[0]"
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
            :value="rangeComputed[1]"
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
    range: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      minComponent: this.range[0],
      maxComponent: this.range[1],
    }
  },
  computed: {
    rangeComputed: {
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
    range() {
      this.minComponent = this.range[0]
      this.maxComponent = this.range[1]
    },
  },
  methods: {
    setMaxValue(event) {
      this.$set(this.range, 1, event)
      this.rangeComputed = [this.minComponent, parseInt(event)]
      this.setParentValues()
    },
    setMinValue(event) {
      this.$set(this.range, 0, event)
      this.rangeComputed = [parseInt(event), this.maxComponent]
      this.setParentValues()
    },
    setParentValues() {
      this.$emit('change-values', this.rangeComputed[0], this.rangeComputed[1])
    },
  },
}
</script>
