// UserListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

const Addcard = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [cardname,setCardname] = useState('');
  const [money,setMoney] = useState('');
  const navigations = useNavigation();

  const getcard = async () => {
    try {
      const cardsold = await AsyncStorage.getItem('cards');
      

      const parsedCards = JSON.parse(cardsold || '[]');
      setCards(parsedCards);
    } catch (error) {
      console.error('Kartları alma hatası:', error);
    }
  };
  getcard();
   
  const createrCard = async () => {
    try {

      if(cardname.length >= 1){    
      const newCard = { id: Date.now().toString(), name: cardname, balance: money };
      const updatedCards = [...cards, newCard];
      await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));
      setCards(updatedCards)
      console.log('truess')
      setCardname('')
      setMoney('0')
      navigations.navigate('Cards')
    }else{
      console.log('false')
    }
    } catch (error) {
      console.error('Kart oluşturma hatası:', error);
    }
  };



  return (
    <View style={styles.container}>
        <Pressable style={styles.goback} onPress={() => navigation.goBack('')}><Ionicons name="arrow-back" size={26} color="black" /></Pressable>
        <View style={styles.cashaccount}>
            <View style={styles.cashimage}>
                <Image
                  source={require('../assets/processcard.png')}
                  resizeMode='cover'
                  style={{width:'70%',height:'70%'}}
                  />
            </View>
            <Text style={{marginTop:10,fontSize:17,color:'white'}}>{cardname}</Text>
        </View>
        
     <TextInput
     style={styles.processinput}
      placeholder='Enter a card name. . . '
     value={cardname}
     onChangeText={(text) => setCardname(text)}
     />
      <TextInput
     style={styles.processinput}
      placeholder='Enter a amount. . . '
      keyboardType='number-pad'
     value={money}
     onChangeText={(text) => setMoney(text)}
     />
     <TouchableOpacity onPress={createrCard} style={styles.sendbutton}><Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Add</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#434345',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cashaccount: {
        width:width * 0.9,
        justifyContent:'center',
        alignItems:'center'
    },
    cashimage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius:width * 0.2,
        overflow:'hidden',
        backgroundColor:'#f5effb',
        justifyContent:'center',
        alignItems:'center'
    },
    sendbutton: {
        width: width * 0.9,
        height: height * 0.08,
        backgroundColor:'#9da2fe',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    processinput: {
        width: width * 0.9,
        height: height * 0.08,
        backgroundColor:'#fff',
        marginTop:10,
        borderRadius:20,
        textAlign:'center'
    },
    goback: {
        width:60,
        height:60,
        borderRadius:60,
        backgroundColor:'#fff',
        position:'absolute',
        top:height * 0.04,
        left:width * 0.03,
        justifyContent:'center',
        alignItems:'center',
    }
})
export default Addcard;