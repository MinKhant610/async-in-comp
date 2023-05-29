<template>
    <h1>Create Post</h1>
    <form @submit.prevent="addPost">
        <label>Title</label>
        <input type="text" required v-model="title">

        <label>Body</label>
        <textarea required v-model="body"></textarea>

        <label>Tags(hit enter to add a tag)</label>
        <input type="text" @keydown.enter.prevent="handleKeydown" v-model="tag">
        <div v-for="tag in tags" :key="tag" class="pill">
            {{ tag }} <span class="cross" @click="delTag(tag)">&#10006;</span>
        </div>
        <button>Add Post</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { db, timestamp } from '@/firebase/config';
// to use router 
import { useRouter } from 'vue-router';
    export default {
        setup(){
            let router = useRouter(); // equal to => this.$router
            let title = ref("");
            let body = ref("");
            let tag = ref("");
            let tags = ref([]);
            let save_post = ref(false);

            // delete tag
            let delTag = (del_tag)=>{
              tags.value = tags.value.filter(tag => tag != del_tag)
            }
            
            let handleKeydown = ()=>{
                if (!tags.value.includes(tag.value) && tag.value.length > 0){
                    tags.value.push(tag.value);
                }
                tag.value = "";
            }

            let addPost = async ()=>{
                let newPost = {
                title : title.value,
                body : body.value,
                tags : tags.value,
                save_post : save_post.value,
                created_at : timestamp()
                }
                // push data to firebase 
                let response = await db.collection("posts").add(newPost)
                //redirect user to home page
                router.push("/")
            }

            return {title, body, tag, tags, handleKeydown, addPost, delTag}
        }
    }
</script>

<style>
  h1{
    text-align: center;
  }
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }

  .cross{
    color: red;
    align-items: center;
    cursor: pointer;
  }

</style>