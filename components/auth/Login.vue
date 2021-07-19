<template>
  <div class="mx-auto">
    <form
      action=""
      @submit.prevent="submitForm"
      class="flex flex-col items-center max-w-md mx-auto"
    >
      <div class="flex-col flex w-full">
        <label for="email">Email</label>
        <input
          v-model.trim="email"
          type="text"
          :class="[v$.email.$error ? errorInputStyle : inputStyle]"
        />
        <div class="error" v-if="!$v.email.required && $v.email.$dirty">
          Email is verplicht.
        </div>
        <div class="error" v-else-if="!$v.email.email && $v.email.$dirty">
          Gelieve een correct email in te vullen.
        </div>
      </div>
      <div class="flex-col flex w-full mt-5">
        <label for="password">Paswoord</label>
        <input v-model.trim="password" type="password" />
      </div>
      <div class="flex-col flex w-full mt-5">
        <button
          class="
            bg-green-600
            hover:bg-green-300
            h-16
            text-white
            font-medium
            uppercase
            transition-colors
          "
        >
          Login
        </button>
      </div>
      <p v-if="error != null" :class="[errorStyle, 'mt-4']">{{ error }}</p>
    </form>
    <div class="max-w-md mx-auto mt-8">
      <p>
        Nog niet registreerd?
        <router-link class="text-green-600" to="/register"
          >Registreer</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      errorStyle: 'text-red-600',
      inputStyle:
        'h-16 focus:ring-1 focus:ring-green-600 focus:outline-green-600 focus:border-green-600 text-base',
      errorInputStyle:
        'h-16 border-red-700 focus:ring-1 focus:ring-red-700 focus:outline-red-700 focus:border-red-700 text-base',
    }
  },
  methods: {
    async submitForm() {
      this.$v.$touch()
      console.log(this.$v.$dirty)
      if (this.$v.$invalid) {
        console.log('Invalid')
      } else {
        // do your submit logic here
        console.log('valid')
      }
    },
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }
  },
  created() {
    console.log(this.$v.$dirty)
  },
}
</script>
