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
    this.$store.dispatch("admin/refreshToken");
  },
};
</script>

<style>
@import "@/assets/style.css";
</style>
