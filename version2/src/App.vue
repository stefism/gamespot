<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: { Header, Footer },
  created() {
    console.log("this.$route", this.$route);
    console.log("this.$routeR", this.$router);
    this.$store.dispatch("admin/refreshToken");
  },
};
</script>

<style>
@import "@/assets/style.css";
</style>
