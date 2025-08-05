// components/IconSwitch.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const IconSwitch = ({ icon, value, onToggle, trackColor = '#eee', activeColor = '#FF941A' }) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [22,0], // shorter travel distance
  });

  const thumbColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#fff'], // keep thumb white
  });

  const trackBgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColor, activeColor], // track changes color
  });

  return (
    <TouchableWithoutFeedback onPress={() => onToggle(!value)}>
      <View style={styles.container}>
        <Animated.View style={[styles.track, { backgroundColor: trackBgColor }]} />
        <Animated.View style={[
          styles.thumb, 
          { 
            backgroundColor: thumbColor,
            transform: [{ translateX }] 
          }
        ]}>
          {icon}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 54, // shorter overall width
    height: 32,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: 54, // shorter track
    height: 8, // slightly wider than before
    borderRadius: 4,
    position: 'absolute',
    top: '50%',
    marginTop: -4, // center the track vertically
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default IconSwitch;