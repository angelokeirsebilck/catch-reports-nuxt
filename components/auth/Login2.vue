<template>
  <div class="text-base max-w-xl px-4 mt-5 h-auto self-center w-full">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        action=""
        @submit.prevent="handleSubmit(submitForm)"
        class="flex flex-col items-center w-full"
      >
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
          <ValidationProvider rules="required" v-slot="{ errors }" mode="eager">
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              v-model.trim="password"
              label="Paswoord"
              :error-messages="errors"
              outlined
              @click:append="show = !show"
            ></v-text-field>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-2">
          <UiButton label="Login" btnStyle="primary" />
        </div>
      </form>
      <p
        v-if="error != null"
        :class="[errorStyle, 'mt-4 text-left max-w-md mx-auto']"
      >
        {{ error }}
      </p>
    </ValidationObserver>

    <div class="mt-3">
      <p>
        Nog niet geregistreerd?
        <v-hover v-slot="{ hover }">
          <NuxtLink
            class="text-green-600 duration-300"
            to="/register"
            :class="[hover ? linkHoverClass : '']"
            >Registreer</NuxtLink
          >
        </v-hover>
      </p>
    </div>
  </div>
</template>

<style></style>
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
      password: '',
      errorStyle: 'text-red-600',
      error: null,
      show: false,
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
        const createUser = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        const user = await createUser
      } catch (error) {
        this.error = FirebaseErrors[error.code] || error.message
        this.$store.commit('loading/setIsLoading', false)
      }
    },
  },
}
</script>
