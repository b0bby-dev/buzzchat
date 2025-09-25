import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface User {
  id: string;
  name: string;
  avatar?: string; // optional profile picture
}

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from backend or Firebase
    const fetchContacts = async () => {
      const data: User[] = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
      ];
      setContacts(data);
      setFilteredContacts(data);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, contacts]);

  const handleContactPress = (user: User) => {
    // Navigate to Chat screen with this user
    // navigation.navigate('Chat', { userId: user.id, userName: user.name });
  };

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search contacts..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  contactItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  contactName: { fontSize: 16 },
});
