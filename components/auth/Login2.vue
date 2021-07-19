<template>
  <div class="text-base">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        action=""
        @submit.prevent="handleSubmit(submitForm)"
        class="flex flex-col items-center max-w-md mx-auto"
      >
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
          <label for="password">Password</label>
          <ValidationProvider rules="required" v-slot="{ classes, errors }">
            <input v-model.trim="password" type="password" :class="classes" />
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
            Login
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
        Nog niet registreerd?
        <NuxtLink class="text-green-600" to="/register">Registreer</NuxtLink>
      </p>
    </div>
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
      email: '',
      password: '',
      errorStyle: 'text-red-600',
      error: null,
    }
  },
  methods: {
    async submitForm() {
      try {
        const createUser = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        const user = await createUser
      } catch (error) {
        this.error = FirebaseErrors[error.code] || error.message
      }
    },
  },
}
</script>
