<template>
  <v-app dark class="d-flex justify-content-center">

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title class="ml-16">{{ title }}</v-toolbar-title>
      <v-spacer />

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="SnackBarVal"
    >
      {{ SnackBarMsgVal }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="SnackBarVal = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'Bap Ejercicio'
    }
  },computed: {
    ...mapGetters(['SnackBarVal','SnackBarMsgVal']),
  }
}
</script>
