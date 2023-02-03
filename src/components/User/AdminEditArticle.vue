<template>
  <DashboardTitle title="Edit Article" />
  <ArticleForm :isEdit="true" />
</template>

<script>
import DashboardTitle from "@/components/DashboardTitle.vue";
import ArticleForm from "@/components/ArticleForm.vue";

export default {
  components: { DashboardTitle, ArticleForm },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
