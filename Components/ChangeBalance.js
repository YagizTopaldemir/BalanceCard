import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const {width,height} = Dimensions.get('window');

export default function ChangeBalance({ route }) {
    const [amount,setAmount] = useState('');
    const { card } = route.params;
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('option2');
    const [oldprocess,setOldprocess] = useState([]);
    const [cardname,setCardname] = useState('');
 



 useEffect(() => {
  getpshistory();
  setCardname(card.name)
  console.log(oldprocess)

 }, [])
 
    

    const updateCardBalance = async () => {
        try {
     
          const cardId = card.name;
  
        
          const storedData = await AsyncStorage.getItem('cards');
  
          if (storedData) {
         
            const parsedData = JSON.parse(storedData);
  
           
            const selectedCardIndex = parsedData.findIndex((c) => c.name === cardId);
  
            if (selectedCardIndex !== -1) {
              if(selectedValue === 'option2'){
                parsedData[selectedCardIndex].balance = parseInt(parsedData[selectedCardIndex].balance) + parseInt(amount); 
               
              }else{
                parsedData[selectedCardIndex].balance = parseInt(parsedData[selectedCardIndex].balance) - parseInt(amount); 
            
             
              }
              
             
              await AsyncStorage.setItem('cards', JSON.stringify(parsedData));
        
              createrpshistory();

              console.log('Kartın balance değeri başarıyla güncellendi:', parsedData[selectedCardIndex].balance );
             
            } else {
              console.log('Belirtilen ID ile eşleşen kart bulunamadı.');
            }
          } else {
            console.log('Belirtilen "cards" anahtar (key) ile eşleşen veri bulunamadı.');
          }
        } catch (error) {
          console.error('Error updating card balance:', error);
        }
      };
  
   
      const getpshistory = async () => {
        try {
          const pshistoryold = await AsyncStorage.getItem('prohistory');
     
    
          const parsedpshistory = JSON.parse(pshistoryold || '[]');
          setOldprocess(parsedpshistory);
        } catch (error) {
          console.error('Kartları alma hatası:', error);
        }
      };
      
      getpshistory();
      const createrpshistory = async () => {
    
        try {
    
          if(cardname.length >= 1){    
         
      
          
          const newprocess = { id: Date.now().toString(), name: cardname,nameslice: cardname.slice(0,1), balance: amount,value: selectedValue === 'option2' ? '+' : '-' };
          console.log(newprocess)
          const updatedprocess = [...oldprocess, newprocess];
          await AsyncStorage.setItem('prohistory', JSON.stringify(updatedprocess));
        
          setOldprocess(updatedprocess)
          console.log('truess')
          navigation.navigate('Processhistory')
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
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={{color:'black'}}>{card.name}</Text>
        <Text style={{color:'black'}}>{card.balance},00$</Text>
        </View>
        <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={{width:width * 0.9}}
      >
        <Picker.Item label="Minus -" value="option1" />
        <Picker.Item label="Plus +" value="option2" />
      </Picker>
        <TextInput
        placeholder='Enter a amount'
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType='number-pad'
        style={styles.processinput}
        />
        <TouchableOpacity onPress={updateCardBalance}  style={styles.sendbutton}><Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Add</Text></TouchableOpacity>
 
 
    </View>
  )
}


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
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    sendbutton: {
        width: width * 0.9,
        height: height * 0.08,
        backgroundColor:'#434345',
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