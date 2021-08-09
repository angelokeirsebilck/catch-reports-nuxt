<template>
  <div class="max-w-screen-xl mx-auto w-full pa-5">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <ValidationProvider
          name="date"
          rules="required"
          v-slot="{ errors }"
          mode="eager"
        >
          <v-menu
            ref="datePicker"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Datum"
                name="date"
                v-model="date"
                readonly
                outlined
                v-bind="attrs"
                :error-messages="errors[0]"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.datePicker.save(null)"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.datePicker.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </ValidationProvider>

        <button class="primary white--text px-6 py-2 uppercase font-medium">
          Toevoegen
        </button>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      windDirectionItems: ['Noord', 'Noord-Osst', 'Oost'],
      date: null,
      datePicker: false,
      textDate: null,
      password: null,
    }
  },
}
</script>
