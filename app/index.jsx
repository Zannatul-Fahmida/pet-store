import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isLoaded: userLoaded, user } = useUser(); 
  const rootNavigationState = useRootNavigationState();

  const [isNavReady, setIsNavReady] = useState(false); 

  useEffect(() => {
    if (rootNavigationState?.key) {
      setIsNavReady(true);
    }
  }, [rootNavigationState]);

  if (!userLoaded || !isNavReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/get-started" />
      )}
    </View>
  );
}
