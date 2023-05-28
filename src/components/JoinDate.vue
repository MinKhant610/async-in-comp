<template>
    <div class="date">
        <div>
            <i class="fa-solid fa-circle-user" style="color: #ff8800;"></i>
            Member Science : <span>{{ creatDate }}</span>
        </div>
        <div>
            <i class="fa-solid fa-eye" style="color: #ff8800;"></i>
            Last Seen : <span>{{ lastDate }}</span>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { ref } from 'vue';
    export default {
        setup(){
            let {user} = getUser();
            let createdDate = new Date(user.value.metadata.creationTime);
            let lastSignDate = new Date(user.value.metadata.lastSignInTime);

            const creatDate = ref("");
            const lastDate = ref("")
            creatDate.value = createdDate.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            lastDate.value = lastSignDate.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            return {creatDate, lastDate}
        }
    }
</script>

<style>
.date div{
    margin-bottom: 20px;
}
.date span {
    font-weight: bold;
}
.date i {
    padding-right: 5px;
}
</style>