<template>
  <div class="signin_container p_top">
    <Form @submit="onSubmit" :validation-schema="formSchema">
      <h1 v-text="loginFormType ? 'Login' : 'Register'"></h1>

      <div class="form-group">
        <Field
          name="email"
          value="test@test.com"
          v-slot="{ field, errors, errorMessage }"
        >
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

        <Field
          name="password"
          value="test123"
          v-slot="{ field, errors, errorMessage }"
        >
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
        this.$store.dispatch("auth/register", values); // Чрез dispatch се викат екшъните, които сме написали в глобалния стейт. Екшъните обикновено правят заявка до базата и са най-често асинхронни операции. Ползваме три различни именувани модула на глобалния стейт и затова трябва да укажем първо името на модула  / и после името на екшъна
      } else {
        // login
        this.$store.dispatch("auth/login", values);
      }
      resetForm();
    },
  },
};
</script>

<style></style>
