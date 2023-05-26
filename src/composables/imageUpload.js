import { storage } from "@/firebase/config";
import { database } from "@/firebase/config";

let selected_file = null;
let storageRef = storage.ref()
let imageRef = storageRef.child('images');

let imageUpload = (event, user)=>{
    let userId = user.value.uid;
    selected_file = event.target.files[0].name;
    let file_path = event.target.files[0];
    let spaceRef = imageRef.child(selected_file)
    let file_type = event.target.files[0].type;

    let metadata = {
        contentType : file_type,
        customMetadata : {
            'user_id' : userId
        }
    }
    spaceRef.put(file_path, metadata).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((downloadURL)=>{
            database.ref('users/' + userId).set({
                username : user.value.displayName,
                profile_picture : downloadURL
              }).then(()=>{
                  console.log('image uploaded');
                }).catch((error)=>{
                  console.log('Error writing data :', error);
                });
        })
        console.log('upload file successfully')
    })
}

export default imageUpload;