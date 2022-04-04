<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать диалог</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :postsList="posts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import axios from 'axios';

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По описанию'},
        {value: 'body', name: 'По заголовку'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
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
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>