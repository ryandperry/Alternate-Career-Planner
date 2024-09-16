import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';

const UTLogo = require('./assets/utk-logo.png');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer UTLogoSource={UTLogo} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Press this button!" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 100,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});