<template>
  <div class="container post_container">
    <div class="top" v-if="post">
      <div class="post_header">
        <h1>{{ post.title }}</h1>
        <div class="post_img" :style="{ background: `url(${post.img})` }"></div>
      </div>
      <div class="post_content">
        <div v-html="post.content"></div>
      </div>
      <div class="post_rating">
        Rating: <span>{{ post.rating }} / 5</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch("posts/getPostById", id);
  },
  destroyed() {
    this.$store.commit("posts/clearPostView");
  },
  computed: {
    post() {
      return this.$store.getters["posts/returnPostById"];
    },
  },
};
</script>

<style></style>
