import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NaviScreen() {

    const navigation = useNavigation();

  useEffect(() => {
    userapprove();

  })
 
  const userapprove = async () => {
    const userasync = await AsyncStorage.getItem('login');
    if(userasync === 'Userapprove'){
console.log('a')
    navigation.navigate('BottomNav')
  }else{
    navigation.navigate('OnBoarding')
    console.log('a')
  }
  }

 
  return (
    <View style={{flex:1,backgroundColor:'#434345'}}>
    <ImageBackground style={{flex:1}}
    source={require('../assets/bcsplash.png')}
    resizeMode='contain'
    >
    </ImageBackground>
    </View>
  )
}

