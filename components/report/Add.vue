<template>
  <div class="max-w-xll">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <div class="text-md font-medium mb-4">Algemeen</div>
        <ValidationProvider
          name="date"
          rules="required"
          v-slot="{ errors }"
          mode="eager"
        >
          <v-menu
            ref="datePicker"
            :close-on-content-click="false"
            :return-value.sync="report.general.date"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Datum"
                name="date"
                class="h-full"
                v-model="report.general.date"
                readonly
                outlined
                v-bind="attrs"
                :error-messages="errors[0]"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="report.general.date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.datePicker.save(null)"
                >Cancel</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.datePicker.save(report.general.date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </ValidationProvider>
        <div class="text-md font-medium mb-4">Weer Informatie</div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.description"
              label="Beschrijving"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.temp"
              label="Temperatuur"
              :error-messages="errors"
              outlined
              suffix="°C"
              type="number"
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.feelsLike"
              label="Gevoelstemperatuur"
              :error-messages="errors"
              outlined
              suffix="°C"
              type="number"
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.pressure"
              label="Druk"
              type="number"
              :error-messages="errors"
              outlined
              suffix="bar"
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.humidity"
              label="Vochtigheid"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="report.weatherInformation.windSpeed"
              label="Wind snelheid"
              :error-messages="errors"
              outlined
              suffix="Bft"
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="">
          <ValidationProvider v-slot="{ errors }" mode="eager">
            <v-select
              v-model.trim="report.weatherInformation.windDirection"
              :items="windDirectionItems"
              :error-messages="errors"
              label="Wind richting"
              outlined
            ></v-select>
          </ValidationProvider>
        </div>
        <button class="primary white--text px-5 py-2 uppercase font-semibold">
          Toevoegen
        </button>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<style>
.v-text-field input {
  height: 100%;
}
</style>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      windDirectionItems: ['Noord', 'Noord-Oost', 'Oost'],
      report: {
        general: {
          date: null,
          datePicker: false,
          textDate: null,
        },
        weatherInformation: {
          description: '',
          temp: '',
          feelsLike: '',
          pressure: '',
          humidity: '',
          windSpeed: '',
          windDirection: '',
        },
      },
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('report/addReport', this.report)
    },
  },
}
</script>
