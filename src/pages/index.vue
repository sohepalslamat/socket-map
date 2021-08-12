<template>
  <div class="flex-grow-1">
    <h3 v-if="loadingMap">loading...</h3>
    <GoogleMap
      v-else
      :map-coordinates.sync="mapCoordinates"
    />
  </div>
</template>

<script>
import Pusher from 'pusher-js'
Pusher.logToConsole = true
const pusher = new Pusher('50b29bf63e2609c50ce7', { cluster: 'eu' })

export default {
  data() {
    return {
      mapCoordinates: {},
      loadingMap: false
    }
  },
  mounted () {
    const channel = pusher.subscribe('channel')

    channel.bind('hi', (data) => {
      let body = {}

      if (typeof data === 'object') {
        body = data
      }
      else {
        body = JSON.parse(data)
      }

      this.mapCoordinates.lat = body.lat
      this.mapCoordinates.lng = body.lng
    })

  },
  created() {
    this.getLocation()

  },
  methods:{
    getLocation() {
      if (!this.mapCoordinates.lat) {
        this.loadingMap = true
        this.$getLocation()
          .then((coordinates) => {
            this.mapCoordinates['lat'] = parseFloat(coordinates.lat.toPrecision(8))
            this.mapCoordinates['lng'] = parseFloat(coordinates.lng.toPrecision(8))
            this.loadingMap = false
          })
          .catch((error) => {
            this.mapCoordinates.lat = 41.003
            this.mapCoordinates.lng = 28.704
            this.loadingMap = false
          })
      }
    }
  }
}
</script>
