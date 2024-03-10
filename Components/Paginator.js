import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

export default function Paginator({data,scrollx}) {
    const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'row',height:80}}>
        {data.map((_,i) => {
            const inputRange = [(i - 1) * width,i * width, (i + 1) * width];
            const dotwidth = scrollx.interpolate({
                inputRange,
                outputRange: [10,25,10],
                extrapolate: 'clamp'
            })

            const opacity = scrollx.interpolate({
                inputRange,
                outputRange: [0.3,1,0.3],
                extrapolate: 'clamp',
            })
            return <Animated.View style={[styles.dot,{width: dotwidth,opacity}]} key={i.toString()} />
        })}
   
    </View>
  )
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor:'#ffdd9d',
        marginHorizontal: 5,
    
    }
})