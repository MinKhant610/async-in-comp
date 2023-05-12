<template>
    <div v-if="post">
        <h1>Post title {{ post.id }}</h1>
        <p>{{ post.body }}</p>
    </div>
    <div v-else>
        <Spinner></Spinner>
    </div>
</template>

<script>
import Spinner from '../components/Spinner'
import getPost from "../composables/getPost"
    export default {
  components: { Spinner },
        props : ['id'],
        setup(props){
            let {post, error, load} = getPost(props.id);
            load();
            return {post, error, load}
        }
    }
</script>

<style scoped>

</style>