<template>
  <Header />
  <router-view v-if="!isLoading" />
  <div v-else class="page_loader">
    <Loader />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { Header, Loader },
  computed: {
    ...mapGetters({
      toastMsg: "notify/getToastMsg",
      isLoading: "notify/isLoading",
    }),
  },
  watch: {
    toastMsg(toastMsg) {
      // toastMsg[0] - is error or not, toastMsg[1] - message to show, toastMsg[2] - type of message
      if (toastMsg[0] == true) {
        if (toastMsg[2] == "error") {
          this.$toast.error(toastMsg[1]);
        } else if (toastMsg[2] == "success") {
          this.$toast.success(toastMsg[1]);
        }
      }
    },
    //////
    //Компютед пропертито toastMsg ще се променя всеки път щом имаме ново съобщение, а watch-ера дебне за промяната и ако имаме промяна в съобщението, ще показваме тостера (не е за печените филийки) със съответното съобщение.
  },
};
</script>

<style>
@import "./assets/style.css";
</style>
