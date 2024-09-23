import { Text, TextInput, TouchableOpacity, View, Pressable, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSignUp, useOAuth } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors.ts';
import { Link } from 'expo-router';
import * as Linking from 'expo-linking';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;
  
    try {
      await signUp.create({
        emailAddress,
        password,
        userAttributes: {
          firstName,
          lastName,
        },
      });
  
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)/home');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressGoogleAuth = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Handle successful Google OAuth
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE, padding: 20 }}>
      {/* Header */}
      <View
        style={{
          paddingVertical: 40,
          backgroundColor: Colors.PRIMARY,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          paddingHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: 'Inter', fontSize: 36, color: Colors.WHITE, fontWeight: 'bold', textAlign: 'center' }}>
          Create an Account
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 24, color: Colors.WHITE }}>
          Sign up to get started
        </Text>
      </View>

      {/* Sign Up Form */}
      {!pendingVerification && (
        <View
          style={{
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name"
            placeholderTextColor="#888"
            onChangeText={setFirstName}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />
          <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor="#888"
            onChangeText={setLastName}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email Address"
            placeholderTextColor="#888"
            onChangeText={setEmailAddress}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setPassword}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            onPress={onSignUpPress}
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: '600' }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ fontSize: 16, color: '#888' }}>OR</Text>
          </View>

          {/* Google Sign Up */}
          <Pressable
            onPress={onPressGoogleAuth}
            style={{
              padding: 14,
              backgroundColor: '#f3f4f6',
              borderRadius: 10,
              alignItems: 'center',
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.PRIMARY,
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 18,
                marginLeft: 8,
              }}
            >
              Sign up with Google
            </Text>
          </Pressable>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: '#888', fontSize: 16 }}>Already have an account?</Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={{ color: Colors.PRIMARY, fontSize: 16, marginLeft: 5, fontWeight: '600' }}>
                  Log in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}

      {/* Verification Form */}
      {pendingVerification && (
        <View
          style={{
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <TextInput
            value={code}
            placeholder="Enter verification code"
            placeholderTextColor="#888"
            onChangeText={setCode}
            style={{
              backgroundColor: '#f3f4f6',
              padding: 15,
              borderRadius: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            onPress={onPressVerify}
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.WHITE, fontSize: 18, fontWeight: '600' }}>
              Verify Email
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
