<template>
  <div></div>
</template>

<script>
export default {
  props: {
    report: Object,
  },

  created() {
    console.log(this.$nuxt._route.params)
  },
}
</script>
