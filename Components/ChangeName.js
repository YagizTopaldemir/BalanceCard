// UserListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

const ChangeName = ({ navigation }) => {
const [name,setnanme] = useState('');
const [newname,setNewname] = useState('');
const navigations = useNavigation();

const usernameset = async () => {
    const usernameasync = await AsyncStorage.getItem('user')
     setnanme(usernameasync); 
  }


  useEffect(() => {
    usernameset();
  }, [])
  
const changename = async () => {
    const newusername = newname;
     await AsyncStorage.setItem('user',newusername)
     usernameset();
     navigations.navigate('Current')
  }

   

  return (
    <View style={styles.container}>
        <Pressable style={styles.goback} onPress={() => navigation.goBack('')}><Ionicons name="arrow-back" size={26} color="black" /></Pressable>
        <View style={styles.cashaccount}>
            <View style={styles.cashimage}>
            <AntDesign name="user" size={35} color="black" />
            </View>
            <Text style={{marginTop:10,fontSize:17,color:'white'}}>{name}</Text>
            <Text style={{marginTop:10,fontSize:17,color:'white'}}>new name: {newname}</Text>
        </View>
        
     <TextInput
     style={styles.processinput}
      placeholder='Enter a card name. . . '
      value={newname}
      onChangeText={(text) => setNewname(text)}
     />
 
     <TouchableOpacity onPress={changename} style={styles.sendbutton}><Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Change</Text></TouchableOpacity>
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
        width:width * 0.15,
        height:width * 0.15,
        borderRadius:width * 0.15,
        backgroundColor:'#fff',
        position:'absolute',
        top:height * 0.04,
        left:width * 0.03,
        justifyContent:'center',
        alignItems:'center',
    }
})
export default ChangeName;