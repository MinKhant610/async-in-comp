<template>
    <div class="container">
        <div>
            <Profile></Profile>
        </div>
        <div>
            <JoinDate></JoinDate>
        </div>
        <div>
            <button @click="logout">Logout</button>
        </div>
    </div>
    <SavedPost></SavedPost>
</template>

<script>
import SavedPost from '../components/SavedPost'
import JoinDate from '../components/JoinDate'
import Profile from '../components/Profile'
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

    export default {
  components: {
    SavedPost,
    JoinDate, Profile },
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
.container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 900px;
    margin: 80px auto;
    border-radius: 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 2px 4px 6px 4px rgba(28, 6, 49, 0.1);
}
button {
    margin-bottom: 30px;
}
</style>