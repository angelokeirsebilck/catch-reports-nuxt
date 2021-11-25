<template>
  <div class="mb-4">
    <v-select
      class="mySelect"
      v-model.trim="value"
      :label="label"
      :items="list"
      outlined
      hide-details=""
      multiple
      chips
      deletable-chips
      @change="changeValues"
    >
      <!-- <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-bind="attrs"
          color="primary"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
        </v-chip>
      </template> -->
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
  },
  data() {
    return {
      value: [],
    }
  },
  computed: {
    filterList() {
      const list = [...this.list]
      return list
    },
  },
  methods: {
    changeValues() {
      this.$emit('change-values', this.value)
    },
  },
}
</script>
