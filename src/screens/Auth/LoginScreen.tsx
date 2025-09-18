import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

const LoginScreen = () => {
  return (
    <View>
      <Text>Enter ypur phone number</Text>
      <Text>
        BuzzChat will need to verify your phone number. Carrier charges may
        apply.
      </Text>

      <View style={styles.numberContainer}>
        <TextInput placeholder="+91"></TextInput>

        <TextInput placeholder="Phone number"></TextInput>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  numberContainer: {
    flexDirection: 'row',
  },
});
