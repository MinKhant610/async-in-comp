import { db } from "@/firebase/config";
import { ref } from "vue";

let save_value = ref(null);

let saveOrNot = async (postId, userId) => {
  try {
    let postRef = db.collection("posts").doc(postId);
    let userRef = postRef.collection("users").doc(userId);

    // Check if the user document exists
    let userDoc = await userRef.get();
    if (!userDoc.exists) {
      // If the user document doesn't exist, create it with initial values
      await userRef.set({ save_post: false });
    }

    // Retrieve the save_post value
    let dbRef = await userRef.get();
    save_value.value = dbRef.data();
  } catch (error) {
    console.log("Error fetching save_post value:", error);
  }

  return save_value;
};

export default saveOrNot;
