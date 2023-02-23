<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container dashboard_container">
    <div class="admin_nav">
      <ul>
        <li><router-link to="/dashboard/add_posts">Add post</router-link></li>
        <li>
          <router-link to="/dashboard/posts_list">Manage posts</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
