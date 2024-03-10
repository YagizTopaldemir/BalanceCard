import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const {width,height} = Dimensions.get('window');

export default function CardProcess({ route }) {
    const { card } = route.params;
    const navigation = useNavigation();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        
        async function getcards() {
          try {
            const storedKarts = await AsyncStorage.getItem('cards');
            if (storedKarts !== null) {
              setCards(JSON.parse(storedKarts));
            }
          } catch (error) {
            console.error('Veri alınamadı:', error);
          }
        }
    
        getcards();
      }, []);

      const deleteItemFromAsyncStorage = async (id) => {
   
        const updatedNotes = cards.filter((note) => note.id !== id);
        setCards(updatedNotes);
        const updatedNotesString = JSON.stringify(updatedNotes);
        await AsyncStorage.setItem('cards', updatedNotesString);
        navigation.navigate('Cards')
     
    };

    return (
        <View style={styles.container}>
        <Pressable style={styles.goback} onPress={() => navigation.goBack('')}><Ionicons name="arrow-back" size={26} color="black" /></Pressable>
        <View style={{width:width * 0.6,height:height * 0.5,backgroundColor:'#434345',justifyContent:'center',alignItems:'center',borderRadius:20}}>
        <View style={styles.cashaccount}>
            <View style={styles.cashimage}>
                <Image
                  source={require('../assets/processcard.png')}
                  resizeMode='cover'
                  style={{width:'70%',height:'70%'}}
                  />
            </View>
            
        </View>
        <Text style={{marginTop:10,fontSize:18,color:'white'}}>{card.name}</Text>
        <Text style={{marginTop:10,fontSize:18,color:'white'}}>{card.balance},00$</Text>
        </View>
        <Text onPress={() => deleteItemFromAsyncStorage(card.id)} style={{marginTop:15}}><AntDesign name="delete" size={26} color="#E32636" /></Text>
         </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e0d4ea',
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