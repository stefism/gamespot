<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <router-link
      v-if="type == 'link'"
      :to="linkTo"
      :class="['button_default', ...addClass]"
      :style="ovStyle"
    >
      <!-- Бутона ще има дефолтен клас, а ако искаме да добавим допълнителни класове към дефолтния, ще го направим със трите точки (спред) оператора и ги вземем от пропертито addClass, което е масив и му го подаваме там къдего ще имползваме елемента. -->
      <slot />
      <!-- Щом има <slot /> - вътре в него ще се визуализира, това, което се напише между отварящия и затварящия таг на елемента, там където ще се ползва. Например <app-button>See review</app-button>. -->
    </router-link>

    <div
      v-if="type == 'btn'"
      :class="['button_default', ...addClass]"
      :style="ovStyle"
      @click="action"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["linkTo", "addClass", "ovStyle", "type", "action"],
};
</script>

<style></style>
