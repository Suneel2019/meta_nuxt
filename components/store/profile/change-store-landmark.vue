<template>
  <v-row no-gutters>
    <v-col cols="12" class="pa-3">
      <v-row no-gutters justify="end">
        <v-col cols="3">
          <v-text-field
            solo
            flat
            dense
            hide-details
            id="pac-input"
            class="simple_text_field mt-3"
            placeholder="Enter location name"
            v-model="landmarkName"
          >
          </v-text-field>
        </v-col>

        <v-col
          cols="12"
          id="map"
          class="mt-5"
          style="width: 100%; height: 400px"
        ></v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="text-center mt-3">
      <v-btn
        tile
        small
        depressed
        color="primary"
        :loading="btnLoadingState"
        @click="updateLandmark"
      >
        Save
      </v-btn>

      <v-btn
        tile
        small
        depressed
        class="ml-3"
        color="error"
        @click="cancelEditBox"
      >
        Cancel
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      btnLoadingState: false,
      latitude: "",
      longitude: "",
      landmarkName: "",
    };
  },

  mounted() {
    this.loadMap();
  },

  methods: {
    loadMap() {
      this.latitude =
        this.$store.getters["storeProfile/GET_PROFILE_INFO"][
          "location_details"
        ]["landmark"]["lat"];
      this.longitude =
        this.$store.getters["storeProfile/GET_PROFILE_INFO"][
          "location_details"
        ]["landmark"]["long"];

      const input = document.getElementById("pac-input");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "np" },
      });

      let myLatlng = new google.maps.LatLng(this.latitude, this.longitude);

      let mapOptions = {
        zoom: 16,
        center: myLatlng,
        mapTypeId: "roadmap",
      };

      const map = new google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      let marker = new google.maps.Marker({
        position: myLatlng,
        map,
        animation: google.maps.Animation.DROP,
        icon: "https://img.icons8.com/doodle/35/000000/user-location.png",
      });

      autocomplete.addListener("place_changed", () => {
        let addressValue = autocomplete.getPlace();
        this.latitude = addressValue.geometry.location.lat();
        this.longitude = addressValue.geometry.location.lng();

        const place = autocomplete.getPlace();

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      });

      google.maps.event.addListener(map, "dragend", () => {
        marker.bindTo("position", map, "center");
        this.latitude = map.center.lat();
        this.longitude = map.center.lng();
      });
    },

    cancelEditBox() {
      $nuxt.emit("close-store-edit-box", "landmark");
    },
    updateLandmark() {
      this.btnLoadingState = true;

      const data = {
        latitude: this.latitude,
        longitude: this.longitude,
      };

      this.$store
        .dispatch("storeProfile/updateStoreLandmark", data)
        .then((res) => {
          this.btnLoadingState = false;

          this.$store.commit("login/SET_STORE_CRED", res.data.data);
          this.$store.commit("storeProfile/SET_LANDMARK", {
            lat: this.latitude,
            long: this.longitude,
          });

          this.$store.commit("notification/COMMIT_SNACKBAR", {
            message: res.message,
            color: "success",
          });

          this.cancelEditBox();
        });
    },
  },
};
</script>
