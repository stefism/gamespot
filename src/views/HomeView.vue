<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <Carousel :slides="homeArticles" />
    <Featured :articles="homeArticles" />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Featured from "@/components/Featured.vue";

export default {
  components: { Carousel, Featured },
  data() {
    return {
      homeArticles: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
  },
};
</script>

<style></style>
