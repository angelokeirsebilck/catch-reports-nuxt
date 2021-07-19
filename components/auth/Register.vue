<template>
  <div class="mx-auto text-base">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        action=""
        @submit.prevent="handleSubmit(submitForm)"
        class="flex flex-col items-center max-w-md mx-auto"
      >
        <div class="flex-col flex w-full mt-5">
          <label for="name">Naam</label>
          <ValidationProvider rules="required" v-slot="{ classes, errors }">
            <input v-model.trim="name" type="text" :class="classes" />
            <div :class="errorStyle">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-5">
          <label for="email">Email</label>
          <ValidationProvider
            rules="required|email"
            v-slot="{ classes, errors }"
          >
            <input v-model.trim="email" type="text" :class="classes" />
            <div :class="errorStyle">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-5">
          <label for="password">Paswoord</label>
          <ValidationProvider
            rules="required"
            vid="confirmation"
            v-slot="{ classes, errors }"
          >
            <input
              v-model.trim="password.password"
              type="password"
              :class="classes"
            />
            <div :class="errorStyle">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="flex-col flex w-full mt-5">
          <label for="password">Bevestig paswoord</label>
          <ValidationProvider
            rules="required|confirmed:confirmation"
            v-slot="{ classes, errors }"
          >
            <input
              v-model.trim="password.confirm"
              type="password"
              :class="classes"
            />
            <div :class="errorStyle">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
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
            Registreer
          </button>
        </div>
      </form>
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
        <NuxtLink class="text-green-600" to="/login">Login</NuxtLink>
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
