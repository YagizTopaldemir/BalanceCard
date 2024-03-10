import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrentBalance from '../Screen/CurrentBalance';
import { Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Cards from '../Screen/Cards';
import Process from '../Screen/Process';
import ProcessHistory from '../Screen/ProcessHistory';

const {width,height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <View style={{backgroundColor:'#e0d4ea',flex:1,alignItems:'center',paddingBottom:4}}>
    <Tab.Navigator
    screenOptions={{
        tabBarStyle: { 
            backgroundColor:'#434345',
             borderRadius:25,
             width:width * 0.98,
            height:height * 0.1
         },
      }}
    tabBarOptions={{
        activeTintColor: '#ffdd9d', 
        inactiveTintColor: 'gray', 
        showLabel: false,
      }}>
      <Tab.Screen name="Current" component={CurrentBalance} options={{headerShown: false,tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
}}/>
    <Tab.Screen name="Cards" component={Cards} options={{headerShown: false,tabBarIcon: ({ color }) => (
             <FontAwesome name="credit-card" size={24} color={color} />
          
          ),
}}/>
      <Tab.Screen name="Process" component={Process} options={{headerShown: false,tabBarIcon: ({ color }) => (
           <AntDesign name="swap" size={24} color={color} />
          ),
}}/>
    <Tab.Screen name="Processhistory" component={ProcessHistory} options={{headerShown: false,tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color}/>
          
          ),
}}/>

    </Tab.Navigator>
    </View>
  );
}