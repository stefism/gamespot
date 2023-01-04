<template>
  <div class="signin_container p_top">
    <Form @submit="onSubmit" :validation-schema="formSchema">
      <h1 v-text="loginFormType ? 'Login' : 'Register'"></h1>

      <div class="form-group">
        <Field name="email" v-slot="{ field, errors, errorMessage }">
          <input
            type="text"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            v-bind="field"
            :class="{ 'is-invalid': errors.length > 0 }"
          />
          <div class="input_alert" v-if="errors.length > 0">
            {{ errorMessage }}
          </div>
        </Field>

        <Field name="password" v-slot="{ field, errors, errorMessage }">
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            v-bind="field"
            :class="{ 'is-invalid': errors.length > 0 }"
          />
          <div class="input_alert" v-if="errors.length > 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <button type="submit" class="btn mb-3 btn-block">
        {{ loginFormType ? "Login" : "Register" }}
      </button>

      <hr />
      <div class="form_swap" @click="loginFormType = !loginFormType">
        <span v-if="loginFormType"> I want to <b>Register</b> </span>
        <span v-else> I want to <b>Login</b> </span>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: { Field, Form },
  data() {
    return {
      loginFormType: true,
      formSchema: {
        email: yup
          .string()
          .required("Email is required.")
          .email("Email is not valid."),
        password: yup.string().required("Password is required."),
      },
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      if (this.loginFormType == false) {
        // register
        console.log(values, "register");
      } else {
        // login
        console.log(values, "login");
      }
      resetForm();
    },
  },
};
</script>

<style></style>
