<template>
  <div class="container">
    <div class="signin_container">
      <h1>Sign in</h1>

      <form @submit.prevent="onSubmit">
        <div class="input_field" :class="{ invalid: $v.formData.email.$error }">
          <label>Email</label>
          <input
            type="email"
            @blur="$v.formData.email.$touch()"
            v-model.trim="formData.email"
          />

          <div v-if="$v.formData.email.$error">
            <p class="error_label" v-if="!$v.formData.email.required">
              This field is required
            </p>
            <p class="error_label" v-if="!$v.formData.email.email">
              Please enter a valid email
            </p>
          </div>
        </div>

        <div
          class="input_field"
          :class="{ invalid: $v.formData.password.$error }"
        >
          <label>Password</label>
          <input
            type="password"
            @blur="$v.formData.password.$touch()"
            v-model.trim="formData.password"
          />

          <div v-if="$v.formData.password.$error">
            <p class="error_label" v-if="!$v.formData.password.required">
              This field is required
            </p>
            <p class="error_label" v-if="!$v.formData.password.minLength">
              At least 4 characters
            </p>
          </div>
        </div>

        <button
          :style="
            this.$v.$invalid
              ? 'cursor: not-allowed; background: #dbdbdb'
              : 'cursor: pointer; background: #F44336'
          "
          :disabled="this.$v.$invalid"
          type="submit"
        >
          Sign in
        </button>

        <div v-if="authFailed" class="error_label">
          <p>{{ authError }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      formData: {
        email: "test@test.com",
        password: "",
      },
    };
  },
  computed: {
    authFailed() {
      return this.$store.state.admin.authFailed;
    },
    authError() {
      return this.$store.state.admin.authError;
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("admin/signIn", this.formData);
    },
  },
  validations: {
    //validations: - необходимо е на vuelidate за да знае, че трябва да прави валидация. Вътре в него описваме пропертитата за валидация, като трябва да са подадени по същия начин, както са подадени в data(). Освен тук, трябва и в html таговете да сложим $v проперти със съответните настройки, за да работи валидацията.
    formData: {
      email: { required, email },
      password: { required, minLength: minLength(4) },
    },
  },
};
</script>

<style scoped>
.input_field.invalid input,
.input_field.invalid select {
  border: 2px solid red;
}
</style>
