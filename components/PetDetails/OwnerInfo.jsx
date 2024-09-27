import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Image
          source={{ uri: pet?.userImg }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text
            style={{
              fontFamily: "inter",
              fontSize: 17,
            }}
          >
            {pet?.userName}
          </Text>
          <Text
            style={{
              fontFamily: "inter",
              color: Colors.GRAY,
            }}
          >
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: Colors.PRIMARY,
    justifyContent: "space-between",
  },
});