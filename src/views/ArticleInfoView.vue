<template>
  <div class="container p_top article_page" v-if="article">
    <div class="game_tag">{{ article.game }}</div>
    <div
      class="article_featured"
      :style="{ backgroundImage: `url(${article.img})` }"
    ></div>
    <div class="article_content">
      <div class="owner">
        Article written by
        <b>{{ article.owner.firstName }} {{ article.owner.lastName }}</b>
      </div>
      <hr />
      <h1>{{ article.title }}</h1>
      <div class="editor" v-html="article.editor"></div>
    </div>
    <hr />
    <div class="article_rating">
      Our rating is: <b>{{ article.rating }}</b>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: null,
    };
  },
  mounted() {
    this.$store
      .dispatch("articles/getArticle", this.$route.params.id)
      .then((article) => {
        this.article = article;
      });
  },
};
</script>

<style></style>
