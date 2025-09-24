import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

const Welcome = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  useEffect(() => {
    const loadLang = async () => {
      const savedLang = await AsyncStorage.getItem('appLang');
      if (savedLang) {
        i18n.changeLanguage(savedLang);
        setSelectedLang(savedLang);
      }
    };
    loadLang();
  }, []);

  const changeLanguage = async (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('appLang', lang);
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Chat.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      <Text style={styles.txt1}>{t('welcome')}</Text>
      <Text style={styles.txt2}>{t('policy')}</Text>

      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedLang}
          onValueChange={changeLanguage}
          style={styles.picker}
        >
          {LANGUAGES.map(lang => (
            <Picker.Item key={lang.code} label={lang.label} value={lang.code} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.btnTxt}>{t('agree')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  txt1: {
    fontSize: 27,
    fontWeight: '600',
    paddingVertical: 20,
    textAlign: 'center',
  },
  txt2: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#FCBB13',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  pickerBox: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 45,
  },
  picker: {
    width: '100%',
    height: 50,
  },
});
