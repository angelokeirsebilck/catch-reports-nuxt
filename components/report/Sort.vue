<template>
  <div class="">
    <UiSortCombobox
      label="Sorteer"
      :items="sortList"
      @change-value="changeSortCriteria"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortKg: 'desc',
      sortDate: 'desc',
      value: 'Gewicht oplopend',
    }
  },
  computed: {
    sortList() {
      if (
        this.$store.state.report.filters.weight.min !==
          this.$store.state.report.filters.weight.max &&
        this.$store.state.report.filters.weight.max -
          this.$store.state.report.filters.weight.min !=
          2
      ) {
        return [
          { text: 'Gewicht hoog-laag', icon: 'mdi-sort-descending' },
          { text: 'Gewicht laag-hoog', icon: 'mdi-sort-ascending' },
          { text: 'Datum nieuw-oud', icon: 'mdi-sort-calendar-ascending' },
          { text: 'Datum oud-nieuw', icon: 'mdi-sort-calendar-descending' },
        ]
      } else {
        return [
          { text: 'Datum nieuw-oud', icon: 'mdi-sort-calendar-ascending' },
          { text: 'Datum oud-nieuw', icon: 'mdi-sort-calendar-descending' },
        ]
      }
    },
  },
  methods: {
    changeSortCriteria(value) {
      this.$store.commit('report/setSortCriteria', value)
    },
  },
}
</script>
