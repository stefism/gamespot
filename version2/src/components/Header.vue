<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link to="/"> Gamespot </router-link>
      </div>
      <div v-if="!isAuth" class="login">
        <router-link to="/signin">
          <img :src="require('@/assets/images/login.png')" alt="login" />
        </router-link>
      </div>
      <div v-else>
        <ul>
          <li><span @click="logoutUser">Logout</span></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters["admin/isAuth"];
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit("admin/logoutUser");
    },
  },
};
</script>

<style></style>
