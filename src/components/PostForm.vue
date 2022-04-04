<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-model="post.title"
        placeholder="Название"
    ></my-input>
    <my-input
        v-model="post.body"
        placeholder="Описание"
    ></my-input>
    <my-button
        style="margin-top: 10px"
        class="btn"
        @click="cretePost"
    >Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },

    }
  },
  methods: {
    cretePost() {
      if (this.post.title.length < 5 || this.post.body.length < 5) {
        return false;
      }
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>