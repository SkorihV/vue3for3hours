<template>
  <div v-if="postsList.length > 0">
    <h3>Список постов</h3>
    <post-item
        v-for="post in postsList"
        class="post"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    ></post-item>
  </div>
  <h2 v-else style="color:red; ">
    Список постов пуст!
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  props: {
    postsList: {
      type: Array,
      require: true
    }
  }
}
</script>

<style scoped>


</style>