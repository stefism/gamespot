<template>
  <a-col :span="span" class="article_card">
    <router-link :to="{ name: 'articleInfo', params: { id: article.id } }">
      <a-card hoverable style="width: 100%">
        <template #cover>
          <img src="https://http.cat/100" alt="article image" />
        </template>
        <h3>Lorem bla bla lorem</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In officiis
          explicabo reprehenderit amet libero non eveniet pariatur iure.
          Deleniti, facere. Id quos optio rem voluptatem dolorem officiis quia
          deserunt similique.
        </p>
      </a-card>
    </router-link>
  </a-col>
</template>

<script>
export default {
  props: ["span", "article", "index"],
};
</script>

<style></style>
