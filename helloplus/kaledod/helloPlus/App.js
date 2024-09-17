import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text} from 'react-native';
import { useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('./assets/TNgiphy.gif');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.header}>Please select an Image from your pc to be displayed.
        </Text>
        <ImageViewer 
          placeholderImageSource={PlaceholderImage} 
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    alignItems: 'center',
    //backgroundColor: "blue"
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    //backgroundColor: "orange"
  },
  header: {
    textAlign: 'center',
    color: "orange",
    paddingBottom: 20,
    fontSize: 30
  },
});
