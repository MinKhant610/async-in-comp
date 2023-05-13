<template>
    <div class="tag">
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="posts.length" class="layout">
            <div>
                <PostList :posts="filteredPosts"></PostList>
            </div>
            <div>
                <TagCloud></TagCloud>
            </div>
        </div>
        <div v-else>
            <Spinner></Spinner>
        </div>
    </div>
</template>

<script>
import PostList from '../components/PostList'
import Spinner from '../components/Spinner'
import getPosts from '@/composables/getPosts';
import TagCloud from "../components/TagCloud.vue"
import { computed } from 'vue';
    export default {
  components: {
    PostList, Spinner, TagCloud},
        props : ['tag'],
        setup(props){
            let {posts, error, load} = getPosts();
            load();

            let filteredPosts = computed(()=>{
                return posts.value.filter(post => post.tags.includes(props.tag))
            })

            return {posts, error, filteredPosts};
        }
    }
</script>

<style>
.tag{
    max-width: 1200px;
    margin: 0 auto;
}
</style>