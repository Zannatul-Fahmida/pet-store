import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import PetListItem from "./PetListItem"; // Ensure this component is correct
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const screenWidth = Dimensions.get("window").width;

export default function UrgentPosts() {
  const [urgentPosts, setUrgentPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
    <View style={{ width: screenWidth / 2 - 15, marginRight: 10 }}>
      <PetListItem pet={item} />
    </View>
  );

  return (
    <View style={{
        marginBottom: 20,
        marginTop: 10,
    }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "sofadi",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Urgent Adoption
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 9,
            paddingVertical: 3,
            borderWidth: 1,
            borderStyle: "dotted",
            borderColor: Colors.RED,
            borderRadius: 5,
          }}
          onPress={() => router.push("/urgent-posts")}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              fontFamily: "inter",
              color: Colors.RED,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={urgentPosts.slice(0, 4)} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      />
    </View>
  );
}
