<template>
  <div class="max-w-xll">
    <ValidationObserver v-slot="{ reset }" ref="observer">
      <v-form @submit.prevent="submitForm" @reset.prevent="reset">
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
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-combobox
            v-model.trim="report.general.technique"
            label="Techniek"
            :items="userTechniqueList"
            :error-messages="errors"
            outlined
          ></v-combobox>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-text-field
            v-model.trim="report.general.weight"
            label="Gewicht"
            type="number"
            :error-messages="errors"
            suffix="Kg"
            outlined
          ></v-text-field>
        </ValidationProvider>
        <div class="text-md font-medium mb-4">Locatie</div>
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-combobox
            v-model.trim="report.location.place"
            label="Plaats"
            :items="userLocationList"
            :error-messages="errors"
            @change="placeChanged"
            outlined
          ></v-combobox>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-combobox
            v-model.trim="report.location.spot"
            label="Stek"
            :items="userSpotsForSelectedLocation"
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
      media: [],
      uploadCount: 0,
      report: {
        general: {
          date: null,
          datePicker: false,
          media: [],
          bait: null,
          technique: '',
          weight: '',
        },
        location: {
          place: '',
          spot: '',
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
    userTechniqueList: {
      get() {
        return this.$store.getters['technique/userTechnique']
      },
      set() {},
    },
    userSpotsForSelectedLocation: {
      get() {
        return this.$store.getters['location/userSpotsForSelectedLocation']
      },
      set() {},
    },
    userLocationList: {
      get() {
        return this.$store.getters['location/userLocation']
      },
      set() {},
    },
  },
  methods: {
    placeChanged() {
      this.$store.dispatch(
        'location/setCurrentLocationSpots',
        this.report.location.place
      )
    },
    async submitForm() {
      const observer = this.$refs.observer
      const success = await observer.validate()

      if (!success) {
        for (const key of Object.keys(observer.fields).sort()) {
          if (observer.fields[key].invalid) {
            observer.refs[key].$el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
            return
          }
        }
      }
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
    insertNewUserTechnique(technique) {
      const techniqueObject = {
        name: technique,
      }
      return this.$fire.firestore
        .collection('technique')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userTechniques')
        .doc()
        .set(techniqueObject)
        .then(() => {
          console.log('User technique added.')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    insertNewUserLocation(loc) {
      const locObject = {
        name: loc,
      }
      return this.$fire.firestore
        .collection('location')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userLocations')
        .doc()
        .set(locObject)
        .then(() => {
          console.log('Loc place added.')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    insertNewUserLocationSpot(spot) {
      const locObject = {
        name: spot,
      }
      return this.$fire.firestore
        .collection('location')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userLocations')
        .doc(this.$store.state.location.locationId)
        .collection('locationSpots')
        .doc()
        .set(locObject)
        .then(() => {
          console.log('Spot added for place')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
  },
  watch: {
    async uploadCount() {
      if (this.media.length == this.uploadCount && this.uploadCount !== 0) {
        console.log('all uploaded')

        if (!this.userBaitList.includes(this.report.general.bait)) {
          await this.insertNewUserBait(this.report.general.bait)
        }
        if (!this.userTechniqueList.includes(this.report.general.technique)) {
          await this.insertNewUserTechnique(this.report.general.technique)
        }
        if (!this.userLocationList.includes(this.report.location.place)) {
          await this.insertNewUserLocation(this.report.location.place)
        }
        if (
          !this.userSpotsForSelectedLocation.includes(this.report.location.spot)
        ) {
          console.log('ja?')
          console.log(this.$store.state.location.locationId)
          if (this.$store.state.location.locationId != null) {
            await this.insertNewUserLocationSpot(this.report.location.spot)
          }
        }

        this.$store.dispatch('report/addReport', this.report)
        this.$store.dispatch('bait/getAllBaitFromCurentUser')
        this.$store.dispatch('technique/getAllTechniqueFromCurentUser')
        this.$store.dispatch('location/getAllLocationFromCurentUser')

        this.report = {
          general: {
            date: null,
            datePicker: false,
            media: [],
            bait: null,
            weight: '',
          },
          location: {
            place: '',
            spot: '',
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
        this.media = []
        this.$refs.observer.reset()
      }
    },
  },
  async mounted() {
    // const userBaitList = this.$store.getters['bait/userBait']
    // this.userBaitList = userBaitList
    // const userTechniqueList = this.$store.getters['technique/userTechnique']
    // this.userTechniqueList = userTechniqueList
    // const userLocationList = this.$store.getters['location/userLocation']
    // this.userLocationList = userLocationList
  },
}
</script>
