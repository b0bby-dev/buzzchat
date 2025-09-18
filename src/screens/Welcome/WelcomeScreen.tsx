import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Responsive animation */}
      <LottieView
        source={require('../../assets/Chat.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* Title */}
      <Text style={styles.txt1}>Welcome to BuzzChat</Text>

      {/* Subtitle */}
      <Text style={styles.txt2}>
        Read our Privacy Policy. Tap "Agree and continue" to accept the Terms of
        Service.
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt}>Agree and continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, // responsive side padding
  },

  lottie: {
    width: width * 0.7, // 70% of screen width
    height: width * 0.7,
  },

  txt1: {
    fontSize: width * 0.07, // responsive font
    fontWeight: '600',
    paddingVertical: height * 0.02,
    textAlign: 'center',
  },

  txt2: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  btn: {
    backgroundColor: '#FCBB13',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 25,
    marginTop: height * 0.05,
  },

  btnTxt: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});
