import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your phone number</Text>
      <Text style={styles.subtitle}>
        BuzzChat will need to verify your phone number. Carrier charges may
        apply.
      </Text>

      {/* Country Picker + Phone Number */}
      <View style={styles.phoneContainer}>
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          withEmoji
          onSelect={country => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />

        <Text style={styles.callingCode}>+{callingCode}</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log('+', callingCode, phoneNumber)}
      >
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 30,
  },
  callingCode: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#FCBB13',
    paddingVertical: 15,
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});
