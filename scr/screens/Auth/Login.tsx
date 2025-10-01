import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { use, useState } from 'react';
import {
  getAuth,
  parseActionCodeURL,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backImage = require('../../assets/images/back-img.png');

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          AsyncStorage.setItem('isLogged', 'true');
          setIsLoading(false);
        })
        .catch(e => {
          Alert.alert('Login Failed!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      Alert.alert('Fill All Details!');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={'large'} color={'#FCBB13'} />
        </View>
      ) : (
        <View style={styles.container}>
          <Image source={backImage} style={styles.backImage} />

          <KeyboardAvoidingView
            style={styles.whiteSheet}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Title */}
                  <Text style={styles.title}>Login</Text>

                  {/* Inputs */}
                  <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                  />

                  {/* Button */}
                  <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonTxt}>Log In</Text>
                  </TouchableOpacity>

                  {/* Bottom link */}
                  <View style={styles.signupRow}>
                    <Text style={styles.signupText}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                    >
                      <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    flex: 1,
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 30,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingVertical: 16,
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: '#FCBB13',
    height: 51,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTxt: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 21,
  },
  signupRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  signupText: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14,
  },
  signupLink: {
    color: '#f57c00',
    fontWeight: '600',
    fontSize: 14,
  },
});
