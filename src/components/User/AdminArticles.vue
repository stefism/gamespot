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

      <template #edit="{ record }">
        <router-link :to="{ name: 'admin_edit', params: { id: record.id } }">
          <button class="btn btn-primary btn-sm">Edit article</button>
        </router-link>
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
    <br />
    <button @click="getMoreArticles({ limit: 1 })" class="btn btn-secondary">
      Get more articles
    </button>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
import DashboardTitle from "@/components/DashboardTitle.vue";
import Loader from "@/components/Loader.vue";
import { mapActions } from "vuex";

export default {
  components: { DashboardTitle, Loader },
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
    if (
      this.$route.query.reload != undefined ||
      this.adminArticles.length == 0
    ) {
      this.getAdminArticles({ limit: 1 });
    }
  },
  methods: {
    ...mapActions("articles", [
      "getAdminArticles",
      "getMoreArticles",
      "removeArticleById",
    ]),
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
  {
    title: "",
    slots: { customRender: "edit" },
  },
];
</script>

<style></style>
