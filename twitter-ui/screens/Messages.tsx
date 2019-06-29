import React from 'react';
import {
  Text, View, StyleSheet, Image, StatusBar, Dimensions
} from 'react-native';
import {
  Container,
  Header,
  Right, 
  Icon,
  Left,
  Body,
  Button,
  Title,
  Content,
  Fab
} from 'native-base';

import { IMessagesProps, IMessagesStates } from '../modules/Model';

const { height } = Dimensions.get('window');

export default class Messages extends React.Component<IMessagesProps, IMessagesStates> {
  static navigationOptions = ({ navigation }) => {
    
    return {
      
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header style={styles.header}>
          <Left>
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
          <Body>
            <Title style={{ color: '#fff' }}>Messages</Title>
          </Body>
          <Right>
            <Icon name='settings' style={{ color: '#3CABF7' }} />
          </Right>
        </Header>
        <Content style={{ flex: 1 }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 40,
            height: height - 150
          }}>
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
              Parler en privé avec toute personne qui vous suit. Commencez par trouver vos amis.</Text>
            <Text style={{ textAlign: 'center', color: '#97A2B1', marginBottom: 10 }}>Ajouter votre numero de telephone et importer vos contacts pour trouver vos amis.</Text>
            <Button rounded style={{ paddingHorizontal: 15, backgroundColor: '#3CABF7', alignSelf: 'center' }}>
              <Text style={{ color: '#fff' }}>Trouver des amis</Text>
            </Button>
          </View>
        </Content>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "#3CABF7", zIndex: -1 }}
          onPress={() => alert('New Direct Message')}
          ref={"FAB"}
        >
          <Icon name="mail" />
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
    borderBottomColor: '#97A2B1'
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
})
