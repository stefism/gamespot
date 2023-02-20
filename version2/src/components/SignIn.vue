<template>
  <div class="container">
    <div class="signin_container">
      <h1>Sign in</h1>

      <form @submit.prevent="onSubmit">
        <div class="input_field">
          <label>Email</label>
          <input type="email" v-model="formData.email" />
        </div>

        <div class="input_field">
          <label>Password</label>
          <input type="password" v-model="formData.password" />
        </div>

        <button type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "test@test.com",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);
    },
  },
};
</script>

<style></style>
