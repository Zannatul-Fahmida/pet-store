import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { query } from "firebase/database";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, deleteDoc, getDocs, where } from "firebase/firestore";
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

  // used to get user post
  const getUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserPostList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  const onDeletePost = (docId)=>{
    Alert.alert('Do you want to delete?', 'If you delete this post it cannot be recover anymore',
      {
        text: 'Cancel',
        onPress: ()=>console.log('Cancel click'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: ()=>deletePost(docId),
        style: 'delete',
      }
    )
  }

  const deletePost = async(docId) =>{
    await deleteDoc(doc(db, 'Pets', docId));
    getUserPost();
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={getUserPost}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PetListItem pet={item} />
          </View>
        )}
      />
      {userPostList?.length==0 && <Text>No Post Found</Text>}
    </View>
  );
}
