<template>
  <div class="max-w-xll">
    <ValidationObserver v-slot="{ handleSubmit, reset }" ref="observer">
      <v-form @submit.prevent="handleSubmit(submitForm)" @reset.prevent="reset">
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
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-file-input
            v-model="media"
            label="Media"
            accept="image/*"
            :error-messages="errors"
            append-icon="mdi-camera"
            prepend-icon=""
            chips
            multiple
            outlined
          ></v-file-input>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-combobox
            v-model.trim="report.general.bait"
            label="Aas"
            :items="userBaitList"
            :error-messages="errors"
            outlined
          ></v-combobox>
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
      // userBaitList: [],
      media: [],
      uploadCount: 0,
      report: {
        general: {
          date: null,
          datePicker: false,
          media: [],
          bait: null,
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
  computed: {
    userBaitList: {
      get() {
        return this.$store.getters['bait/userBait']
      },
      set() {},
    },
  },
  methods: {
    async submitForm() {
      this.uploadImage(this.media)
    },
    async uploadImage(media) {
      Promise.all(
        // Array of "Promises"
        media.map((image) => this.putStorageItem(image))
      )
        .then((url) => {
          console.log(`All success`)
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message)
        })
    },
    putStorageItem(item) {
      const childPath = `report/${
        this.$fire.auth.currentUser.uid
      }/${Math.random().toString(36)}`

      // the return value will be a Promise
      return this.$fire.storage
        .ref()
        .child(childPath)
        .put(item)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.report.general.media.push(url)
            this.uploadCount += 1
          })
          console.log('One success:')
        })
        .catch((error) => {
          console.log('One failed:', item, error.message)
        })
    },
    insertNewUserBait(bait) {
      const baitObject = {
        name: bait,
      }
      return this.$fire.firestore
        .collection('bait')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userBaits')
        .doc()
        .set(baitObject)
        .then(() => {
          console.log('User bait added.')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
  },
  watch: {
    async uploadCount() {
      if (this.media.length == this.uploadCount) {
        console.log('all uploaded')

        if (!this.userBaitList.includes(this.report.general.bait)) {
          await this.insertNewUserBait(this.report.general.bait)
        }

        this.$store.dispatch('report/addReport', this.report)
        this.$store.dispatch('bait/getAllBaitFromCurentUser')
        this.media = []

        this.report = {
          general: {
            date: null,
            datePicker: false,
            media: [],
            bait: null,
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
        }
        this.uploadCount = 0
        this.$refs.observer.reset()
      }
    },
  },
  mounted() {
    const userBaitList = this.$store.getters['bait/userBait']
    this.userBaitList = userBaitList
  },
}
</script>
