<template>
  <div>

    <h1>Страница с постами</h1>
    <my-input
        pleacehodler="Поиск..."
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    ></my-input>
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >Создать диалог
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
import MyButton from "@/components/UI/MyButton";
import MyDialog from "@/components/UI/MyDialog";
import MyInput from "@/components/UI/MyInput";
import {mapMutations, mapState, mapGetters, mapActions} from 'vuex';

export default {
  components: {
    PostList,
    PostForm,
    MyButton,
    MyDialog,
    MyInput
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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

  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts:          state => state.post.posts,
      isPostLoading:  state => state.post.isPostLoading,
      selectedSort:   state => state.post.selectedSort,
      searchQuery:    state => state.post.searchQuery,
      page:           state => state.post.page,
      limit:          state => state.post.limit,
      totalPages:     state => state.post.totalPages,
      sortOptions:    state => state.post.sortOptions
    }),
    ...mapGetters({
      sortPosts: 'post/sortPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
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