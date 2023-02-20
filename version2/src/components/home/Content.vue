<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="home_container">
      <md-card v-for="(post, index) in posts" :key="index">
        <md-card-media md-ratio="16:9">
          <img
            :src="require(`@/assets/images/featured/${post.img}`)"
            alt="Image"
          />
        </md-card-media>
        <md-card-header>
          <h2 class="title">{{ post.title }}</h2>
          <div class="md-subhead">
            <div>{{ post.description }}</div>
          </div>
        </md-card-header>
        <md-card-actions>
          <app-button type="link" linkTo="#" :addClass="['small_link']"
            >See review</app-button
          >
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import posts from "@/assets/posts";

export default {
  data() {
    return {
      posts,
    };
  },
};
</script>

<style></style>
