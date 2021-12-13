<template>
  <div class="text-base max-w-xl mx-auto px-4 mt-5 h-auto self-center w-full">
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form
        action=""
        @submit.prevent="handleSubmit(submitForm)"
        class="flex flex-col items-center w-full"
      >
        <div class="flex-col flex w-full mt-2">
          <ValidationProvider rules="required" v-slot="{ errors }" mode="eager">
            <v-text-field
              v-model.trim="name"
              label="Naam"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-2">
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors }"
            mode="eager"
          >
            <v-text-field
              v-model.trim="email"
              label="E-mail"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-2">
          <ValidationProvider
            rules="required"
            vid="password"
            v-slot="{ errors }"
            mode="eager"
          >
            <v-text-field
              type="password"
              v-model.trim="password.password"
              label="Paswoord"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-2">
          <ValidationProvider
            rules="required|confirmed:password"
            v-slot="{ errors }"
            mode="eager"
          >
            <v-text-field
              type="password"
              v-model.trim="password.confirm"
              label="Herhaal paswoord"
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-2">
          <UiButton label="Registreer" btnStyle="primary" />
        </div>
      </v-form>
      <p v-if="error != null" :class="[errorStyle, 'my-3 text-left d mx-auto']">
        {{ error }}
      </p>
    </ValidationObserver>
    <div :class="['mx-auto', error ? ' mt-0' : ' mt-8']">
      <p>
        Al geregistreerd?
        <v-hover v-slot="{ hover }">
          <NuxtLink
            class="text-green-600 duration-300"
            to="/login"
            :class="[hover ? linkHoverClass : '']"
            >Login</NuxtLink
          >
        </v-hover>
      </p>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import FirebaseErrors from '../../utils/firebase/firebaseErrors'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: '',
      name: '',
      password: {
        password: '',
        confirm: '',
      },
      errorStyle: 'text-error',
      error: null,
    }
  },
  computed: {
    linkHoverClass() {
      return 'primary--text text--lighten-1'
    },
  },
  methods: {
    async submitForm() {
      this.$store.commit('loading/setIsLoading', true)
      try {
        const createUser = await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password.password
        )
        const newUser = await createUser

        if (newUser) {
          this.$fire.firestore
            .collection('users')
            .doc(this.$fire.auth.currentUser.uid)
            .set({
              name: this.name,
              email: this.email,
            })

          this.$store.dispatch('auth/setUser', {
            name: this.name,
            email: this.email,
          })
        }
      } catch (error) {
        console.log(error.code)
        this.error = FirebaseErrors[error.code] || error.message
        this.$store.commit('loading/setIsLoading', false)
      }
    },
  },
}
</script>
