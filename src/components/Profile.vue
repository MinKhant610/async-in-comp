<template>
    <div>
        <input type="file" accept="image/*" 
        @change="uploadHandler" 
        ref="fileInput">
        <div v-if="user && user.displayName" class="profile_img">
            <h3>{{ user.displayName }}</h3>
        </div>
    </div>
</template>

<script>
import { auth, storage } from '@/firebase/config'
import getUser from '@/composables/getUser';
import imageUpload from '@/composables/imageUpload'
import { ref } from 'vue';
    export default {
        setup(){

            let storageRef = storage.ref()
            let imageRef = storageRef.child('images');
            let {user} = getUser();

            // this fun will upload user image
            let uploadHandler = (event)=>{
                imageUpload(event);
            }

            // Get the authenticated user's ID
            let userId = auth.currentUser.uid;
            // Retrieve a list of all files in the "images" folder
            imageRef.listAll().then((result) => {
                result.items.forEach((itemRef) => {
                // Get the metadata for each file
                    itemRef.getMetadata().then((metadata) => {
                        // Check if the file belongs to the current user
                        if (metadata.customMetadata.user_id === userId) {
                        // Get the download URL for the image
                        itemRef.getDownloadURL().then((url) => {
                            let img = document.createElement('img')
                            img.src = url
                            img.style.width = '75px'
                            img.style.height = 'auto'
                            
                            let container = document.querySelector(".profile_img")
                            container.appendChild(img)
                        }).catch((error) => {
                            // Handle any errors that occur while retrieving the download URL
                            console.error('Error retrieving download URL:', error);
                            });
                        }
                    });
                });
            }).catch((error) => {
            // Handle any errors that occur while listing the images
            console.error('Error retrieving image list:', error);
            });

            return {uploadHandler, user}

        }
    }
</script>

<style>

</style>