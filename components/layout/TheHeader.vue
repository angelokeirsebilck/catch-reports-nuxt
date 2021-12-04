<template>
  <div class="bg-primary-default h-15">
    <div class="max-w-screen-xl mx-auto">
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
      <v-navigation-drawer fixed v-model="drawer">
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
            <UiButton
              nuxtLink
              label="Home"
              to="/"
              btnStyle="primary"
              @click-handler="closeDrawer"
            />
          </v-list-item>
          <v-list-item class="py-2">
            <UiButton
              nuxtLink
              label="Vangst toevoegen"
              to="/add-report"
              btnStyle="primary"
              @click-handler="closeDrawer"
            />
          </v-list-item>
          <v-list-item class="py-2">
            <UiButton
              label="Log uit"
              btnStyle="primary"
              @click-handler="logout"
            />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
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
    closeDrawer() {
      this.drawer = false
    },
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('auth/setUser', null)
          this.$store.commit('report/clearAll', null)
          this.$store.commit('bait/clearAll', null)
          this.$store.commit('technique/clearAll', null)
          this.$store.commit('location/clearAll', null)
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
}
</script>
