<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link to="/"> GameSpot </router-link>
      </div>
      <div>
        <ul>
          <li>
            <router-link v-if="!isUserAuth" to="/signin"> Sign in </router-link>
          </li>
          <span v-if="isUserAuth">
            <li>
              <span @click="logout"> Logout </span>
            </li>
            <li>
              <router-link to="/user/dashboard"> Dashboard </router-link>
            </li>
          </span>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isUserAuth: "auth/isUserAuth",
      isUserAdmin: "auth/isUserAdmin",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/signOut");
    },
  },
};
</script>

<style></style>
