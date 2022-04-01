<template>
  <div>
    <h3>Список пользователей</h3>
  </div>
  <post-item
      v-for="post in postss"
      class="post"
      :post="post"
  ></post-item>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {PostItem},
  props: {
    postss: {
      type: Array,
      require: true
    }
  }
}
</script>

<style scoped>


</style>