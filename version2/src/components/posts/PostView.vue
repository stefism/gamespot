<template>
  <div>Post</div>
</template>

<script>
export default {
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch("posts/getPostById", id);
  },
  computed: {
    post() {
      return this.$store.getters["posts/returnPostById"];
    },
  },
};
</script>

<style></style>
