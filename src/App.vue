<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        :postss="posts"
    />
  </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: "Javascript", body: "Описание поста 121 "},
        {id: 2, title: "java", body: "Описание постаeeeeeee"},
        {id: 3, title: "php", body: "Описание поста44444444"},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)

    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 15px;
}
</style>