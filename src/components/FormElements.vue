<template>
  <div v-if="element == 'input'">
    <input
      class="form-control"
      :class="{ 'is-invalid': errors.length > 0 }"
      :type="type"
      :placeholder="placeholder"
      v-bind="field"
    />
    <div class="alert alert-danger" v-if="errors.length > 0">
      {{ errorMessage }}
    </div>
  </div>

  <div v-if="element == 'textarea'">
    <textarea
      class="form-control"
      :class="{ 'is-invalid': errors.length > 0 }"
      :rows="rows"
      v-bind="field"
      :placeholder="placeholder"
    >
    </textarea>
    <div class="alert alert-danger" v-if="errors.length > 0">
      {{ errorMessage }}
    </div>
  </div>

  <div v-if="element == 'select'">
    <select
      class="form-select"
      :class="{ 'is-invalid': errors.length > 0 }"
      v-bind="field"
    >
      <slot />
      <!-- Със <slot /> казваме, че тук ще подаваме нещо от вън. В случая това ще са <option>, които са необходими за този елемент. -->
    </select>
    <div class="alert alert-danger" v-if="errors.length > 0">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "field",
    "errors",
    "errorMessage",
    "element",
    "type",
    "placeholder",
    "rows",
  ],
};
</script>

<style></style>
