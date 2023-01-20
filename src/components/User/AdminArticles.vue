<template>
  <DashboardTitle title="Articles" />
  <div v-if="adminArticles">
    <a-table
      :columns="columns"
      :pagination="false"
      :data-source="adminArticles"
      :rowKey="(record) => record.id"
    >
      <template #title>
        <router-link :to="{ name: 'admin_add' }">
          <button class="btn btn-secondary">Add article</button>
        </router-link>
      </template>

      <template #game="{ record }">
        <router-link :to="{ name: 'articleInfo', params: { id: record.id } }">
          {{ record.game }}
        </router-link>
      </template>

      <template #owner="{ record }">
        <span>{{ record.owner.firstName }} {{ record.owner.lastName }}</span>
      </template>

      <template #time="{ record }">
        <span>{{ record.timestamp.toDate().toDateString() }}</span>
      </template>

      <template #delete="{ record }">
        <a-popconfirm
          title="Are you sure?"
          okText="Yes"
          cancelText="No"
          @confirm="removeArticleById(record.id)"
        >
          <button class="btn btn-danger btn-sm">Delete article</button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import DashboardTitle from "@/components/DashboardTitle.vue";
import { mapActions } from "vuex";

export default {
  components: { DashboardTitle },
  data() {
    return {
      columns,
    };
  },
  computed: {
    adminArticles() {
      return this.$store.getters["articles/showAdminArticles"]; //Когато имаме само един гетър, не е необхидимо да правим ..mapGetters
    },
  },
  mounted() {
    this.getAdminArticles({ limit: 3 });
  },
  methods: {
    ...mapActions("articles", ["getAdminArticles"]),
    removeArticleById(articleId) {
      console.log(articleId);
    },
  },
};

const columns = [
  {
    title: "Game",
    slots: { customRender: "game" },
  },
  {
    title: "Owner",
    slots: { customRender: "owner" },
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Created at",
    slots: { customRender: "time" },
  },
  {
    title: "",
    slots: { customRender: "delete" },
  },
];
</script>

<style></style>
