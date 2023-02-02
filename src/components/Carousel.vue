<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="slides">
    <Carousel class="p_top" :items-to-show="1" :wrap-around="true">
      <Slide v-for="slide in slides" :key="slide.id">
        <div class="slider_bck" :style="{ background: `url(${slide.img})` }">
          <div class="slide_content">
            <div class="item">
              <div>{{ slide.title }}</div>
              <div>
                {{ slide.exerpt }}
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

export default {
  props: ["slides"],
  components: { Carousel, Slide, Pagination },
  data() {
    return {};
  },
};
</script>

<style>
/* .carousel__pagination-button {
  background-color: var(--dark);
}
.carousel__pagination-button--active {
  background-color: var(--grape);
} */
</style>
