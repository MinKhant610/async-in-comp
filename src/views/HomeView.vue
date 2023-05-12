<template>
  <div class="home">
    <div v-if="error">
      Not Found URL
    </div>
    <div v-if="posts.length > 0">
      <PostList :posts="posts"></PostList>
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import PostList from '../components/PostList'
export default {
  components: { PostList },
  setup(){
    let posts = ref([]);
    let error = ref("");
    let load = async ()=>{
      try{
        let response = await fetch("http://localhost:3000/posts")
        if (response.status === 404){
          throw new Error("Not found URL");
        }
        let datas = await response.json();
        posts.value = datas;
      }catch(err){
        error.value = err.message;
      }
    }
    load();
    return {posts, error}
  }
}
</script>
 