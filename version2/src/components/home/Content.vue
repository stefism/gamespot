<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="home_container">
      <md-card v-for="(post, index) in posts" :key="index">
        <md-card-media md-ratio="4:3">
          <img :src="post.img" alt="Image" />
        </md-card-media>
        <md-card-header>
          <h2 class="md-title">{{ post.title }}</h2>
          <div class="md-subhead">
            <div>{{ post.description }}</div>
          </div>
        </md-card-header>
        <md-card-actions>
          <app-button
            type="link"
            :linkTo="`/posts/${post.id}`"
            :addClass="['small_link']"
            ovStyle="color: white"
            >See review</app-button
          >
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("posts/getAllPosts", { limit: 3 });
  },
  computed: {
    posts() {
      return this.$store.getters["posts/returnAllPosts"];
    },
  },
};
</script>

<style></style>
