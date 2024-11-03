import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors.ts";
import MarkFav from "../MarkFav.jsx";

export default function PetInfo({ pet }) {
  const label = pet?.label; 
  let labelStyle = {};

  if (label === "Featured") {
    labelStyle = {
      backgroundColor: "#FFD700", 
      color: Colors.WHITE,
    };
  } else if (label === "Urgent") {
    labelStyle = {
      backgroundColor: "#FF4500", 
      color: Colors.WHITE,
    };
  } else if (label === "Top") {
    labelStyle = {
      backgroundColor: "#1E90FF", 
      color: Colors.WHITE,
    };
  } else {
    labelStyle={
      color: 'transparent',
    }
  }

  return (
    <View>
      <Image
        source={{ uri: pet?.imgUrl }}
        style={{
          width: "100%",
          height: 400,
          position: "relative",
          resizeMode: "cover", 
        }}
      />
      {label && (
        <View
          style={{
            position: "absolute",
            bottom: 110,
            right: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: labelStyle.backgroundColor,
            zIndex: 1, 
          }}
        >
          <Text
            style={{
              color: labelStyle.color,
              fontFamily: "inter",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {label}
          </Text>
        </View>
      )}
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
