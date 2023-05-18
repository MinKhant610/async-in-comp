import { db } from "@/firebase/config";
import { ref } from "vue";

let getPosts = ()=>{
    let posts = ref([]);
    let error = ref("");
    let load = async ()=>{
      try{
        db.collection("posts").orderBy("created_at", "desc").onSnapshot((snap)=>{
          posts.value = snap.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
          })
        })
      }catch(err){
        error.value = err.message;
      }
    }
    return {posts, error, load}
}

export default getPosts;