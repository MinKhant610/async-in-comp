<template>
    <h1>
        Account Info
            <button @click="logout">Logout</button>
    </h1>
    <div>
        <Profile></Profile>
    </div>
</template>

<script>
import Profile from '../components/Profile'
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

    export default {
  components: { Profile },
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