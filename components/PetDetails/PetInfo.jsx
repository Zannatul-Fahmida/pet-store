import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors.ts";
import MarkFav from "../MarkFav.jsx";

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet.imgUrl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "sofadi",
              fontSize: 27,
              color: Colors.PINK,
              fontWeight: "bold",
            }}
          >
            {pet?.name}
          </Text>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            {pet?.address}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
