import React from 'react';
import { Text, View, Button } from 'react-native';

function MyButton() {
  return (
    <Button
      title="Hello Plus"
      onPress={() => {
        console.log("Button pressed");
      }}
    />
  );
}

export default function MyApp() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Hello World</Text>
      <MyButton />
    </View>
  );
}
