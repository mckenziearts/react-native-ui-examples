import React from 'react';
import {
  Text, View, StyleSheet, Image, StatusBar
} from 'react-native';
import {
  Container,
  Header,
  Tab,
  Tabs,
  Right, 
  Icon,
  Left,
  Body,
  Button,
  Title,
  Content,
  Fab
} from 'native-base';

import { INotificationsProps, INotificationsStates } from '../modules/Model';

console.disableYellowBox = true;

export default class Notifications extends React.Component<INotificationsProps, INotificationsStates> {
  static navigationOptions = ({ navigation }) => {
    
    return {
      
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header hasTabs style={styles.header}>
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
            <Title style={{ color: '#fff' }}>Notifications</Title>
          </Body>
          <Right>
            <Icon name='settings' style={{ color: '#3CABF7' }} />
          </Right>
        </Header>
        <Tabs>
          <Tab 
            heading="Tous"
            tabStyle={styles.scrollTab}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
          >
            <Content style={styles.tabContainer}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                <Icon name="notifications" style={{ fontSize: 50, color: '#fff' }} />
                <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>All Notifications Tabs</Text>
              </View>
            </Content>
          </Tab>
          <Tab 
            heading="Mentions"
            tabStyle={styles.scrollTab}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.activeTabTextStyle}
          >
            <Content style={styles.tabContainer}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                <Icon name="notifications" style={{ fontSize: 50, color: '#fff' }} />
                <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>Only Mentions Tabs</Text>
              </View>
            </Content>
          </Tab>
        </Tabs>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172334'
  },
  header: {
    backgroundColor: '#172334',
    paddingHorizontal: 10
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  scrollTab: {
    backgroundColor: '#172334'
  },
  activeTabStyle: {
    backgroundColor: '#172334'
  },
  tabTextStyle: {
    color: '#97A2B1',
    fontWeight: '500'
  },
  activeTabTextStyle: {
    color: '#3CABF7',
    fontWeight: '500'
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#172334'
  }
});
