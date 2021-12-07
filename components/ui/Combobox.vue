<template>
  <div class="mb-4">
    <v-select
      class="mySelect"
      v-model.trim="valueData"
      :label="label"
      :items="list"
      outlined
      hide-details=""
      multiple
      chips
      deletable-chips
      @change="changeValues"
    >
    </v-select>
  </div>
</template>
<style lang="scss" scoped>
.mySelect::v-deep .v-chip {
  /* chip background color */
  background-color: var(--v-primary-base) !important;

  /* chip text color */
  color: white;

  /* chip X color */
  button {
    color: white;
  }
}
</style>
<script>
export default {
  emits: ['change-value'],
  props: {
    list: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      valueData: this.value,
    }
  },
  computed: {
    filterList() {
      const list = [...this.list]
      return list
    },
  },
  watch: {
    value() {
      this.valueData = this.value
    },
  },
  methods: {
    changeValues() {
      this.$emit('change-values', this.valueData)
    },
  },
  mounted() {
    console.log('combobox mounted')
  },
}
</script>
