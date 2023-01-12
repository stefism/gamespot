<template>
  <DashboardTitle title="Add Article" />

  <Form @submit="onSubmit" :validation-schema="formSchema">
    <div class="form-group">
      <Field name="game" v-slot="{ field, errors, errorMessage }">
        <FormElement
          element="input"
          type="text"
          placeholder="Enter the game name"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
    </div>

    <br />

    <div class="form-group">
      <Field name="title" v-slot="{ field, errors, errorMessage }">
        <FormElement
          element="input"
          type="text"
          placeholder="Title of the game"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
    </div>

    <br />

    <div class="form-group">
      <Field name="excerpt" v-slot="{ field, errors, errorMessage }">
        <FormElement
          element="textarea"
          placeholder="Add an excerpt"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
          :rows="3"
        />
      </Field>
    </div>

    <br />

    <div class="form-group">
      <Field
        name="rating"
        value="Select a rating"
        v-slot="{ field, errors, errorMessage }"
      >
        <FormElement
          element="select"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        >
          <option value="Select a rating" selected>Select a rating</option>
          <!-- При валидацията имаме проперти .notOneOf, което ще изключи възможността да селектираме като value първия option "Select a rating". Мега яка и удобна валидация. -->
          <option v-for="rating in ratings" :key="rating" :value="rating">
            {{ rating }}
          </option>
          <!-- Във FormElements.vue, където е този компонент, има <slot />, който ще приеме всички <option>-и и ще ги подаде на компонента <select> -->
        </FormElement>
      </Field>
    </div>

    <br />

    <div class="form-group">
      <Field name="img" v-slot="{ field, errors, errorMessage }">
        <FormElement
          element="input"
          type="text"
          placeholder="Add the source of the image"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
    </div>

    <br />

    <button type="submit" class="btn btn-primary">Add article</button>
  </Form>
</template>

<script>
import { addArticlesSchema } from "@/tools/schemas";
import FormElement from "@/components/FormElements.vue";
import DashboardTitle from "@/components/DashboardTitle.vue";
import { Field, Form } from "vee-validate";

export default {
  components: { DashboardTitle, Field, Form, FormElement },
  data() {
    return {
      formSchema: addArticlesSchema,
      ratings: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>

<style></style>
