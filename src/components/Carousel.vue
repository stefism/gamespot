<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Carousel class="p_top" :items-to-show="1" :wrap-around="true">
    <Slide v-for="slide in slides" :key="slide.id">
      <div
        class="slider_bck"
        :style="{ background: `url(https://http.cat/100)` }"
      >
        <div class="slide_content">
          <div class="item">
            <div>Title of the article</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
              eligendi aut minima similique hic id quo ad ut dolorem quae
              placeat quia exercitationem ratione, obcaecati accusamus ex ab
              illo corrupti!
            </div>
          </div>
        </div>
      </div>
    </Slide>
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
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
