<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link to="/"> GameSpot </router-link>
      </div>
      <div>
        <ul>
          <li>
            <router-link to="/signin"> Sign in </router-link>
          </li>
          <li>
            <span> Logout </span>
          </li>
          <li>
            <router-link to="/user/dashboard"> Dashboard </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style></style>
