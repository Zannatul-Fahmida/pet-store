import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { query } from "firebase/database";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, deleteDoc, doc, getDocs, where } from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const [userPostList, setUserPostList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My posts",
    });
    user && getUserPost();
  }, [user]);

  const getUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserPostList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoader(false);
  };

  const onDeletePost = (docId) => {
    Alert.alert("Do you want to delete?", "If you delete this post it cannot be recovered anymore", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel click"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deletePost(docId),
        style: "destructive",
      },
    ]);
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    getUserPost();
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={getUserPost}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{width: '50%'}}>
          <PetListItem pet={item} isUserPost={true} onDeletePost={onDeletePost} />
          </View>
        )}
      />
      {userPostList?.length === 0 && <Text>No Post Found</Text>}
    </View>
  );
}
