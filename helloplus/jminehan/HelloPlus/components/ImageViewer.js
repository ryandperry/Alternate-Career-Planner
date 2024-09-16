import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ UTLogoSource }) {
  return (
    <Image source={UTLogoSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});
