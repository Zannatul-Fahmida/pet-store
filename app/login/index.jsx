import { View, Text, Pressable, Platform, TextInput } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../constants/Colors.ts";
import * as WebBrowser from "expo-web-browser";
import { useClerk, useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "web") {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const activeSession = signIn.createdSessionId;

      if (activeSession) {
        await signIn.signOut();
      }

      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        console.error(
          "Sign-in attempt not complete:",
          JSON.stringify(signInAttempt, null, 2)
        );
      }
    } catch (err) {
      console.error("Error during sign-in process:", err);
      if (err.response) {
        console.error("Error response:", err.response);
        console.error("Error status:", err.response.status);
        console.error(
          "Error data:",
          JSON.stringify(err.response.data, null, 2)
        );
      } else {
        console.error("Error details:", JSON.stringify(err, null, 2));
      }
    }
  }, [isLoaded, emailAddress, password]);

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        router.replace("/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE, padding: 20 }}>
      {/* Header */}
      <View
        style={{
          paddingVertical: 40,
          backgroundColor: Colors.PRIMARY,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 36,
            color: Colors.WHITE,
            fontWeight: "bold",
          }}
        >
          Welcome Back,
        </Text>
        <Text
          style={{
            fontFamily: "inter",
            fontSize: 24,
            color: Colors.WHITE,
          }}
        >
          Log In to Continue
        </Text>
      </View>

      {/* Form */}
      <View
        style={{
          backgroundColor: Colors.WHITE,
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        {/* Email Input */}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          onChangeText={setEmailAddress}
          style={{
            backgroundColor: Colors.ASH,
            padding: 15,
            borderRadius: 10,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        {/* Password Input */}
        <TextInput
          value={password}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={{
            backgroundColor: Colors.ASH,
            padding: 15,
            borderRadius: 10,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          style={{
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>OR</Text>
        </View>

        {/* Google Sign In Button */}
        <Pressable
          onPress={onPress}
          style={{
            padding: 14,
            backgroundColor: Colors.ASH,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: "inter",
              fontWeight: "600",
              fontSize: 18,
              marginLeft: 8,
            }}
          >
            Sign in with Google
          </Text>
        </Pressable>

        {/* Sign Up Link */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#888", fontSize: 16 }}>
            Don't have an account?
          </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  fontSize: 16,
                  marginLeft: 5,
                  fontWeight: "600",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
