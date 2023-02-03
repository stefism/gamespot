<template>
  <DashboardTitle title="User Profile" />

  <div v-if="userData">
    <Form @submit="onSubmit" :validation-schema="formSchema">
      <div class="form-group">
        <Field
          v-model="userData.firstName"
          name="firstName"
          v-slot="{ field, errors, errorMessage }"
        >
          <FormElement
            element="input"
            type="text"
            placeholder="Your first name"
            :field="field"
            :errors="errors"
            :errorMessage="errorMessage"
          />
        </Field>
      </div>

      <br />

      <div class="form-group">
        <Field
          v-model="userData.lastName"
          name="lastName"
          v-slot="{ field, errors, errorMessage }"
        >
          <FormElement
            element="input"
            type="text"
            placeholder="Your last name"
            :field="field"
            :errors="errors"
            :errorMessage="errorMessage"
          />
        </Field>
      </div>

      <br />

      <button type="submit" class="btn btn-primary">Save</button>
    </Form>
  </div>
</template>

<script>
import DashboardTitle from "@/components/DashboardTitle.vue";
import FormElement from "@/components/FormElements.vue";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: { DashboardTitle, Field, Form, FormElement },
  data() {
    return {
      formSchema: {
        firstName: yup.string(),
        lastName: yup.string(),
      },
    };
  },
  computed: {
    userData() {
      return JSON.parse(
        JSON.stringify(this.$store.getters["auth/getUserData"])
      );
      // return this.$store.getters["auth/getUserData"];
      // Ако не ползваме JSON ... мутираме директно глобалния стейт. В случая не искаме това и прекъсваме връзката на пропертито с глобалния стейт.
    },
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      this.$store.dispatch("auth/updateProfile", values);
    },
  },
};
</script>

<style></style>
