import { Alert, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const {width,height} = Dimensions.get('window');




export default function CurrentBalance() {
  const [process,setProcess] = useState([]);
  const [cards,setCards] = useState([])
  const [balances,setBalances] = useState('00')
  const [username,setUsername] = useState('');
  const [cashnew,setcashnew] = useState('0');
 const slicepro = process.slice(-2)
  const reversedArray = slicepro.reverse();
 

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      usernameset();
      getcardsa();
      getpshistory();
   
    }, [])
  );

  useEffect(() => {
    
    getcardsa();


     })

 
   

     const getcardsa = async () =>{
      const getcards = await AsyncStorage.getItem('cards')
    
     
      const getcashmoney = await AsyncStorage.getItem('Cashmoney')
       
      setCards(getcards)
      const cards = getcards ? JSON.parse(getcards) : 0;
      const totalBalance = cards.reduce((sum, card) => {
        const balance = parseFloat(card.balance) || 0; 
        return sum + balance;
      }, 0);
      if(getcashmoney !== null){
        setcashnew(getcashmoney)
   
      }else{
        setcashnew('0')
        await AsyncStorage.setItem('Cashmoney','0')
      }
    
      const lastbalance = totalBalance + parseInt(cashnew);
      setBalances(lastbalance);
       
    }

     const usernameset = async () => {
    const usernameasync = await AsyncStorage.getItem('user')
     setUsername(usernameasync); 
  }

 

  const refresh = () => {
    getcardsa();
    usernameset();
    getpshistory();
  }


  
 
  const getpshistory = async () => {
    try {
      const pshistoryold = await AsyncStorage.getItem('prohistory');

      const parsedpshistory = JSON.parse(pshistoryold || '[]');
      setProcess(parsedpshistory);
    } catch (error) {
      console.error('Kartları alma hatasıs:', error);
    }
  };
  
  return (
    <View style={styles.container}>
    <View style={styles.upperview}>
      <TouchableOpacity style={styles.userpic} onPress={() => navigation.navigate('ChangeName')}><FontAwesome name="user" size={30} color="black" /></TouchableOpacity>
      <View style={styles.username}><Text style={styles.usernametext}>BalanceCard</Text></View>
      <TouchableOpacity style={styles.process}><Ionicons name="home" size={30} color='black'/></TouchableOpacity>
    </View>
    <View style={styles.hi}><Text style={styles.hitext}>Hello,{username}</Text></View>
    <View style={styles.balancecardcont}>
      <View style={styles.backcard1}></View>
      <View style={styles.backcard2}></View>
      <View style={styles.balancecard}>
        <View style={styles.balancecardup}>
          <Text style={styles.yourbalancetext}>Your balance</Text>
          <TouchableOpacity style={styles.balancelogo} onPress={refresh}><SimpleLineIcons name="refresh" size={30} color="white" /></TouchableOpacity>
        </View>
        <View style={styles.balancepart}>
          <View style={styles.balance}>
            <Text style={{fontSize:20}}>$</Text>
            <Text style={{fontSize:35}}>{balances},00</Text>
          </View>
          <Text style={{marginTop:10}}>Token-128hdfv67dbfd9</Text>
        </View>
        <View style={styles.cardbuttons}>
          <TouchableOpacity style={styles.processbutton} onPress={() => navigation.navigate('Process')}><AntDesign name="swap" size={24} color="black" /></TouchableOpacity>
          <TouchableOpacity style={styles.cardsbutton}  onPress={() => navigation.navigate('Cards')}><FontAwesome name="credit-card" size={24} color="black" /></TouchableOpacity>
          <TouchableOpacity style={styles.copybutton} onPress={() => navigation.navigate('Processhistory')}><MaterialIcons name="history" size={24} color='color'/></TouchableOpacity>
        </View>
      </View>
    </View>
     <View style={styles.processhistorycont}>
      <View style={styles.phtitlecont}>
        <Text style={{fontSize:17}}>Process History</Text>
        <Text onPress={() => navigation.navigate('Processhistory')}>see all</Text>
      </View>
      {reversedArray.length > 0 ? (
  reversedArray.map((item) => {
    const timestamp = parseInt(item.id);
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear(); 
    const hours = date.getHours(); 
    const minute = date.getMinutes();
    const second = date.getSeconds(); 
 
    return (
      <TouchableOpacity key={item.id} style={{width: width * 0.9, height: height * 0.1, backgroundColor: '#ebdff5', borderRadius: 20, marginTop: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 3}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: width * 0.1, height: width * 0.1, backgroundColor: '#f5effb', marginLeft: 10, borderRadius: width * 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 17}}>{item.nameslice}</Text>
          </View>
          <View>
            <Text style={{color: 'black', marginLeft: 10}}>{item.name}</Text>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 13}}>{day}/{month}/{year}</Text>
            <Text style={{color: 'black', marginLeft: 10, fontSize: 13}}>{hours}:{minute}:{second}</Text>
          </View>
        </View>
        <Text style={{marginRight: 20, color: 'black'}}>{item.value}{item.balance},00$</Text>
      </TouchableOpacity>
    );
  })
) : (
 <View style={{width:width * 0.9,height:height * 0.2,justifyContent:'center',alignItems:'center'}}>
  <Text>Curently you dosen't have process history</Text>
 </View>
)}
     </View>
    <StatusBar backgroundColor="transparent" barStyle="light-content" translucent/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#e0d4ea',
    alignItems:'center',
    display:'flex'
  },
  upperview: {
    marginTop:height* 0.03,
    width:width * 0.9,
    height:height * 0.1,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  userpic: {
    width: 60,
    height:60,
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
    height:60,
    backgroundColor: '#cdc0da',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  hi: {
    width:width * 0.90,
    height:height * 0.09,
    justifyContent:'center',
    },
    hitext: {
      fontSize:35,
    },
    balancecardcont: {
      width:width,
      height:height * 0.4,
    alignItems:'center',
    marginTop:height * 0.03
    },
    backcard1: {
      width:width * 0.6,
      height: height * 0.013,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      backgroundColor: '#cdc0da',
    },
    backcard2: {
      width:width * 0.75,
      height: height * 0.013,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      backgroundColor: '#cdc0da',
      marginTop:2
    },
    balancecard: {
      width:'90%',
      height:'80%',
    marginTop:3,
      backgroundColor: '#cdc0da',
      borderRadius:20,
      overflow:'hidden',
      alignItems:'center',
      
    },
    balancecardup:{
      width:'90%',
      justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginTop:height * 0.01,
  
    },
    balancelogo: {
      width: 60,
      height: 60,
      backgroundColor: '#434345',
      borderRadius:60,
      marginTop:height * 0.01,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
    },
    balancepart: {
      width:'90%',
      
    },
    balance: {
     flexDirection:'row',
    alignItems:'center'
    },
    cardbuttons: {
      width:'95%',
      flexDirection:'row',
      justifyContent:'center',
      marginTop:height * 0.03
    },
    processbutton: {
      width:width * 0.25,
      height:height * 0.06,
      backgroundColor:'#bae7d3',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center'
    },
    cardsbutton: {
      width:width * 0.25,
      height:height * 0.06,
      backgroundColor:'#ffdd9d',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center'
    },
    copybutton: {
      width:width * 0.25,
      height:height * 0.06,
      backgroundColor:'#9da2fe',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center'
    },
    processhistorycont: {
      width:width,
      justifyContent:'center',
      alignItems:'center'
    },
    phtitlecont: {
      width:'90%',
      justifyContent:'space-between',
      flexDirection:'row'
    }
})