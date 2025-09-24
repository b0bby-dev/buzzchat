// import { Image, StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import colors from '../../../colors';
// import { useNavigation } from '@react-navigation/native';
// import { FontAwesome } from 'react-native-vector-icons/f';

// const Home = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => {
//         <FontAwesome
//           name="search"
//           size={24}
//           color={colors.gray}
//           style={{ margin: 5 }}
//         ></FontAwesome>;
//       },
//       headerRight: () => {
//         <Image style={{ width: 40, height: 40, marginRight: 15 }} />;
//       },
//     });
//   });
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     backgroundColor: '#fff',
//   },
//   chatButton: {
//     backgroundColor: colors.primary,
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.9,
//     shadowRadius: 8,
//     marginRight: 20,
//     marginBottom: 50,
//   },
// });

import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../../colors';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={require('../../assets/images/profile.jpeg')}
          style={{ width: 40, height: 40, marginRight: 15, borderRadius: 20 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
