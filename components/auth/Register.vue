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
          <button
            class="
              bg-primary-default
              hover:bg-primary-lighter1
              h-5
              text-white
              font-medium
              uppercase
              transition-colors
            "
          >
            Registreer
          </button>
        </div>
      </v-form>
      <p
        v-if="error != null"
        :class="[errorStyle, 'mt-4 text-left max-w-md mx-auto']"
      >
        {{ error }}
      </p>
    </ValidationObserver>
    <div class="max-w-md mx-auto mt-8">
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
      errorStyle: 'text-red-600',
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
        this.error = FirebaseErrors[error.code] || error.message
      }
    },
  },
}
</script>
