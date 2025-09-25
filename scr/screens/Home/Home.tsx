import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 24, paddingRight: 40 }}>Home</Text>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity>
          <Image
            source={require('../../assets/icons/search-icon.png')}
            style={{ width: 30, height: 30, marginLeft: 15, borderRadius: 20 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Image
          style={styles.chatButton}
          source={require('../../assets/icons/chat-icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  chatButton: {
    height: 100,
    width: 100,
    marginBottom: 30,
    marginRight: 10,
  },
});
