import { View, Text, StyleSheet, Dimensions, useWindowDimensions, Image, TextInput, Button, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get('window')

export default function OnBoardingItem({item}) {
    const [username,setUsername] = useState('');
    const navigation = useNavigation();
  
    const register = async () => {
    if(username.length === 0){
     console.log('user false')
    }else{
    try {
       
        await AsyncStorage.setItem('user',username);
        await AsyncStorage.setItem('login','Userapprove');
        navigation.navigate('BottomNav')
        console.log('user true')
  
    } catch (error){
        console.error('Error saving data:', error);
    }
    }
    }
  return (
    <View style={[styles.container,{width}]}>
        <View style={{flex:1,width:width,position:'absolute',opacity:0.2,alignItems:'center'}}>
            
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
            <Text style={{fontSize:width * 0.15}}>BalanceCard</Text>
           

        </View>
        <Image source={item.image} style={[styles.image, {width: width * 0.8, resizeMode: 'contain'}]} />

        <View style={{flex: 0.4,display:item.display}}>
            <Text style={[styles.title,{color: item.color}]}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={{flex: 0.4,display:item.displayname,alignItems:'center',}}>
            <Text style={[styles.title,{color: item.color}]}>{item.title}</Text>
            <TextInput placeholder='Enter a name. . .' style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
            />
           
            <TouchableOpacity style={styles.button} onPress={register}><Text style={{color:'#ffdd9d',fontWeight:600,fontSize:18}}>Continue</Text></TouchableOpacity>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    image: {
        flex: 0.6,
        justifyContent:'center',
        transform: [{ rotate: '-10deg' }],

       
    },
    title: {
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        paddingLeft:20,
        paddingRight:20,
  
     
    },
    description: {
        fontWeight: '400',
        color:'#fff',
        paddingLeft:20,
        paddingRight:20,
        opacity: 0.6,
    },
    input: {
        width: width * 0.8,
        height: 50,
        backgroundColor: '#ffdd9d',
        borderRadius:15,
        paddingLeft:10,
        marginTop:10,
        color:'black'
    },
    button: {
        width: width * 0.5,
        backgroundColor:'transparent',
        borderColor:'#ffdd9d',
        borderWidth:3,
        borderRadius:15,
        height:40,
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
    }
});