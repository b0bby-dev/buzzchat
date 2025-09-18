import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang); // i18n will automatically store it in AsyncStorage
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Chat.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.txt1}>{t('welcome')}</Text>

      <Text style={styles.txt2}>{t('privacyText')}</Text>

      {/* Language Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>{t('selectLanguage')}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLang}
            style={styles.picker}
            onValueChange={itemValue => handleLanguageChange(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिन्दी" value="hi" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.btnTxt}>{t('agree')}</Text>
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
    paddingHorizontal: width * 0.05,
  },
  lottie: {
    width: width * 0.7,
    height: width * 0.7,
  },
  txt1: {
    fontSize: width * 0.07,
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
  selectorContainer: {
    marginTop: 20,
    width: '80%',
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: (width * 0.15) / 2,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: width * 0.15,
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
