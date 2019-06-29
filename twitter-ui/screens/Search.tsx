import React from 'react'
import {
  Text, View, StyleSheet, Image, StatusBar
} from 'react-native'
import {
  Container,
  Header,
  Right, 
  Icon,
  Left,
  Body,
  Button,
  Item,
  Content,
  Fab,
  Input
} from 'native-base';

import { ISearchStates, ISearchProps } from '../modules/Model';

export default class Search extends React.Component<ISearchProps, ISearchStates> {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header style={styles.header} searchBar rounded>
          <Left style={{ flex: 1 }}>
            <Button 
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Image
                source={require('../assets/me.jpg')}
                style={styles.imageStyle}
              />
            </Button>
          </Left>
          <View style={{ flex: 5, height: 30 }}>
            <Item style={{ backgroundColor: '#0D1726' }}>
              <Icon name="ios-search" />
              <Input placeholder="Rechercher sur Twitter" />
            </Item>
          </View>
          <Right style={{ flex: 1 }}>
            <Icon name='settings' style={{ color: '#3CABF7' }} />
          </Right>
        </Header>
        <Content>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
            <Icon name="search" style={{ fontSize: 50, color: '#fff' }} />
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>Search Here</Text>
          </View>
        </Content>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "#3CABF7", zIndex: -1 }}
          onPress={() => alert('New Tweet')}
          ref={"FAB"}
        >
          <Icon name="leaf" />
        </Fab>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#172334'
  },
  header: {
    backgroundColor: '#172334',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#97A2B1',
    alignItems: 'center'
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
})
