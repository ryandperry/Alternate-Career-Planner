import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

const PlaceholderImage = require('./assets/images/anne_lister.jpeg');

export default function App() {
  return (
    <View style={styles.Container}>
      <View style={styles.imageContainer}>
       <Image source={PlaceholderImage} style={styles.image} />
        <Text style={{ color: '#9a18ac' }}>
        Open up App.js to start working on your app!
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#pink',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 800,
    height: 500,
    borderRadius: 18,
  },
});
