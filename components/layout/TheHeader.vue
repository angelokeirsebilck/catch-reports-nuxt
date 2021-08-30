<template>
  <!-- <div class="bg-primary-default h-11">
    <div class="max-w-screen-xl h-full w-full mx-auto align-middle">
      
    </div>
  </div> -->
  <div class="bg-primary-default h-15">
    <div class="max-w-screen-xl mx-auto">
      <!-- <v-app-bar color="primary" class="py-4" dark height="auto">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" class="pa-0 flex align-middle justify-center">
              <NuxtLink
                nuxt
                to="/"
                class="primary white--text px-6 py-2 uppercase font-medium"
              >
                <img class="header-img" src="/catch-reports-logo.svg" />
              </NuxtLink>
            </v-col>
            <v-col
              v-if="isAuthenticated"
              cols="6"
              class="pa-0 d-flex align-center"
            >
              <v-app-bar-nav-icon @click="drawer = true">
                <template v-slot>
                  <slot>
                    <v-icon light x-large color="white"> mdi-text </v-icon>
                  </slot>
                </template>
              </v-app-bar-nav-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar> -->
      <v-app-bar color="primary" class="py-4 pb-2" dark height="auto">
        <div class="d-flex flex-column w-full align-center">
          <NuxtLink
            nuxt
            to="/"
            class="primary white--text px-6 py-2 uppercase font-medium"
          >
            <img class="header-img" src="/catch-reports-logo.svg" />
          </NuxtLink>
          <v-app-bar-nav-icon
            v-if="isAuthenticated"
            class="align-self-start"
            x-large
            @click="drawer = true"
          >
            <template v-slot>
              <slot>
                <v-icon light x-large color="white"> mdi-text </v-icon>
              </slot>
            </template>
          </v-app-bar-nav-icon>
        </div>
      </v-app-bar>
      <v-navigation-drawer absolute v-model="drawer">
        <v-list class="min-h-screen">
          <v-list-item class="d-flex flex-column align-start">
            <v-list-item-avatar class="primary align-self-start mx-0">
              {{ firstLetterName }}
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content v-if="user">
              {{ user.email }}
            </v-list-item-content>
          </v-list-item>
          <v-divider class=""></v-divider>
          <v-list-item class="py-2 mt-2">
            <NuxtLink
              nuxt
              to="/"
              class="primary white--text px-5 py-2 uppercase font-semibold"
            >
              Home
            </NuxtLink>
          </v-list-item>
          <v-list-item class="py-2">
            <NuxtLink
              nuxt
              to="/add-report"
              class="primary white--text px-5 py-2 uppercase font-semibold"
            >
              Vangst toevoegen
            </NuxtLink>
          </v-list-item>
          <v-list-item class="py-2">
            <button
              @click="logout"
              class="primary white--text px-5 py-2 uppercase font-semibold"
            >
              Log uit
            </button>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>

  <!-- <v-container class="pt-0">
    <v-col cols="12 pt-0">
      <v-app-bar color="primary" dark height="110">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>
      </v-app-bar>
    </v-col>
  </v-container> -->
</template>
<style>
.header-img {
  width: 20rem;
}

.v-app-bar__nav-icon {
  transform: translateX(-10px);
}
</style>
<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/setUser', null)
          console.log('Sign Out Succes.')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    firstLetterName() {
      if (this.$store.getters['auth/user']) {
        const user = this.$store.getters['auth/user']
        return user.name.charAt(0)
      }
    },
    user() {
      return this.$store.getters['auth/user']
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  // created() {
  //   if (this.$store.state.auth.user) {
  //     this.user = this.$store.state.auth.user
  //   }
  // },
}
</script>
