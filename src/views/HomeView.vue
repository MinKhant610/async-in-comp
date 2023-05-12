<template>
  <div class="home">
    <div v-if="error">
      Not Found URL
    </div>
    <div v-if="posts.length > 0">
      <PostList :posts="posts"></PostList>
    </div>
    <div v-else>
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner'
import { ref } from 'vue'
import getPosts from "../composables/getPosts"

import PostList from '../components/PostList'
export default {
  components: {
    Spinner, PostList },
  setup(){
    
    let {posts, error, load} = getPosts();
    load();
    return {posts, error}
  }
}
</script>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout{
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap:20px;
  }
</style>