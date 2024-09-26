import { View, Text } from 'react-native'
import React from 'react'
import PetSubInfoCard from './PetSubInfoCard'

export default function PetSubInfo({pet}) {
  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <PetSubInfoCard icon={'calendar-alt'} title={'Age'} value={pet?.age+" Years"} />
      <PetSubInfoCard icon={'bone'} title={'Breed'} value={pet?.breed} />
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <PetSubInfoCard icon={'transgender'} title={'Sex'} value={pet?.sex} />
      <PetSubInfoCard icon={'weight'} title={'Weight'} value={pet?.weight+" Kg"} />
      </View>
    </View>
  )
}