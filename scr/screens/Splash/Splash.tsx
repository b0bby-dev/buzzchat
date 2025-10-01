import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Splash = ({ navigation }: any) => {
  const logoAnim = useRef(new Animated.Value(1)).current;
  const logoFade = useRef(new Animated.Value(1)).current;
  const textMove = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(1)).current;

  const checkUser = () => {
    const isLoged = AsyncStorage.getItem('isLoged');

    if (true) {
      navigation.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoAnim, {
          toValue: 10,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoFade, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(textMove, {
          toValue: height * 0.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textFade, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      });
    }, 1000);
  }, [logoAnim, logoFade, textMove, textFade, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.appIcon,
          {
            opacity: logoFade,
            transform: [{ scale: logoAnim }],
          },
        ]}
        source={require('../../assets/icons/app-icon.png')}
      />

      <Animated.View
        style={[
          styles.txtContainer,
          {
            opacity: textFade,
            transform: [{ translateY: textMove }],
          },
        ]}
      >
        <Text style={styles.txt1}>from</Text>
        <Text style={styles.txt2}>𖣠 Tobitek</Text>
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  appIcon: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
  },

  txtContainer: {
    position: 'absolute',
    bottom: height * 0.03,
    alignItems: 'center',
  },

  txt1: {
    color: 'gray',
    fontSize: width * 0.035,
    textAlign: 'center',
  },

  txt2: {
    color: '#FCBB13',
    fontSize: width * 0.045,
    fontWeight: '500',
    textAlign: 'center',
  },
});
