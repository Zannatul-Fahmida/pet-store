import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "Sofadi",
          fontSize: 20,
          fontWeight: 700,
          color: Colors.PINK,
        }}
      >
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{ fontFamily: "Inter", fontSize: 14, color: Colors.GRAY }}
      >
        {pet?.about}
      </Text>
      {readMore ? (
        <Pressable onPress={()=>setReadMore(false)}>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            Read More
          </Text>
        </Pressable>
      ):(
        <Pressable onPress={()=>setReadMore(true)}>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            Read Less
          </Text>
        </Pressable>
      )}
    </View>
  );
}
