<template>
  <div :class="[noImageClass, 'overflow-hidden']">
    <img
      class="
        object-cover
        md:group-hover:scale-105
        transform
        w-full
        h-32
        relative
        transition-all
        z-0
      "
      v-if="report.general.media.length > 0"
      e
      :src="report.general.media[0]"
    />
    <img
      v-else
      class="h-full"
      src="/catch-reports-logo.svg"
      alt="Catch Reports Logo"
    />
    <!-- <nuxt-picture
          v-if="report.report.general.media.length > 0"
          :src="report.report.general.media[0]"
        /> -->
    <!-- <div class="" v-if="report.general.media.length > 0">test</div>
         -->
    <div
      v-if="
        report.location.place || report.location.spot || report.general.weight
      "
      class="
        opacity-70
        md:opacity-0 md:group-hover:opacity-100
        absolute
        bottom-0
        left-0
        w-full
        h-auto
        z-20
        bg-primary-default
        text-white
        transition-all
        p-2
      "
    >
      <div
        v-if="report.location.place"
        class="font-semibold text-md leading-none mb-1"
      >
        {{ report.location.place }}
      </div>
      <div v-if="report.location.spot" class="font-light leading-none mb-3">
        {{ report.location.spot }}
      </div>
      <div v-if="report.general.weight" class="font-normal leading-none">
        {{ report.general.weight }} Kg
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    report: Object,
  },
  computed: {
    noImageClass() {
      if (this.report.general.media.length == 0) {
        return 'flex justify-center items-center bg-primary-default opacity-20 h-full p-8'
      }
      return ''
    },
  },
}
</script>
