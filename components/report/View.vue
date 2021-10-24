<template>
  <div class="max-w-7xl mx-auto">
    <swiper
      v-if="report.report.report.general.media.length > 0"
      ref="mySwiper"
      :options="swiperOptions"
      class="h-full"
    >
      <swiper-slide
        v-for="(img, index) in report.report.report.general.media"
        :key="index"
      >
        <v-img :lazy-src="img" :src="img" class="max-h-48"></v-img>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-pagination-bullet {
}
</style>
<script>
export default {
  props: {
    report: Object,
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        autoHeight: true,
        // Some Swiper option/callback...
      },
    }
  },
  computed: {},
  mounted() {},
}
</script>
