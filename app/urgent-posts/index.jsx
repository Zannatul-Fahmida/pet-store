import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig"; 
import PetListItem from "../../components/Home/PetListItem";

export default function UrgentPostsPage() {
  const navigation = useNavigation();
  const [urgentPosts, setUrgentPosts] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Urgent Adoptions",
    });
    fetchUrgentPosts();
  }, []);

  const fetchUrgentPosts = async () => {
    const q = query(collection(db, "Pets"), where("label", "==", "Urgent"));
    const querySnapshot = await getDocs(q);
    const urgentPets = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUrgentPosts(urgentPets);
  };

  const renderItem = ({ item }) => (
    <PetListItem pet={item} />
  );

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={urgentPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: 'space-between' }} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 20 }} 
      />
    </View>
  );
}
