import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons';
const {width,height} = Dimensions.get('window');

export default function Process() {
  const [cashbalance,setCashbalance] = useState(0);
  const [cards, setCards] = useState([]);

  const navigation = useNavigation();
  
  const fetchCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('cards');
      if (storedCards !== null) {
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error('Kartları alma hatası:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
      getStoredBalance();
    }, [])
  );


  const getStoredBalance = async () => {
    try {
      const storedBalance = await AsyncStorage.getItem('Cashmoney');
      if(storedBalance !== null){
        setCashbalance(storedBalance)
   
      }else{
        setCashbalance('0')
        await AsyncStorage.setItem('Cashmoney','0')
      }
    

    } catch (error) {
      console.error('Error retrieving Cash balance from AsyncStorage:', error);
    }
  };


  const refresh = () => {
    getStoredBalance();
    fetchCards();
  }
  
  const navigateToCardDetail = (card) => {
    navigation.navigate('ChangeBalance', { card });
  };


  return (
    <View style={styles.container}>
      <View style={styles.upperview}>
         <TouchableOpacity onPress={refresh} style={styles.homepic}><SimpleLineIcons name="refresh" size={24} color="black" /></TouchableOpacity>
         <View style={styles.username}><Text style={styles.usernametext}>Process</Text></View>
         <TouchableOpacity style={styles.cards}><AntDesign name="swap" size={24} color="black" /></TouchableOpacity>
      </View>
      <ScrollView>
        {cards.map((item) => (
          <TouchableOpacity onPress={() => navigateToCardDetail(item)} key={item.id} style={{width:width * 0.9,height:height * 0.1,backgroundColor:'#434345',borderRadius:20,marginTop:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:3}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
           <View style={{width:width * 0.1,height:width * 0.1,backgroundColor:'#f5effb',marginLeft:10,borderRadius:width * 0.1,justifyContent:'center',alignItems:'center'}}>
             <Image
            source={require('../assets/processcard.png')}
            resizeMode='cover'
            style={{width:'70%',height:'70%'}}
           />
       
                 </View>
                 <Text style={{color:'white',marginLeft:10}}>{item.name}</Text>
                 </View>
                 <Text style={{marginRight:20,color:'white'}}>{item.balance},00$</Text>
            
          </TouchableOpacity>
        ))}
          <TouchableOpacity onPress={() => navigation.navigate('Cash')}  style={{width:width * 0.9,height:height * 0.1,backgroundColor:'#434345',borderRadius:20,marginTop:10,alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:3}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
           <View style={{width:width * 0.1,height:width * 0.1,backgroundColor:'#f5effb',marginLeft:10,borderRadius:width * 0.1,justifyContent:'center',alignItems:'center'}}>
             <Image
            source={require('../assets/processcard.png')}
            resizeMode='cover'
            style={{width:'70%',height:'70%'}}
           />
       
                 </View>
                 <Text style={{color:'white',marginLeft:10}}>Cash</Text>
                 </View>
                 <Text style={{marginRight:20,color:'white'}}>{cashbalance},00$</Text>
            
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#e0d4ea',
    alignItems:'center',
  },
  upperview: {
    marginTop:height* 0.03,
    width:width * 0.9,
    height:height * 0.1,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  homepic: {
    width: 60,
    height: 60,
    backgroundColor: '#f4eefa',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  usernametext: {
    fontSize:width * 0.05,
  },
  cards: {
    width: 60,
    height: 60,
    backgroundColor: '#cdc0da',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
})