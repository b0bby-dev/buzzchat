import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from './scr/i18n/i18n';

import SplashScreen from './scr/screens/Splash/Splash';
import WelcomeScreen from './scr/screens/Welcome/Welcome';
import LoginScreen from './scr/screens/Auth/Login';
import SignUpScreen from './scr/screens/Auth/SignUp';
import HomeScreen from './scr/screens/Home/Home';
import ChatScreen from './scr/screens/Chat/Chat';
import ContactsScreen from './scr/screens/Contacts/Contacts';
import ProfileScreen from './scr/screens/Profile/Profile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
