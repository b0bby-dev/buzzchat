import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
}

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 24, fontWeight: '500' }}>Home</Text>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
          <Image
            source={require('../../assets/icons/search-icon.png')}
            style={{ width: 30, height: 30, marginLeft: 15, borderRadius: 20 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {' '}
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={{ width: 40, height: 40, marginRight: 15, borderRadius: 20 }}
          />{' '}
        </TouchableOpacity>
      ),
    });

    // Dummy data, replace with your backend or Firebase fetch
    const data: Conversation[] = [
      {
        id: '1',
        userName: 'Alice',
        lastMessage: 'Hey, how are you?',
        avatar: 'https://i.pravatar.cc/150?img=1',
        timestamp: '10:30 AM',
      },
      {
        id: '2',
        userName: 'Bob',
        lastMessage: 'See you tomorrow!',
        avatar: 'https://i.pravatar.cc/150?img=2',
        timestamp: 'Yesterday',
      },
      {
        id: '3',
        userName: 'Charlie',
        lastMessage: 'Thanks for your help!',
        avatar: 'https://i.pravatar.cc/150?img=3',
        timestamp: 'Mon',
      },
    ];
    setConversations(data);
  }, []);

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.chatItem}
      // onPress={() =>
      //   navigation.navigate('Chat', {
      //     userId: item.id,
      //     userName: item.userName,
      //   })
      // }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
        onPress={() => navigation.navigate('Contacts')}
      >
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
  container: { flex: 1, backgroundColor: '#fff' },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  chatInfo: { flex: 1, marginLeft: 10 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  userName: { fontSize: 16, fontWeight: 'bold' },
  timestamp: { fontSize: 12, color: '#999' },
  lastMessage: { color: '#555', marginTop: 4 },
  chatButton: {
    height: 100,
    width: 100,
    marginBottom: 30,
    marginRight: 5,
  },
});
