<template>
  <div class="text-base mb-1 grid grid-cols-2 gap-2">
    <div class="">{{ name }}</div>
    <div class="">{{ value }} {{ suffix }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number, Date],
      required: true,
    },
    suffix: {
      type: String,
    },
  },
}
</script>
