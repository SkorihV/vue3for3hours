<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        pleacehodler="Поиск..."
        v-model="searchQuery"
    ></my-input>
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать диалог
      </my-button>
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
        :postsList="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--        <div-->
    <!--            v-for="pageNumber in totalPage"-->
    <!--            :key="pageNumber"-->
    <!--            class="page"-->
    <!--            :class="{-->
    <!--              'current_page': page === pageNumber-->
    <!--            }"-->
    <!--            @click="changePage(pageNumber)"-->
    <!--        >{{ pageNumber }}</div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MySelect from "@/components/UI/MySelect";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import VIntersection from "@/directives/VIntersection";
import axios from 'axios';

export default {
  components: {
    PostList, PostForm, MySelect, MyDialog, MyButton, VIntersection
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 100,
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page +=1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка");
      }
    }
  },
  mounted() {
    // this.fetchPosts();
    //
    // let options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // let callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPage) {
    //     this.loadMorePosts();
    //   }
    // };
    // let observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  margin: 0 2px;
}

.current_page {
  border: 2px solid green;
  background: bisque;
}

.observer {
  height: 30px;
  background: green;
}
</style>