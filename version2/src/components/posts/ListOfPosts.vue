<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Rating</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>
      <md-table-row v-for="(post, index) in posts" :key="index">
        <md-table-cell>{{ post.title }}</md-table-cell>
        <md-table-cell>{{ post.description }}</md-table-cell>
        <md-table-cell>{{ post.rating }}</md-table-cell>
        <md-table-cell>
          <div
            class="post_delete"
            @click="deleteHandler(post.id)"
            style="cursor: pointer"
          >
            Delete
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="confirmDelete"
      md-title="Confirm delete"
      md-content="Confirm delete this post please."
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="onCancelDelete"
      @md-confirm="onConfirmDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDelete: false,
      postId: null,
    };
  },
  created() {
    this.$store.dispatch("posts/getAllPosts", { limit: -1 });
  },
  computed: {
    posts() {
      return this.$store.getters["posts/returnAllPosts"];
    },
  },
  watch: {
    posts() {
      this.$store.dispatch("posts/getAllPosts", { limit: -1 });
    },
  },
  methods: {
    deleteHandler(postId) {
      this.postId = postId;
      this.confirmDelete = true;
    },
    onCancelDelete() {
      this.postId = null;
      this.confirmDelete = false;
    },
    onConfirmDelete() {
      this.$store.dispatch("admin/deletePost", this.postId);
      this.confirmDelete = false;
    },
  },
};
</script>

<style scoped>
.md-dialog-container.md-theme-default {
  background-color: white;
}
.md-dialog {
  background: #ffffff2e;
}
</style>
