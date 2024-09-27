import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/FirebaseConfig.js';

const GetFavList = async (user) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // Create a new document if it doesn't exist and return an empty favorites array
    await setDoc(docRef, {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: []
    });
    return { email: user?.primaryEmailAddress?.emailAddress, favorites: [] }; // Return the new document structure
  }
};

const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
  } catch (e) {
    console.error("Error updating favorites: ", e);
  }
};

export default {
  GetFavList,
  UpdateFav,
};
