import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Signets extends React.Component {
  static navigationOptions = {
    title: 'Signets',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#172334',
      borderBottomWidth: 1,
      borderColor: '#97A2B1'
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: '#fff' }}>Signets Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#172334'
  }
})
