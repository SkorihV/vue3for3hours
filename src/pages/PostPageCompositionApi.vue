<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        pleacehodler="Поиск..."
        v-model="searchQuery"
    ></my-input>
    <div class="app__btns">
      <my-button
      >Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
      />
    </my-dialog>
    <post-list
        :postsList="sortedAndSearchedPosts"
        v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>

  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MySelect from "@/components/UI/MySelect";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import {ref} from 'vue';
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchPosts from "@/hooks/useSortedAndSearchPosts";

export default {
  components: {
    PostList, PostForm, MySelect, MyDialog, MyButton
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По описанию'},
        {value: 'body', name: 'По заголовку'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPage, isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchPosts(sortedPosts)
    return {
      posts,
      totalPage,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
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