<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Header },
  computed: {
    ...mapGetters({
      toastMsg: "notify/getToastMsg",
    }),
  },
  watch: {
    toastMsg(toastMsg) {
      console.log(toastMsg);
    },
    //Компютед пропертито toastMsg ще се променя всеки път щом имаме ново съобщение, а watch-ера дебне за промяната и ако имаме промяна в съобщението, ще показваме тостера (не е за печените филийки) със съответното съобщение.
  },
};
</script>

<style>
@import "./assets/style.css";
</style>
