import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '../../constants/Colors';

export default function PetSubInfoCard({icon, title, value}) {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
        boxShadow: '1px 1px 5px #8F8e8d'
      }}>
      <FontAwesome5 name={icon} size={30} color={Colors.PRIMARY} />
      <View style={{flex: 1}}>
      <Text style={{fontFamily: 'Inter', fontSize: 12, color: Colors.GRAY}}>{title}</Text>
      <Text style={{fontFamily: 'Inter', fontSize: 14,}}>{value}</Text>
      </View>
      </View>
  )
}