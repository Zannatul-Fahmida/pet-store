import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors.ts";
import { Link } from "expo-router";

export default function GetStartedScreen() {
  return (
    <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
      <Image
        source={require("../../assets/images/3811024.jpg")}
        style={{ width: "100%", height: 340 }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontFamily: "sofadi", fontSize: 32, textAlign: "center" }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pet which you like and make their life happy again
        </Text>
        <Link
          href={"/login"}
          style={{
            padding: 14,
            marginTop: 40,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "inter",
              fontWeight: 600,
              fontSize: 20,
            }}
          >
            Get Started
          </Text>
        </Link>
        <Text style={{ fontFamily: "inter", fontSize: 16, marginTop: 10 }}>
          Don't have an account?{" "}
          <Link style={{ fontWeight: 700 }} href={"/signup"}>
            Signup
          </Link>
        </Text>
      </View>
    </View>
  );
}
