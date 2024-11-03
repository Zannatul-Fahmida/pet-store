import { View, Text, ScrollView, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import PetListItem from "../../components/Home/PetListItem";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import UrgentPosts from "../../components/Home/UrgentPosts";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    fetchAllPets();
  }, []);

  const fetchAllPets = async () => {
    try {
      const petsRef = collection(db, "Pets");
      const querySnapshot = await getDocs(petsRef);
      const petsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllPets(petsData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    if (searchText.trim() !== "") {
      const filtered = allPets.filter((pet) =>
        pet.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPets(filtered);
    } else {
      setFilteredPets([]);
    }
  }, [searchText, allPets]);

  return (
    <ScrollView style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Search Input with Icon */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderWidth: 1,
          borderColor: Colors.PINK,
          borderStyle: "dotted",
          paddingHorizontal: 10,
          height: 40,
          marginVertical: 20,
        }}
      >
        <EvilIcons
          name="search"
          size={24}
          color={Colors.GRAY}
          style={{ paddingBottom: 3 }}
        />
        <TextInput
          placeholder="Search for pets by name..."
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1 }}
        />
      </View>

      {/* Display Filtered Pet Cards */}
      {filteredPets.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Search Results
          </Text>
          <FlatList
            data={filteredPets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PetListItem pet={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      )}

      {/* Pet List + Category */}
      <PetListByCategory />

      {/* Add new pet options 
      <Link
        href={"/add-new-pet"}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          textAlign: "center",
          padding: 20,
          marginVertical: 20,
          backgroundColor: Colors.LIGHT_PINK,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          borderStyle: "dotted",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PINK} />
        <Text style={{ fontFamily: "Inter", color: Colors.PINK, fontSize: 18 }}>
          Add New Pet
        </Text>
      </Link> 
      */}

      {/*Urgent Adoption posts*/}
      <UrgentPosts />

    </ScrollView>
  );
}
