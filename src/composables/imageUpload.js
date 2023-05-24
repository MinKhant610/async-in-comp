import { storage } from "@/firebase/config";
import getUser from "./getUser";

let selected_file = null;
let storageRef = storage.ref()
let imageRef = storageRef.child('images');
let {user} = getUser();

let imageUpload = (event)=>{
    selected_file = event.target.files[0].name;
    let file_path = event.target.files[0];
    let spaceRef = imageRef.child(selected_file)
    let file_type = event.target.files[0].type;

    let metadata = {
        contentType : file_type,
        customMetadata : {
            'user_id' : user.value.uid
        }
    }
    spaceRef.put(file_path, metadata).then((snapshot)=>{
        console.log('upload file successfully')
    })
}

export default imageUpload;