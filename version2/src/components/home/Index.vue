<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Featured />
    <Content />
  </div>
</template>

<script>
import Featured from "./Featured.vue";
import Content from "./Content.vue";

export default {
  components: { Featured, Content },
};
</script>

<style></style>
