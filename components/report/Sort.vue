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
      sortList: [
        { text: 'Gewicht hoog-laag', icon: 'mdi-sort-descending' },
        { text: 'Gewicht laag-hoog', icon: 'mdi-sort-ascending' },
        { text: 'Datum nieuw-oud', icon: 'mdi-sort-calendar-ascending' },
        { text: 'Datum oud-nieuw', icon: 'mdi-sort-calendar-descending' },
      ],
    }
  },
  computed: {},
  methods: {
    changeSortCriteria(value) {
      this.$store.commit('report/setSortCriteria', value)
    },
  },
}
</script>
