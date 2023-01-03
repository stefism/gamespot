<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="featured-home">
    <a-row :gutter="16">
      <ArticleCard
        v-for="(article, index) in articles"
        :article="article"
        :key="article.id"
        :index="index"
        span="6"
      />
    </a-row>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";

export default {
  props: ["articles"],
  components: { ArticleCard },
};
</script>

<style></style>
