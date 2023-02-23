<template>
  <div class="dashboard_form">
    <h1>Add posts</h1>
    <form @submit.prevent="submitHandler">
      <div class="input_field" :class="{ invalid: $v.formData.title.$error }">
        <label>Title</label>
        <input
          type="text"
          v-model="formData.title"
          @blur="$v.formData.title.$touch()"
        />
        <p v-if="$v.formData.title.$error" class="error_label">
          This input is required
        </p>
      </div>

      <div
        class="input_field"
        :class="{ invalid: $v.formData.description.$error }"
      >
        <label>Description</label>
        <input
          type="text"
          v-model="formData.description"
          @blur="$v.formData.description.$touch()"
        />
        <p v-if="!$v.formData.description.maxLength" class="error_label">
          Maximum characters for description is
          {{ $v.formData.description.$params.maxLength.max }}
        </p>
        <p v-else-if="$v.formData.description.$error" class="error_label">
          Description is required
        </p>
      </div>

      <div class="input_field">
        <wysiwyg v-model="formData.content" />
      </div>

      <div class="input_field" :class="{ invalid: $v.formData.rating.$error }">
        <label>Rating</label>
        <select v-model="formData.rating" @blur="$v.formData.rating.$touch()">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <p v-if="$v.formData.rating.$error" class="error_label">
          The rating is required
        </p>
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
        Add post
      </button>
    </form>

    <md-dialog :md-active="dialog">
      <p>Your post has no content. Are you sure to post this?</p>
      <md-dialog-actions>
        <md-button @click="confirmDialog" class="md-primary">Yes</md-button>
        <md-button @click="cancelDialog" class="md-primary">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      dialog: false,
      formData: {
        title: "",
        description: "",
        content: "",
        rating: "",
      },
    };
  },
  methods: {
    submitHandler() {
      if (this.formData.content == "") {
        this.dialog = true;
      } else {
        this.addPost();
      }
    },
    confirmDialog() {
      this.dialog = false;
      this.addPost();
    },
    cancelDialog() {
      this.dialog = false;
    },
    addPost() {},
  },
  validations: {
    formData: {
      title: { required },
      description: { required, maxLength: maxLength(100) },
      rating: { required },
    },
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.input_field.invalid input,
.input_field.invalid select {
  border: 2px solid red;
}
</style>
