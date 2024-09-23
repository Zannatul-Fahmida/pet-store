import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors.ts'

export default function LoginScreen() {
  return (
    <View style={{height: '100%', backgroundColor: Colors.White}}>
      <Image source={require('../../assets/images/3811024.jpg')} style={{width: '100%', height:340}} />
      <View style={{
        padding: 20,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily: 'sofadi', fontSize: 30, textAlign: 'center'}}>Ready to make a new friend?</Text>
      <Text style={{fontFamily: 'inter', fontSize: 18, textAlign: 'center', color: Colors.GRAY}}>Let's adopt the pet which you like and make their life happy again</Text>
      <Pressable style={{
        padding: 14,
        marginTop: 80,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        borderRadius: 14,
      }}>
      <Text style={{
        fontFamily: 'inter',
        fontWeight: 600,
        fontSize: 20,
        textAlign: 'center',
      }}>Get Started</Text>
      </Pressable>
      </View>
    </View>
  )
}

// <View style={{backgroundColor: Colors.PRIMARY}}>
//       <Text style={{fontFamily: 'Inter', fontSize: 32}}>Welcome Back,</Text>
//       <Text style={{fontFamily: 'Inter', fontSize: 32, fontWeight: 700}}>Log In!</Text>
//       </View>
//       <View></View>