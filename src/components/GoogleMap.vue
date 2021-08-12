<template>
  <v-row>
    <v-col
      cols="12"
      class="pa-1"
    >
      <div class="text-center">
        <h3>searchOnMap <v-icon>mdi-magnify</v-icon></h3>
        <gmap-autocomplete
          id="search"
          class="mb-2 mt-1 text-center"
          @place_changed="setPlace"
        >
        </gmap-autocomplete>
      </div>
      <GmapMap
        ref="mapRef"
        :center="mapCoordinates"
        :zoom="zoom"
        :options="{
          zoomControl: true,
          scaleControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: true
        }"
        style="width: 100%; height: 500px"
      >
        <gmap-marker
          :position="mapCoordinates"
          :clickable="true"
          :draggable="true"
          @dragend="gMapFunc($event.latLng)"
        ></gmap-marker>
      </GmapMap>
    </v-col>
    <v-col
      cols="12"
    >
      <v-row>
        <v-col
          cols="6"
          xl="12"
          lg="12"
          md="12"
          sm="12"
          class="text-center"
        >
          <h3>selectedCoordinates</h3>
          <v-text-field
            v-model="coordinates.lat"
            :value="mapCoordinates.lat"
            type="number"
            step="0.00001"
            label="latitude"
            :readonly="true"
            @input="updateMap"
          ></v-text-field>
          <v-text-field
            v-model="coordinates.lng"
            :value="mapCoordinates.lng"
            type="number"
            step="0.00001"
            label="longitude"
            :readonly="true"
            @input="updateMap"
          ></v-text-field>
        </v-col>
        <v-col
          cols="6"
          xl="12"
          lg="12"
          md="12"
          sm="12"
          class="text-center"
        >
          <h3>myCoordinates</h3>
          <v-progress-circular v-if="loading" indeterminate color="primary" :value="20"></v-progress-circular>
          <div v-else>
            <p class="my-1">{{ 'latitude: ' + myCoordinates.lat }}</p>
            <p class="my-1">{{ 'longitude: ' + myCoordinates.lng }}</p>
          </div>
          <v-btn class="my-1" color="primary lighten-2" small @click="setMyLocation">showLocation</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>
<script>

export default {
  props:{
    mapCoordinates:{
      type: Object,
      required: true
    },
    myLocation: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 20,
      loading: false
    }
  },
  watch: {
    coordinates: { deep:true, handler(val) {
      this.$emit('update:mapCoordinates', val)
    } }
  },

  created() {
    console.log(this.$refs)
    if (!this.myLocation) {
      this.myCoordinates = { ...this.mapCoordinates }
    }
    else {
      this.myCoordinates = this.myLocation
    }
    this.coordinates = { ...this.mapCoordinates }
    this.updateMap()

  },
  methods: {
    gMapFunc(evnt) {
      this.coordinates.lat = parseFloat(evnt.lat().toPrecision(8))
      this.coordinates.lng = parseFloat(evnt.lng().toPrecision(8))
    },
    updateMap() {
      this.mapCoordinates.lat = parseFloat(this.coordinates.lat)
      this.mapCoordinates.lng = parseFloat(this.coordinates.lng)
    },
    setMyLocation() {
      this.coordinates = { ...this.myCoordinates }
    },
    setPlace(place) {
      this.mapCoordinates.lat = parseFloat(place.geometry.location.lat())
      this.mapCoordinates.lng = parseFloat(place.geometry.location.lng())
    }
  }
}
</script>
<style lang="scss" scoped>
#search {
  border: solid 1px;
  width: 200px;
  border-radius: 5px;

}

</style>
