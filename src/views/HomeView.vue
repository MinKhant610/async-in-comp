<template>
  <div class="home">
    <div v-if="error">
      Not Found URL
    </div>
    <div v-if="posts.length" class="layout">
      <div>
        <PostList :posts="posts"></PostList>
      </div>
      <div>
        <TagCloud :posts="posts"></TagCloud>
      </div>
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
import TagCloud from "../components/TagCloud.vue"
import PostList from '../components/PostList'

export default {
  components: {
    Spinner, PostList, TagCloud},
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
    /* 3fr 4 of 3 and 1fr = 4 of 1 */
    grid-template-columns: 3fr 1fr;
    gap:20px;
  }
  a{
    text-decoration: none;
  }
</style>