import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";
import { FontAwesome5 } from "@expo/vector-icons";

export default function PetListItem({ pet, isUserPost, onDeletePost }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={{
        flex: 1,
        padding: 10,
        marginRight: 15,
        marginBottom: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        height: 200, 
      }}
    >
      {isUserPost ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 10,
            right: 10,
            top: 10, 
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => onDeletePost(pet.id)} 
        >
        <FontAwesome5 name="trash-alt" size={24} color='red' />
        </TouchableOpacity>
      ) : (
        <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
          <MarkFav pet={pet} color={"white"} />
        </View>
      )}
      <Image
        source={{ uri: pet?.imgUrl }}
        style={{
          width: "100%",
          height: 135,
          resizeMode: "cover", 
        }}
      />
      <Text
        style={{
          fontFamily: "inter",
          fontSize: 18,
          marginTop: 5, 
        }}
      >
        {pet?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.GRAY,
            fontFamily: "inter",
            fontSize: 12,
          }}
        >
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "inter",
            color: Colors.PINK,
            backgroundColor: Colors.LIGHT_PINK,
            paddingHorizontal: 7,
            fontSize: 10,
            borderRadius: 10,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
