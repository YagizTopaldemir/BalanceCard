import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const {width,height} = Dimensions.get('window');


export default function Cards() {
  const [cashbalance,setCashbalance] = useState(0);
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();
   
  useFocusEffect(
    React.useCallback(() => {
      fetchCards();
      getStoredBalance();
    }, [])
  );


 
  

  const fetchCards = async () => {
    try {
      
      const storedCards = await AsyncStorage.getItem('cards');
      await AsyncStorage.getItem('Cashmoney');
      if (storedCards !== null) {
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
  
      console.error('Kartları alma hatası:', error);
    }
  };

  const getStoredBalance = async () => {
    try {
      const storedBalance = await AsyncStorage.getItem('Cashmoney');
      if (storedBalance !== null) {
        setCashbalance(storedBalance);
      } else {
        setCashbalance('0');
        console.log('Cash balance not found in AsyncStorage');
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
    navigation.navigate('CardsProcess', { card });
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.upperview}>
         <TouchableOpacity onPress={refresh} style={styles.homepic}><SimpleLineIcons name="refresh" size={24} color="black" /></TouchableOpacity>
         <View style={styles.username}><Text style={styles.usernametext}>Cards</Text></View>
         <TouchableOpacity style={styles.process}><Feather name="credit-card" size={24} color="black" /></TouchableOpacity>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
    
       {cards.map((item) => (
          <TouchableOpacity onPress={() => navigateToCardDetail(item)} key={item.id} style={{overflow:'hidden',width:width * 0.9,height: height * 0.25,marginTop:10,borderRadius:20,alignItems:'center',paddingTop:20, borderBottomWidth: 1,backgroundColor:'#434345',borderBottomColor: '#ebdff5' }}>
           <View style={{backgroundColor:'#fff',width:'100%',height:'50%',position:'absolute',top:0,opacity:0.02}}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignItems:'center',height:'25%'}}>
            <Text style={{color:'white',fontSize:25}}>{item.name}</Text>
          <Text style={{color:'#ffdd9d',fontWeight:'bold',fontSize:15}}>BALANCE</Text>
           </View>
           <View style={{width:'90%',height:'30%',marginTop:15}}>
            <Text style={{fontSize:25,color:'white'}}>****  ****  ****  1222</Text>
           </View>
           <View style={{width:'90%',height:'25%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{color:'#ffdd9d',fontSize:23}}>{item.balance},00$</Text>
            <Text style={{color:'white',opacity:0.7}}>03/24</Text>
           </View>
       
          </TouchableOpacity>
      ))}
       <TouchableOpacity style={styles.cardcash}>
       <View style={{backgroundColor:'#fff',width:'100%',height:'50%',position:'absolute',top:0,opacity:0.02}}></View>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignItems:'center',height:'15%'}}>
            <Text style={{color:'white',fontSize:25}}>Cash</Text>
          <Text style={{color:'#9da2fe',fontWeight:'bold',fontSize:15}}>BALANCE</Text>
           </View>
           <View style={{width:'90%',height:'30%',marginTop:15}}>
       
           </View>
           <View style={{width:'90%',height:'20%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{color:'#9da2fe',fontSize:23}}>{cashbalance},00$</Text>
            <Text style={{color:'white',opacity:0.7}}>03/24</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addcard}  onPress={() => navigation.navigate('Addcard')}>
          <View style={styles.addbutton}><Ionicons name="add-circle-outline" size={45} color="#e0d4ea" /></View>
        </TouchableOpacity>
        <View style={{width:width * 0.9,height: height * 0.1}}></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#e0d4ea',
    flex:1,
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
  process: {
    width: 60,
    height: 60,
    backgroundColor: '#cdc0da',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  addcard: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius:25,
    backgroundColor: '#f5effb',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  addbutton: {
    width:width * 0.2,
    height:width * 0.2,
    backgroundColor:'#434345',
    borderRadius:width * 0.2,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  cardcash: {
    width: width * 0.9,
    height: height * 0.25,
    borderRadius:25,
    backgroundColor: '#434345',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  }
})