<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="title">My Profile</v-col>
      <v-col cols="12" class="body-2 mt-2">
        <v-card outlined>
          <v-tabs
            color="black"
            background-color="#adb5bd"
            v-model="currentTabIndex"
            @change="editBoxNumber = null"
          >
            <v-tab>Personal Information</v-tab>
            <v-tab v-if="profileInfo">Store Information</v-tab>
            <v-tab v-if="profileInfo">Security Information</v-tab>

            <v-tab-item>
              <v-row no-gutters class="mt-4" v-if="loadingSpinner">
                <v-col cols="12" class="text-center">
                  <v-progress-circular indeterminate></v-progress-circular>
                </v-col>
              </v-row>

              <v-row no-gutters v-else>
                <v-col
                  cols="12"
                  class="d-flex justify-center pa-3"
                  v-if="!profileInfo"
                >
                  <v-alert
                    text
                    dense
                    type="info"
                    color="primary"
                    class="body-2 mb-0"
                  >
                    Profile Information is not available at right now.
                  </v-alert>
                </v-col>

                <v-row no-gutters v-else>
                  <v-col cols="12">
                    <v-card color="#adb5bd" outlined class="ma-3">
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          class="header_style_one font-weight-bold px-3 py-2"
                        >
                          Personal Information
                        </v-col>

                        <v-col cols="12">
                          <v-row no-gutters class="pa-3">
                            <v-col cols="12">
                              <v-row no-gutters>
                                <v-col cols="3">Email</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["contact_details"][
                                      "contact_email"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Phone Number</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["contact_details"][
                                      "contact_mobile"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Landline Number</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["contact_details"][
                                      "contact_phone"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-row>
            </v-tab-item>

            <v-tab-item v-if="profileInfo">
              <v-card outlined class="ma-3">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    class="header_style_one font-weight-bold px-3 py-2"
                  >
                    Store Information
                  </v-col>

                  <v-col cols="12" class="pa-3">
                    <v-card outlined color="#adb5bd">
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          class="header_style_one font-weight-medium px-3 py-2"
                        >
                          Store Details
                        </v-col>

                        <v-col cols="12" class="pa-3">
                          <v-row no-gutters>
                            <v-col cols="12">
                              <v-row no-gutters>
                                <v-col cols="3">Store Name</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{ profileInfo["store_name"] }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Store Owner</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{ profileInfo["store_owner"] }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Established Date</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{ profileInfo["store_establishe_date"] }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Store Code</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{ profileInfo["store_code"] }}
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <v-col cols="12" xs="12" class="pa-3">
                    <v-card color="#adb5bd" outlined>
                      <v-row no-gutters justify="space-between" align="center">
                        <v-col
                          cols="12"
                          sm="12"
                          xs="12"
                          class="header_style_one font-weight-medium px-3 py-2"
                        >
                          Package Details
                        </v-col>

                        <v-col cols="6" xs="12" class="pa-3">
                          <v-row no-gutters>
                            <v-col cols="12">
                              <v-row no-gutters>
                                <v-col cols="6">Store Type</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    profileInfo["package_details"]["store_type"]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="6">Package</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    profileInfo["package_details"][
                                      "store_type_package"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="6">Refundable Charge</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    formatAmount(
                                      profileInfo["package_details"][
                                        "refundable_registration_charge"
                                        ]
                                    )
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="6">Registration Charge</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    formatAmount(
                                      profileInfo["package_details"][
                                        "non_refundable_registration_charge"
                                        ]
                                    )
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="6">Base Investment</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    formatAmount(
                                      profileInfo["package_details"][
                                        "base_investment"
                                        ]
                                    )
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="6">Annual Purchasing Limit</v-col>
                                <v-col cols="6" class="font-weight-bold">
                                  {{
                                    formatAmount(
                                      profileInfo["package_details"][
                                        "annual_purchasing_limit"
                                        ]
                                    )
                                  }}
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="5" xs="12" class="px-3">
                          <v-card outlined class="pa-3">
                            <v-row no-gutters>
                              <v-col cols="12" class="font-weight-medium">
                                Want to upgrade your package plan?
                              </v-col>

                              <v-col cols="12" class="mt-1">
                                <v-row no-gutters>
                                  <v-col cols="1">
                                    <v-icon small color="success"
                                    >mdi-check
                                    </v-icon
                                    >
                                  </v-col>
                                  <v-col cols="11" class="caption"
                                  >Choose your package to your need.
                                  </v-col
                                  >
                                </v-row>
                              </v-col>

                              <v-col cols="12" class="mt-1">
                                <v-row no-gutters>
                                  <v-col cols="1">
                                    <v-icon small color="success"
                                    >mdi-check
                                    </v-icon
                                    >
                                  </v-col>
                                  <v-col cols="11" class="caption"
                                  >Choose your package wisely.
                                  </v-col
                                  >
                                </v-row>
                              </v-col>

                              <v-col cols="12" class="mt-1">
                                <v-row no-gutters>
                                  <v-col cols="1">
                                    <v-icon small color="success"
                                    >mdi-check
                                    </v-icon
                                    >
                                  </v-col>
                                  <v-col cols="11" class="caption"
                                  >Cancel anytime you want.
                                  </v-col
                                  >
                                </v-row>
                              </v-col>

                              <v-col cols="12" class="mt-3">
                                <v-btn color="success"> Upgrade Package</v-btn>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <v-col cols="12" class="pa-3">
                    <v-card color="#adb5bd" outlined>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          class="header_style_one font-weight-bold px-3 py-2"
                        >
                          Location Information
                        </v-col>

                        <v-col cols="12" class="pa-3">
                          <v-row no-gutters>
                            <v-col cols="12">
                              <v-row no-gutters>
                                <v-col cols="3">Province</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["location_details"]["province"][
                                      "location_name"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">District</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["location_details"]["district"][
                                      "location_name"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Municipality</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["location_details"][
                                      "municipality"
                                      ]["location_name"]
                                  }}
                                </v-col>
                              </v-row>
                              <v-divider class="mt-2"></v-divider>
                            </v-col>

                            <v-col cols="12" class="mt-2">
                              <v-row no-gutters>
                                <v-col cols="3">Ward</v-col>
                                <v-col cols="9" class="font-weight-bold">
                                  {{
                                    profileInfo["location_details"]["ward"][
                                      "location_name"
                                      ]
                                  }}
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>

                  <v-col cols="12" class="pa-3">
                    <v-card outlined>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          class="header_style_one font-weight-bold px-3 py-2"
                        >
                          Landmark Information
                        </v-col>

                        <v-col
                          cols="12"
                          class="text-end pt-3 pr-3"
                          v-if="!editLandmarkState"
                        >
                          <v-btn
                            color="primary"
                            tile
                            small
                            depressed
                            @click="updateLandmark"
                          >
                            Edit
                          </v-btn>
                        </v-col>

                        <v-col cols="12" class="mt-3 px-3 pb-5">
                          <v-row no-gutters>
                            <v-col cols="12" v-if="!editLandmarkState">
                              <v-row no-gutters>
                                <v-col
                                  cols="12"
                                  class="d-flex justify-center mb-5"
                                  v-if="!locationServiceState"
                                >
                                  <v-alert
                                    text
                                    dense
                                    type="info"
                                    color="primary"
                                    class="caption mb-0"
                                  >
                                    Your location service is turned off. Please
                                    enable it before updating your landmark
                                    information.
                                  </v-alert>
                                </v-col>

                                <v-col
                                  cols="12"
                                  class="d-flex justify-center mb-5"
                                  v-if="!doesLandmarkExist"
                                >
                                  <v-alert
                                    text
                                    dense
                                    type="info"
                                    color="primary"
                                    class="caption mb-0"
                                  >
                                    The marker on the map only shows your
                                    current location. To save it permanently,
                                    please click Edit and update your landmark
                                    location.
                                  </v-alert>
                                </v-col>

                                <v-col cols="12">
                                  <iframe
                                    width="100%"
                                    height="350"
                                    frameborder="0"
                                    style="border: 0"
                                    :src="`https://maps.google.com/maps?q=${profileInfo['location_details']['landmark']['lat']},${profileInfo['location_details']['landmark']['long']}&z=15&output=embed`"
                                  ></iframe>
                                </v-col>
                              </v-row>
                            </v-col>

                            <v-col cols="12" v-else>
                              <change-store-landmark></change-store-landmark>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>

            <v-tab-item v-if="profileInfo">
              <v-card outlined class="ma-3">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    class="header_style_one font-weight-bold px-3 py-2"
                  >
                    Security Information
                  </v-col>

                  <v-col cols="12" class="pa-3">
                    <v-row no-gutters v-if="!editPasswordState">
                      <v-col cols="10" class="d-flex align-center">
                        <div>
                          <v-icon>mdi-key-chain</v-icon>
                        </div>

                        <div class="ml-3">
                          <div class="subtitle-1">Change Password</div>
                          <div class="grey--text">
                            It's always a good idea to use a strong password
                            that you're not using elsewhere.
                          </div>
                        </div>
                      </v-col>

                      <v-col cols="2" class="text-end">
                        <v-btn
                          tile
                          small
                          color="primary"
                          active-class="edit-button"
                          @click="openEditBox(1)"
                        >
                          Edit
                        </v-btn>
                      </v-col>
                    </v-row>

                    <change-store-password v-else/>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StringFormatter from "@/helpers/shared/stringFormatter";
import storeProfileModule from "../../../store/store/profile/index.js";

export default {
  name: "StoreProfile",
  components: {
    ChangeStorePassword: () =>
      import("../../../components/store/profile/change-store-password"),
    ChangeStoreLandmark: () =>
      import("../../../components/store/profile/change-store-landmark"),
  },

  layout: 'store-dashboard',

  data() {
    return {
      currentTabIndex: 0,
      loadingSpinner: true,
      dialogState: false,
      selectedImage: null,
      editBoxNumber: null,
      locationServiceState: false,
      doesLandmarkExist: true,
      profileInfo: null,
    };
  },


  async fetch() {
    this.registerModule();
    this.getProfileDetails();
  },

  // this.$nuxt.emit

  computed: {
    editPasswordState() {
      return this.editBoxNumber === 1;
    },
    editLandmarkState() {
      return this.editBoxNumber === 2;
    },
  },
  methods: {
    registerModule() {
      !this.$store.hasModule("storeProfile")
        ? this.$store.registerModule("storeProfile", storeProfileModule)
        : "";
    },

    getProfileDetails() {
      this.$store
        .dispatch("storeProfile/getStoreInfo")
        .then((res) => {
          this.profileInfo = res.data;
          this.$store.commit("storeProfile/SET_PROFILE_INFO", res.data);

          const landmark = res.data["location_details"]["landmark"];
          this.$store.commit("storeProfile/SET_LANDMARK", landmark);

          const {tabIndex} = this.$route.query;

          if (tabIndex === "1") {
            this.currentTabIndex = 1;
          }

          this.checkLocationService(landmark);
        })
        .finally(() => {
          this.loadingSpinner = false;
        });
    },

    formatAmount(amount) {
      return StringFormatter.formatCurrency(amount);
    },
    checkLocationService({lat, long}) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.locationServiceState = true;

          if (lat === null || long === null) {
            this.$store.commit("storeProfile/SET_LANDMARK", {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            this.doesLandmarkExist = false;
          } else {
            this.$store.commit("storeProfile/SET_LANDMARK", {
              lat,
              long,
            });
            this.doesLandmarkExist = true;
            this.locationServiceState = true;
          }
        },
        () => {
          this.locationServiceState = false;

          this.$store.commit('notification/COMMIT_SNACKBAR', {
            message: `Location service is required to show location in the map.`,
            color: 'error'
          });
        }
      );
    },
    updateLandmark() {
      const {lat, long} =
        this.$store.getters["storeProfile/GET_PROFILE_INFO"][
          "location_details"
          ]["landmark"];
      if (lat === null || long === null) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.$store.commit("storeProfile/SET_LANDMARK", {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              });

              this.openEditBox(2);
            },
            () => {
              let lat = 27.700769;
              let long = 85.30014;
              let landmark = {
                lat,
                long,
              };
              this.$store.commit("storeProfile/SET_LANDMARK", landmark);
              this.openEditBox(2);
              this.$store.commit("notification/COMMIT_SNACKBAR", {
                message: `Sorry, we can't update landmark information without location access.`,
                color: "error",
              });
            }
          );
        }
      } else {
        this.openEditBox(2);
      }
    },
    openEditBox(type) {
      this.editBoxNumber = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-button {
  background-color: #f5f6f7;
}
</style>
