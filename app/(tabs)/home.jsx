import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SignOutButton } from "@clerk/clerk-expo/web";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <ScrollView style={{ padding: 20, marginTop: 20 }}>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Pet List + Category */}
      <PetListByCategory />
      {/* Add new pet options */}
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          padding:20,
          marginVertical: 20,
          backgroundColor: Colors.LIGHT_PINK,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          borderStyle: 'dotted',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PINK} />
        <Text style={{fontFamily: 'Inter', color: Colors.PINK, fontSize: 18}}>Add New Pet</Text>
      </TouchableOpacity>
      <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
    </ScrollView>
  );
}
