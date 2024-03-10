import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const {width,height} = Dimensions.get('window');

export default function ProcessHistory() {
 const [process,setProcess] = useState([]);
   const rprocess = process.reverse();
 
  useFocusEffect(
    React.useCallback(() => {
      getpshistory();
     
    }, [])
  );

  const getpshistory = async () => {
    try {
      const pshistoryold = await AsyncStorage.getItem('prohistory');
 

      const parsedpshistory = JSON.parse(pshistoryold || '[]');
      setProcess(parsedpshistory);
    } catch (error) {
      console.error('Kartları alma hatası:', error);
    }
  };
  

  const deleteItemFromAsyncStorage = async (id) => {
   
    const updatedNotes = process.filter((note) => note.id !== id);
    setProcess(updatedNotes);
    console.log(updatedNotes)
    const updatedNotesString = JSON.stringify(updatedNotes);
    await AsyncStorage.setItem('prohistory', updatedNotesString);
   
 
};

  return (
    <View style={styles.container}>
      <View style={styles.upperview}>
         <TouchableOpacity  style={styles.homepic}><SimpleLineIcons name="refresh" size={24} color="black" /></TouchableOpacity>
         <View style={styles.username}><Text style={styles.usernametext}>ProcessHistory</Text></View>
         <TouchableOpacity style={styles.cards}><MaterialIcons name="history" size={24} color='black'/></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {rprocess.length > 0 ? (
  rprocess.map((item) => {
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
        <Text style={{color: 'red'}} onPress={() => deleteItemFromAsyncStorage(item.id)}>Delete</Text>
        <Text style={{marginRight: 20, color: 'black'}}>{item.value}{item.balance},00$</Text>
      </TouchableOpacity>
    );
  })
) : (
  <View style={{width: width * 0.9, height: height * 0.5, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Curently you don't have any processes history</Text>
  </View>
)}
         <View style={{height: height * 0.05}}></View>
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