import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const {width,height} = Dimensions.get('window');

export default function CashProcess() {
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('option2');
    const [cashproc,setCashproc] = useState('');
    const [oldmoneys,setOldmoney] = useState('');
    const [oldprocess,setOldprocess] = useState([]);


    useEffect(() => {
        const cashchange = async () => {
           
                const oldmoney = await AsyncStorage.getItem('Cashmoney');
                setOldmoney(oldmoney)
        }
        cashchange();
 
    },[])
    
    

    const cashchange = async () => {
        if(cashproc.length >= 1){
              
          
            const oldmoneyspar = parseInt(oldmoneys);
            const newcash = parseInt(cashproc)

            if(selectedValue === 'option2'){
                const total = oldmoneyspar + newcash
                console.log(total)
                await AsyncStorage.setItem('Cashmoney',JSON.stringify(total)) 
                createrpshistory();   
            }else{
                const total = parseInt(oldmoneys) - parseInt(cashproc)
                console.log(total)
                await AsyncStorage.setItem('Cashmoney',total.toString())  
                createrpshistory(); 
            }

        
         
        }else{
            console.log('hata 123')
        }
    
    }


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
        console.log(oldprocess)
    
        try {
    
          if(2 >= 1){    
          const newprocess = { id: Date.now().toString(), name: 'Cash',nameslice: 'C', balance: cashproc,value: selectedValue === 'option2' ? '+' : '-' };
          console.log(newprocess)
     
          const updatedprocess = [...oldprocess, newprocess];
          await AsyncStorage.setItem('prohistory', JSON.stringify(updatedprocess));
          console.log(updatedprocess)
          setOldprocess(updatedprocess)
          console.log('truess')
          navigation.navigate('Processhistory')
          console.log(oldprocess)

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
            <Text style={{marginTop:10,fontSize:17}}>Cash</Text>
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
     style={styles.processinput} 
     keyboardType='number-pad'
      placeholder='Enter a number. . . '
     value={cashproc}
     onChangeText={(text) => setCashproc(text)}
     />
     <TouchableOpacity onPress={cashchange} style={styles.sendbutton}><Text style={{color:'white',fontSize:25,fontWeight:'bold'}}>Send</Text></TouchableOpacity>
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
        backgroundColor:'#f5effb',
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