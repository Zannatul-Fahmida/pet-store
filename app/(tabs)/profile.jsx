import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const menu = [
    {
      id: 1,
      name: "Add new pet",
      icon: "paw",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "My posts",
      icon: "bookmark",
      path: "/../user-post",
    },
    {
      id: 3,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 4,
      name: "Inbox",
      icon: "inbox",
      path: "/(tabs)/inbox",
    },
    {
      id: 5,
      name: "Log out",
      icon: "sign-out",
      path: "logout",
    },
  ];

  const { user } = useUser();
  const router = useRouter();
  const {signOut} = useAuth();

  const onPressMenu = (menu) => {
    if (menu.path == "logout") {
      signOut();
      router.push('/login')
      return;
    }
    router.push(menu.path);
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "sofadi",
          fontSize: 30,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
          }}
        />
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 20,
            fontWeight: 700,
            marginTop: 6,
          }}
        >
          {user?.fullName}
        </Text>
        <Text style={{ fontFamily: "inter", fontSize: 16, color: Colors.GRAY }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            key={index}
            style={{
              marginVertical: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: Colors.WHITE,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <FontAwesome
              name={item.icon}
              size={30}
              color={Colors.PINK}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: Colors.LIGHT_PINK,
              }}
            />
            <Text style={{ fontFamily: "inter", fontSize: 20 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
