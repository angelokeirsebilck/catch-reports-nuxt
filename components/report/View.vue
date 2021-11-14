<template>
  <div class="max-w-7xl mx-auto">
    <!-- <swiper
      v-if="report.report.report.general.media.length > 0"
      ref="mySwiper"
      :options="swiperOptions"
      class="h-full"
    >
      <swiper-slide
        v-for="(img, index) in report.report.report.general.media"
        :key="index"
        class="cursor-pointer"
      > -->
    <nuxt-img
      :src="report.report.report.general.media[0]"
      sizes="sm:100vw md:100vw lg:100vw"
      format="webp"
      class="
        md:group-hover:scale-105
        transform
        transition-all
        z-0
        block
        cursor-pointer
      "
      data-fancybox="gallery"
    />
    <nuxt-img
      v-for="(img, index) in hiddenFancyBoxImages"
      :key="index"
      :src="img"
      sizes="sm:100vw md:100vw lg:100vw"
      format="webp"
      class="
        md:group-hover:scale-105
        transform
        transition-all
        z-0
        block
        invisible
        hidden
      "
      data-fancybox="gallery"
    />
    <!-- </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
  </div>
</template>

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
  computed: {
    hiddenFancyBoxImages() {
      const reports = [...this.report.report.report.general.media]
      return reports.slice(1)
    },
  },
  mounted() {},
}
</script>
