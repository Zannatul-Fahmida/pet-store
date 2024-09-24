import { View, Text } from 'react-native'
import React from 'react'
import { SignOutButton } from '@clerk/clerk-expo/web'
import Header from '../../components/Home/Header'

export default function Home() {
  return (
    <View style={{padding: 20, marginTop: 20}}>
    {/* Header */}
    <Header />
    {/* Slider */}
    {/* Category */}
    {/* List of pets */}
    {/* Add new pet options */}
    <SignOutButton>
    <button>Sign out</button>
  </SignOutButton>
    </View>
  )
}