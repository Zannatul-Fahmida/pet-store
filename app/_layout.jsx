import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    'sofadi': require("../assets/fonts/SofadiOne-Regular.ttf"),
    'inter': require("../assets/fonts/Inter_18pt-Regular.ttf"),
  })

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index" options={{headerShown: false}} />
    </Stack>
  );
}
