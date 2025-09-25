import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('Bobby Kumar');
  const [status, setStatus] = useState('Available');
  const [avatar, setAvatar] = useState(
    'https://i.postimg.cc/QC4pPKSQ/Whats-App-Image-2025-09-01-at-2-42-33-PM.jpg',
  );

  const handleSave = () => {
    // Here you would save the info to backend or Firebase
    Alert.alert('Profile Updated', `Name: ${name}\nStatus: ${status}`);
  };

  const handleChangeAvatar = () => {
    // Optionally, open image picker to change avatar
    Alert.alert('Change Avatar', 'Open image picker here');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangeAvatar}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.changeAvatarText}>Change Avatar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Your name"
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        placeholder="Your status"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center' },
  changeAvatarText: {
    textAlign: 'center',
    color: '#FCBB13',
    marginTop: 8,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#FCBB13',
    padding: 12,
    borderRadius: 24,
    marginTop: 60,
  },
  saveButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
