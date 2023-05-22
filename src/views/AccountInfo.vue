<template>
    <h1>
        Account Info
            <button @click="logout">Logout</button>
    </h1>
</template>

<script>
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';
    export default {
        setup(props, content){
        let {error, logoutAcc} = useLogout();
        let router = useRouter();
            let logout = async ()=>{
                await logoutAcc();
                router.push('/');
            }
            return {logout}
        }
    }
</script>

<style scoped>
button{
    margin: 0 auto;
}
</style>