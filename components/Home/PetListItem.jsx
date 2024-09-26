import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function PetListItem({ pet }) {
    const router = useRouter();
  return (
    <TouchableOpacity
    onPress={()=>router.push({
        pathname: '/pet-details',
        params: pet
    })}
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: pet?.imgUrl }}
        style={{
          width: '100%',
          height: 135,
          objectFit: "cover",
        }}
      />
      <Text
        style={{
          fontFamily: "Inter",
          fontSize: 18,
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
            fontFamily: "Inter",
          }}
        >
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            color: Colors.PINK,
            backgroundColor: Colors.LIGHT_PINK,
            paddingHorizontal: 7,
            fontSize: 11,
            borderRadius: 10,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
