import { View, Text } from 'react-native'
import React from 'react'
import { SignOutButton } from '@clerk/clerk-expo/web'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'

export default function Home() {
  return (
    <View style={{padding: 20, marginTop: 20}}>
    {/* Header */}
    <Header />
    {/* Slider */}
    <Slider />
    {/* Pet List + Category */}
    <PetListByCategory />
    {/* Add new pet options */}
    <SignOutButton>
    <button>Sign out</button>
  </SignOutButton>
    </View>
  )
}