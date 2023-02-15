<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Carousel :per-page="1" :mouse-drag="true">
      <Slide v-for="(slide, index) in slides" :key="index">
        <div class="slider_bck" :style="{ background: `url(${slide.bck})` }">
          <div class="gradient">
            <div class="container">
              <div class="content">
                Button
                <div class="item">
                  {{ slide.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Slide1 from "@/assets/images/featured/1.jpg";
import Slide2 from "@/assets/images/featured/2.jpg";
import Slide3 from "@/assets/images/featured/3.jpg";
import Slide4 from "@/assets/images/featured/4.jpg";

export default {
  components: { Carousel, Slide },
  data() {
    return {
      slides: [
        {
          title: "Red dead redemption 2",
          bck: Slide1,
        },
        {
          title: "Watchdogs 2",
          bck: Slide2,
        },
        {
          title: "Rise of the tomb rider",
          bck: Slide3,
        },
        {
          title: "Spider-man",
          bck: Slide4,
        },
      ],
    };
  },
};
</script>

<style></style>
