<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-fluid p_top">
    <!-- More classes are from Bootstrap -->
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'dashboard' }"
                ><DashboardOutlined /> Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'user_profile' }"
                ><UserOutlined /> Profile</router-link
              >
            </li>
          </ul>

          <div>
            <h6
              class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
              <span>Admin</span>
            </h6>

            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin_articles' }"
                  ><ProfileOutlined /> Articles</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin_add' }"
                  ><FileAddOutlined /> Add article</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div>
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  FileAddOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    DashboardOutlined,
    UserOutlined,
    ProfileOutlined,
    FileAddOutlined,
  },
};
</script>

<style scoped>
#sidebarMenu .anticon {
  font-size: 24px;
}
</style>
