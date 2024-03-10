import { View, Text, StatusBar, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import OnBoardText from './textdata/OnBoardText';
import OnBoardingItem from '../Components/OnBoardingItem';
import Paginator from '../Components/Paginator';

const {width,height} = Dimensions.get('window');

export default function OnBoardingScreen() {
    const [currentindex,setcurrentindex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)
   const viewableItemsChanged = useRef(({ viewableItems }) => {
    setcurrentindex(viewableItems[0].index);
   }).current;
   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
    return (
    <View style={styles.container}>
        <View style={{ flex: 3}}>
        <FlatList data={OnBoardText}
         renderItem={({item}) => <OnBoardingItem item={item} />}
         horizontal
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         pagingEnabled
         bounces={false}
         keyExtractor={(item) => item.id}
         onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            { useNativeDriver: false }
          )}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={viewConfig}
         ref={slidesRef}
         />
         </View>
  
         <View style={{position:'absolute',bottom:0,right:20}}>
      
         <Paginator data={OnBoardText} scrollx={scrollX} />
         </View>
      
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#434345'
    },
});