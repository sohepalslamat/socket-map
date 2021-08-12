<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-layout>
          <nuxt />
        </v-layout>
      </v-container>
      <v-footer app inset>
        <v-spacer></v-spacer>
        <div class="overline">
          Built with <v-icon small color="pink">mdi-heart</v-icon> <a class="text-decoration-none" target="_blank">Mgs Software</a>
        </div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
