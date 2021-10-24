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
            <v-date-picker
              v-model="report.general.date"
              scrollable
              :max="dateNow"
            >
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
        <ValidationProvider v-slot="{ errors }" mode="eager">
          <v-textarea
            v-model.trim="report.general.extraInf"
            label="Extra Informatie"
            :error-messages="errors"
            outlined
          ></v-textarea>
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
              label="Windsnelheid"
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
              label="Windrichting"
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
      windDirectionItems: [
        'Noord',
        'Noord-Oost',
        'Oost',
        'Zuid-Oost',
        'Zuid',
        'Zuid-West',
        'West',
        'Noord-West',
      ],
      media: [],
      uploadCount: 0,
      noImagesSelected: false,
      report: {
        general: {
          date: null,
          media: [],
          bait: null,
          technique: null,
          weight: null,
          extraInf: null,
        },
        location: {
          place: null,
          spot: null,
        },
        weatherInformation: {
          description: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null,
          windSpeed: null,
          windDirection: null,
        },
      },
    }
  },
  computed: {
    dateNow() {
      const today = new Date()
      return (
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      )
    },
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
      if (this.media.length > 0) {
        this.uploadImages(this.media)
      } else {
        this.addReport()
      }
    },
    async addReport() {
      if (
        !this.userBaitList.includes(this.report.general.bait) &&
        this.report.general.bait !== null
      ) {
        await this.insertNewUserBait(this.report.general.bait)
      }
      if (
        !this.userTechniqueList.includes(this.report.general.technique) &&
        this.report.general.technique !== null
      ) {
        await this.insertNewUserTechnique(this.report.general.technique)
      }
      if (
        !this.userLocationList.includes(this.report.location.place) &&
        this.report.location.place !== null
      ) {
        await this.insertNewUserLocation(this.report.location.place)
      }
      if (
        !this.userSpotsForSelectedLocation.includes(
          this.report.location.spot
        ) &&
        this.report.general.spot !== null
      ) {
        if (this.$store.state.location.locationId != null) {
          await this.insertNewUserLocationSpot(this.report.location.spot)
        }
      }

      this.$store.dispatch('report/addReport', this.report)
      this.$store.dispatch('bait/getAllBaitFromCurentUser')
      this.$store.dispatch('technique/getAllTechniqueFromCurentUser')
      this.$store.dispatch('location/getAllLocationFromCurentUser')

      this.newAddedItemsIdList = {
        bait: null,
        technique: null,
        place: null,
        spot: null,
      }

      this.report = {
        general: {
          date: null,
          datePicker: false,
          media: [],
          bait: null,
          weight: null,
          technique: null,
          extraInf: null,
        },
        location: {
          place: null,
          spot: null,
        },
        weatherInformation: {
          description: null,
          temp: null,
          feelsLike: null,
          pressure: null,
          humidity: null,
          windSpeed: null,
          windDirection: null,
        },
      }
      this.uploadCount = 0
      this.media = []
      this.noImagesSelected = false
      this.$refs.observer.reset()
    },
    async uploadImages(media) {
      Promise.all(
        // Array of "Promises"
        media.map((image) => this.putStorageItem(image))
      )
        .then((url) => {
          console.log(`All images uploaded success`)
          this.addReport()
        })
        .catch((error) => {
          console.log(`Some images uploading failed: `, error.message)
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
          })
          console.log('One img uploaded.')
        })
        .catch((error) => {
          console.log('One img failed uploading:', item, error.message)
        })
    },
    insertNewUserBait(bait) {
      const baitObject = {
        name: bait,
      }
      return this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userBaits')
        .doc()
        .set({
          createdAt: this.$fireModule.firestore.Timestamp.now(),
          baitObject,
        })
        .then((doc) => {
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
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userTechniques')
        .doc()
        .set({
          createdAt: this.$fireModule.firestore.Timestamp.now(),
          techniqueObject,
        })
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
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userLocations')
        .add({
          createdAt: this.$fireModule.firestore.Timestamp.now(),
          locObject,
        })
        .then((doc) => {
          console.log('Loc place added.')
          if (
            !this.userSpotsForSelectedLocation.includes(
              this.report.location.spot
            ) &&
            this.report.general.spot !== null
          ) {
            this.insertNewUserLocationSpot(this.report.location.spot, doc.id)
          }
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
    insertNewUserLocationSpot(spot, locId = null) {
      const locObject = {
        name: spot,
      }

      const locationDocIc =
        locId == null ? this.$store.state.location.locationId : locId
      return this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('userLocations')
        .doc(locationDocIc)
        .collection('userLocationSpots')
        .add({
          createdAt: this.$fireModule.firestore.Timestamp.now(),
          locObject,
        })
        .then(() => {
          console.log('Spot added for place')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    },
  },
}
</script>
