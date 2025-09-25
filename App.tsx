import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from './scr/i18n/i18n';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

import Splash from './scr/screens/Splash/Splash';
import Welcome from './scr/screens/Welcome/Welcome';
import Login from './scr/screens/Auth/Login';
import SignUp from './scr/screens/Auth/SignUp';
import Home from './scr/screens/Home/Home';
import Chat from './scr/screens/Chat/Chat';
import Contacts from './scr/screens/Contacts/Contacts';
import ProfileScreen from './scr/screens/Profile/Profile';

type AuthUserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const AuthenticatedUserContext = createContext<AuthUserContextType | undefined>(
  undefined,
);

const Stack = createStackNavigator();

const AuthenticatedUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthenticatedUserContextProvider>
        <RootNavigator />
      </AuthenticatedUserContextProvider>
    </I18nextProvider>
  );
};

export default App;
