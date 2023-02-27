<template>
  <div class="dashboard_form">
    <h1>Add posts</h1>
    <form @submit.prevent="submitHandler">
      <div v-if="uploadedImageUrl">
        <img :src="uploadedImageUrl" alt="" />
      </div>

      <div class="input_field">
        <input type="file" @change="processFile($event)" ref="myFileInput" />
      </div>

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

    <md-snackbar
      md-position="center"
      :md-duration="4000"
      :md-active.sync="addPostStatus"
      md-persistent
    >
      <span>Your post was posted.</span>
      <md-button style="color: white" class="md-primary" @click="closeMessage"
        >Close</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      dialog: false,
      formData: {
        img: "",
        title: "",
        description: "",
        content: "",
        rating: "",
      },
    };
  },
  destroyed() {
    this.$store.commit("admin/clearImageUpload");
  },
  computed: {
    uploadedImageUrl() {
      let imageUrl = this.$store.getters["admin/getUploadedImageUrl"];
      this.setImageUrl(imageUrl);
      return this.$store.getters["admin/getUploadedImageUrl"];
    },
    addPostStatus: {
      get: function () {
        let status = this.$store.getters["admin/addPostStatus"];
        if (status) {
          this.clearPost();
          this.$store.commit("admin/clearImageUpload");
        }
        return this.$store.getters["admin/addPostStatus"];
      },
      set: function () {
        let status = this.$store.getters["admin/addPostStatus"];
        if (status) {
          this.clearPost();
          this.$store.commit("admin/clearImageUpload");
        }
        return status;
      },
      //Ако не сложим гетер и сетер, дава грешка, че няма сетер или гетер.
      // let status = this.$store.getters["admin/addPostStatus"];
      // if (status) {
      //   this.clearPost();

      // this.formData = {
      // title: "",
      // description: "",
      // content: "",
      // rating: "",
      // };
      // return status;
      // },
      //Ако го сложим това директно тука, издава грешка Unexpected side effect in "addPostStatus" computed property. Затова го правим в отделен метод и викаме метода и така няма грешка-
    },
  },
  methods: {
    setImageUrl(url) {
      this.formData.img = url;
    },
    closeMessage() {
      this.$store.commit("admin/addPostClose");
    },
    clearPost() {
      this.$v.$reset(); //Ресетваме валидацията да не дава грешки, след като изчистиме формата.
      this.$refs.myFileInput.value = ""; //Изчистваме името на файла от полето за въвеждане на файл. Ако само го изчистм от formData, не се получава.

      this.formData = {
        img: "",
        title: "",
        description: "",
        content: "",
        rating: "",
      };
    },
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
    addPost() {
      this.$store.dispatch("admin/addPost", this.formData);
    },
    processFile(event) {
      let file = event.target.files[0];
      this.$store.dispatch("admin/imageUpload", file);
    },
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

.md-snackbar.md-theme-default {
  background-color: #19ae26;
}
</style>
