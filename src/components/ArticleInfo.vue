<template>
  <div class="container p_top article_page" v-if="article">
    <div class="game_tag">{{ article.game }}</div>
    <div
      class="article_featured"
      :style="{ backgroundImage: `url(${article.img})` }"
    ></div>
    <div class="article_content">
      <div class="owner">
        Article written by
        <b>{{ article.owner.firstName }} {{ article.owner.lastName }}</b>
      </div>
      <hr />
      <h1>{{ article.title }}</h1>
      <div class="editor" v-html="article.editor"></div>
    </div>
    <hr />
    <div class="article_rating">
      Our rating is: <b>{{ article.rating }}</b>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        id: "34534534",
        owner: {
          firstName: "Francis",
          lastName: "Jones",
          uid: "sdfs898fsfd",
        },
        game: "The last of us 2",
        title: "Article info Lorem ipsum",
        rating: 5,
        timestamp: "01/01/01",
        img: "https://http.cat/200",
        except:
          "Article info Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiamharum culpa debitis quia vero aut incidunt est fugiat, enim ipsam.",
        editor:
          "<p>Article info Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiamharum culpa debitis quia vero aut incidunt est fugiat, enim ipsam.</p>",
      },
    };
  },
};
</script>

<style></style>
