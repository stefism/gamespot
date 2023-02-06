<template>
  <!-- <router-link
    :to="{ name: 'admin_edit', params: { id: 'E3ze4cuEcwo5hwUVeuDX' } }"
  >
    CHANGE
  </router-link> -->
  <!-- Тест на метода beforeRouteUpdate, който нещо не се държи според очакваното. Не влиза в него. -->
  <Form
    @submit="onSubmit"
    :validation-schema="formSchema"
    style="margin-bottom: 10px"
  >
    <div class="form-group">
      <Field
        v-if="isEdit"
        v-model="article.game"
        name="game"
        v-slot="{ field, errors, errorMessage }"
      >
        <FormElement
          element="input"
          type="text"
          placeholder="Enter the game name"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
      <Field v-else name="game" v-slot="{ field, errors, errorMessage }">
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
      <Field
        v-if="isEdit"
        v-model="article.title"
        name="title"
        v-slot="{ field, errors, errorMessage }"
      >
        <FormElement
          element="input"
          type="text"
          placeholder="Title of the game"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
      <Field v-else name="title" v-slot="{ field, errors, errorMessage }">
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
      <Field
        v-if="isEdit"
        v-model="article.excerpt"
        name="excerpt"
        v-slot="{ field, errors, errorMessage }"
      >
        <FormElement
          element="textarea"
          placeholder="Add an excerpt"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
          :rows="3"
        />
      </Field>
      <Field v-else name="excerpt" v-slot="{ field, errors, errorMessage }">
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

    <TextEditor
      v-if="article.editor"
      @update="updateEditor"
      :content="article.editor"
    />
    <TextEditor v-else @update="updateEditor" :content="article.editor" />
    <!-- This field is needed to validate input from TextEditor because no way to use schema and validate directly from the editor. -->
    <Field
      v-if="isEdit"
      name="editor"
      v-model="textEditorContent"
      v-slot="{ field, errors, errorMessage }"
    >
      <input type="hidden" id="veditor" v-bind="field" />
      <div class="alert alert-danger" v-if="errors.length > 0">
        {{ errorMessage }}
      </div>
    </Field>
    <Field
      v-else
      name="editor"
      v-model="textEditorContent"
      v-slot="{ field, errors, errorMessage }"
    >
      <input type="hidden" id="veditor" v-bind="field" />
      <div class="alert alert-danger" v-if="errors.length > 0">
        {{ errorMessage }}
      </div>
    </Field>

    <br />

    <div class="form-group">
      <Field
        v-if="isEdit"
        name="rating"
        value="Select a rating"
        v-model="article.rating"
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
      <Field
        v-else
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
      <Field
        v-if="isEdit"
        v-model="article.img"
        name="img"
        v-slot="{ field, errors, errorMessage }"
      >
        <FormElement
          element="input"
          type="text"
          placeholder="Add the image URL"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
      <Field v-else name="img" v-slot="{ field, errors, errorMessage }">
        <FormElement
          element="input"
          type="text"
          placeholder="Add the image URL"
          :field="field"
          :errors="errors"
          :errorMessage="errorMessage"
        />
      </Field>
    </div>

    <br />

    <button type="submit" class="btn btn-primary" :disabled="loading">
      {{ isEdit ? "Save changes" : "Add article" }}
    </button>
  </Form>
</template>

<script>
import FormElement from "@/components/FormElements.vue";
import TextEditor from "@/components/TextEditor.vue";
import { addArticlesSchema } from "@/tools/schemas";
import { Field, Form } from "vee-validate";

export default {
  props: ["isEdit"],
  components: { Field, Form, FormElement, TextEditor },
  data() {
    return {
      article: "",
      loading: false,
      textEditorContent: "",
      formSchema: addArticlesSchema,
      ratings: [1, 2, 3, 4, 5],
    };
  },
  beforeRouteUpdate(to) {
    console.log("BEFORE");
    this.getArticle(to.params.id);
    //Този лайф сайкъл не бачка, незнайно защо.
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
  methods: {
    onSubmit(values) {
      this.loading = true;
      if (this.isEdit) {
        this.$store
          .dispatch("articles/updateArticle", {
            values,
            id: this.$route.params.id,
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$store.dispatch("articles/addArticle", values).finally(() => {
          this.loading = false;
        });
      }
    },
    getArticle(id) {
      if (this.isEdit) {
        this.$store.dispatch("articles/getArticle", id).then((article) => {
          if (article) {
            this.article = article;
          } else {
            this.$router.push({ name: "404" });
          }
        });
      }
    },
    updateEditor(value) {
      this.textEditorContent = value;
    },
  },
};
</script>

<style></style>
