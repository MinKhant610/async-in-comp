<template>
    <h2>{{ post.title }}</h2>
    <p> {{ cutPostBody }}</p>

</template>

<script>
import { computed } from 'vue'
    export default {
        props : ['post'],
        setup(props){
            let cutPostBody = computed(()=>{
                return String(props.post.body).substring(0,150) + " ...";
            })
            return {cutPostBody}
        }
    }
</script>

<style scoped>

</style>