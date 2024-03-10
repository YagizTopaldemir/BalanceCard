import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardingScreen from '../Screen/OnBoardingScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './BottomNavigator';
import CashProcess from '../Components/CashProcess';
import Addcard from '../Components/Addcard';
import CardProcess from '../Components/CardProcess';
import ChangeBalance from '../Components/ChangeBalance';
import ChangeName from '../Components/ChangeName';
import NaviScreen from '../Screen/NaviScreen';


const Stack = createStackNavigator();

export default function StackNavigator() {
const [userthere,setUserhere] = useState('');
  

  useEffect(() => {
    userapprove();
  })
  
  const userapprove = async () => {
    const userasync = await AsyncStorage.getItem('login')
    if(userasync === 'Userapprove'){
    setUserhere(userasync);
  }
  }

 

  if(userthere === 'Userapprove'){
    return(
      <NavigationContainer>
    <Stack.Navigator initialRouteName='BottomNav'>
      <Stack.Screen name="BottomNav" component={BottomNav} options={{headerShown: false}}/>
      <Stack.Screen name="Cash" component={CashProcess} options={{headerShown: false}}/>
      <Stack.Screen name="Addcard" component={Addcard} options={{headerShown: false}}/>
      <Stack.Screen name="CardsProcess" component={CardProcess} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeBalance" component={ChangeBalance} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeName" component={ChangeName} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Navisec'>
    <Stack.Screen name="Navisec" component={NaviScreen} options={{headerShown: false}}/>
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{headerShown: false}}/>
      <Stack.Screen name="BottomNav" component={BottomNav} options={{headerShown: false}}/>
      <Stack.Screen name="Cash" component={CashProcess} options={{headerShown: false}}/>
      <Stack.Screen name="Addcard" component={Addcard} options={{headerShown: false}}/>
      <Stack.Screen name="CardsProcess" component={CardProcess} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeBalance" component={ChangeBalance} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeName" component={ChangeName} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}