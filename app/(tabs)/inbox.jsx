import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && getUserList();
  }, [user]);

  // get user list depends on current user emails
  const getUserList = async () => {
    setLoader(true);
    setUserList([]);

    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserList((prevList) => [...prevList, { ...doc.data(), id: doc.id }]);
    });
    setLoader(false);
  };

  // filter the list of other users in one state
  const mapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (usr) => usr?.email !== user?.primaryEmailAddress?.emailAddress // Compare with the logged-in user's email
      );
      if (otherUser && otherUser.length > 0) {
        const result = {
          docId: record.id, // Ensure that the document ID is included
          ...otherUser[0],  // Add the other user details
        };
        list.push(result);
      }
    });

    return list;
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "sofadi",
          fontSize: 30,
        }}
      >
        Inbox
      </Text>

      <FlatList
        data={mapOtherUserList()}
        refreshing={loader}
        onRefresh={getUserList}
        style={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  );
}
