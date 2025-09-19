import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CountryPicker from 'react-native-country-picker-modal';

const { width, height } = Dimensions.get('window');

import { CountryCode } from 'react-native-country-picker-modal';

const LoginScreen = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [otp, setOtp] = useState('');

  // Step 1: Request OTP
  const signInWithPhoneNumber = async () => {
    try {
      const phone = `+${callingCode}${phoneNumber}`;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error requesting OTP: ', error);
    }
  };

  // Step 2: Confirm OTP
  const confirmCode = async () => {
    try {
      await confirm.confirm(otp);
      console.log('✅ Phone number verified!');
    } catch (error) {
      console.error('❌ Invalid code.', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your phone number</Text>
      <Text style={styles.subtitle}>
        BuzzChat will need to verify your phone number. Carrier charges may
        apply.
      </Text>

      {!confirm ? (
        <>
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

          <TouchableOpacity style={styles.btn} onPress={signInWithPhoneNumber}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.inputOtp}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.btn} onPress={confirmCode}>
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
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
  inputOtp: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 15,
    marginBottom: 20,
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
