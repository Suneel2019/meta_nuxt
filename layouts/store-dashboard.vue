<template>
  <v-app>
    <v-main>
        <nav-bar></nav-bar>
        <side-bar></side-bar>
        <v-container className="pa-0" fluid>
          <Nuxt keep-alive></Nuxt>
          <SnackBar v-if="snackbar"></SnackBar>
          <DialogBox v-if="dialogBox"></DialogBox>
          <DeleteDialog v-if="deleteDialogBox"></DeleteDialog>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/components/store/dashboard/nav-bar";
import SideBar from "@/components/store/dashboard/side-bar";
export default {

  components: {
    SideBar,
    NavBar,

    DeleteDialog: () => import("@/components/shared/notification/DeleteDialogBox"),

    DialogBox: () => import("@/components/shared/notification/DialogBox"),

    SnackBar: () => import("@/components/shared/notification/SnackBar"),

  },

  computed: {

    snackbar() {

      return this.$store.getters["notification/GET_SNACKBAR_STATE"];

    },

    dialogBox() {

      return this.$store.getters["notification/GET_SIMPLE_DIALOG_STATE"];

    },

    deleteDialogBox() {

      return this.$store.getters["notification/GET_DELETE_DIALOG_STATE"];

    },

    isMaintenanceMode() {

      return this.$store.getters['login/MAINTENANCE_CODE'];

    }

  }

}
</script>
