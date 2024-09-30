import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc, getDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import { Timestamp } from "firebase/firestore"; // Add Timestamp for createdAt

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUserDetails();

    const messagesRef = collection(db, 'Chat', params?.id, 'Messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgData = snapshot.docs.map((doc) => ({
        _id: doc.id,  // Firestore document ID
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),  // Ensure proper date conversion
      }));
      setMessages(msgData);
    }, (error) => {
      console.error("Error fetching messages: ", error);
    });

    return () => unsubscribe();
  }, []);

  const getUserDetails = async () => {
    try {
      const docRef = doc(db, "Chat", params?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        const otherUser = result?.users?.filter(
          (item) => item.email !== user?.primaryEmailAddress?.emailAddress
        );

        if (otherUser.length > 0) {
          navigation.setOptions({
            headerTitle: otherUser[0].name,
          });
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };

  const onSend = async (newMsg) => {
    // Ensure the message includes a valid user object
    const messageToSend = {
      ...newMsg[0],
      createdAt: Timestamp.now(), // Use Firebase's serverTimestamp
      user: {
        _id: user?.primaryEmailAddress?.emailAddress, // Use email as user ID
        name: user?.fullName,
        avatar: user?.imageUrl,
      },
    };
  
    // Append the message to the local state
    setMessages((prevMsg) => GiftedChat.append(prevMsg, messageToSend));
  
    // Send the message to Firebase
    try {
      await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageToSend);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
      renderAvatarOnTop={true} // Optional: Better avatar placement
      alwaysShowSend={true}    // Optional: Always show send button
    />
  );
}
