<template>
  <div class="max-w-7xl mx-auto relative">
    <div class="absolute top-2 right-2 z-10" @click="editHandler">
      <div
        class="
          border-3
          cursor-pointer
          flex
          items-center
          justify-center
          border-white
          rounded-full
          p-1
        "
      >
        <v-icon color="white"> mdi-pencil </v-icon>
      </div>
    </div>

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
      :src="reportComputed.general.media[0].url"
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
      :src="img.url"
      sizes="sm:100vw md:100vw lg:100vw"
      format="webp"
      class="
        md:group-hover:scale-105
        transform
        transition-all
        z-0
        invisible
        hidden
      "
      data-fancybox="gallery"
    />
    <!-- </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->

    <div class="text-md font-medium mb-2 mt-3">Algemeen</div>
    <ReportValue
      name="Datum"
      :value="formatDate"
      v-if="reportComputed.general.date"
    />
    <ReportValue
      name="Aas"
      :value="reportComputed.general.bait"
      v-if="reportComputed.general.bait"
    />
    <ReportValue
      name="Techniek"
      :value="reportComputed.general.technique"
      v-if="reportComputed.general.technique"
    />
    <ReportValue
      name="Gewicht"
      :value="reportComputed.general.weight"
      suffix="Kg"
      v-if="reportComputed.general.weight"
    />
    <ReportValue
      name="Exrta Informatie"
      :value="reportComputed.general.extraInf"
      v-if="reportComputed.general.extraInf"
    />
    <div class="" v-if="showLocationInfo">
      <div class="text-md font-medium mb-2 mt-3">Locatie</div>
      <ReportValue
        name="Plaats"
        :value="reportComputed.location.place"
        v-if="reportComputed.location.place"
      />
      <ReportValue
        name="Spot"
        :value="reportComputed.location.spot"
        v-if="reportComputed.location.spot"
      />
    </div>

    <div class="" v-if="showWeatherInfo">
      <div class="text-md font-medium mb-2 mt-3">Weer Informatie</div>
      <ReportValue
        name="Beschrijving"
        :value="reportComputed.weatherInformation.description"
        v-if="reportComputed.weatherInformation.description"
      />
      <ReportValue
        name="Temperatuur"
        :value="reportComputed.weatherInformation.temp"
        v-if="reportComputed.weatherInformation.temp"
        suffix="°C"
      />
      <ReportValue
        name="Gevoelstemperatuur"
        :value="reportComputed.weatherInformation.feelsLike"
        v-if="reportComputed.weatherInformation.feelsLike"
        suffix="°C"
      />
      <ReportValue
        name="Vochtigheid"
        :value="reportComputed.weatherInformation.humidity"
        v-if="reportComputed.weatherInformation.humidity"
      />
      <ReportValue
        name="Druk"
        :value="reportComputed.weatherInformation.pressure"
        v-if="reportComputed.weatherInformation.pressure"
        suffix="bar"
      />

      <ReportValue
        name="Windrichting"
        :value="reportComputed.weatherInformation.windDirection"
        v-if="reportComputed.weatherInformation.windDirection"
      />
      <ReportValue
        name="Windsnelheid"
        :value="reportComputed.weatherInformation.windSpeed"
        v-if="reportComputed.weatherInformation.windSpeed"
        suffix="Bft"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
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
  methods: {
    editHandler() {
      this.$store.dispatch('report/getReport', this.report.id)
      this.$router.push({
        path: `/update-report`,
      })
    },
  },
  computed: {
    formatDate() {
      const newDate = new Date(this.report.report.report.general.date)
      return `${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`
    },
    hiddenFancyBoxImages() {
      const reports = [...this.report.report.report.general.media]
      return reports.slice(1)
    },
    reportComputed() {
      return this.report.report.report
    },
    showLocationInfo() {
      if (
        this.reportComputed.location.place !== null ||
        this.reportComputed.location.spot !== null
      )
        return true

      return false
    },
    showWeatherInfo() {
      if (
        this.reportComputed.weatherInformation.description !== null ||
        this.reportComputed.weatherInformation.temp !== null ||
        this.reportComputed.weatherInformation.feelsLike !== null ||
        this.reportComputed.weatherInformation.humidity !== null ||
        this.reportComputed.weatherInformation.pressure !== null ||
        this.reportComputed.weatherInformation.windSpeed !== null ||
        this.reportComputed.weatherInformation.windDirection !== null
      )
        return true

      return false
    },
  },
  mounted() {},
}
</script>
