<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <Carousel :slides="slidesArticles" />
    <Featured :articles="homeArticles" />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Featured from "@/components/Featured.vue";

export default {
  components: { Carousel, Featured },
  data() {
    return {};
  },
  computed: {
    homeArticles() {
      return this.$store.getters["articles/getHomeArticles"];
    },
    slidesArticles() {
      const articles = this.$store.getters["articles/getHomeArticles"];
      const slicedArray = articles.slice(0, 4);
      return slicedArray;
    },
  },
  mounted() {
    this.$store.dispatch("articles/getArticles", { limit: 8 });
  },
};
</script>

<style></style>
