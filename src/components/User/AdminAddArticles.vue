<template>
  <DashboardTitle title="Add Article" />
  <ArticleForm :isEdit="false" />
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
