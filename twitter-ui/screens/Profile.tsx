import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated
} from 'react-native';
import {
  Container,
  Content,
  ScrollableTab,
  Thumbnail,
  Icon,
  Button,
  Tabs,
  Tab,
  Fab
} from 'native-base';

import { userTweets } from '../modules/generator';
import { IProfileProps, IProfileStates } from '../modules/Model';
import Tweets from '../components/Tweets';

export default class Profile extends React.Component<IProfileProps, IProfileStates> {
  static navigationOptions = {
    header: null
  };

  constructor(props: IProfileProps) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const headMov = this.state.scrollY.interpolate({
      inputRange: [0, 390, 391],
      outputRange: [0, -390, -390]
    });
    const coverMov = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [0, -94, -94]
    });
    const avatarMov = this.state.scrollY.interpolate({
      inputRange: [0, 150, 151],
      outputRange: [0, -150, -150]
    });
    const avatarOp = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [1, 0, 0]
    });
    const headerOp = this.state.scrollY.interpolate({
      inputRange: [95, 180, 181],
      outputRange: [0, 0.75, 0.75]
    });
    const headerContentOp = this.state.scrollY.interpolate({
      inputRange: [0, 180, 210],
      outputRange: [0, 0, 1]
    });

    return (
      <Container style={styles.container}>
        <Animated.Image
          source={require('../assets/background.jpg')}
          style={{
            width: "100%",
            height: 150,
            zIndex: 2,
            position: "absolute",
            transform: [{ translateY: coverMov }],
            resizeMode: 'cover',
          }}
        />
        <Animated.View
          style={{
            width: "100%",
            position: "absolute",
            backgroundColor: "#121212",
            height: 56,
            zIndex: 13,
            opacity: headerOp,
            paddingTop: 22,
            //alignItems: "center"
          }}
        >
          <Animated.View
            style={{
              opacity: headerContentOp,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <Button
              transparent
              iconLeft
              light
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 4,
            position: "absolute",
            top: 205,
            left: -15,
            opacity: avatarOp,
            transform: [{ translateY: avatarMov }]
          }}
        >
          <Thumbnail
            large
            source={require('../assets/me.jpg')}
            style={styles.avatar}
          />
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          <View style={StyleSheet.flatten([ styles.header, { marginTop: 155 } ])}>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button
                bordered
                rounded
                style={StyleSheet.flatten([
                  styles.headerButton,
                  { paddingLeft: 15, paddingRight: 15, height: 35, borderColor: '#3CABF7' }
                ])}
              >
                <Text style={{ color: "#3CABF7", fontSize: 15 }}>Éditer le profil</Text>
              </Button>
            </View>
          </View>
          <View style={styles.header}>
            <View style={{ paddingHorizontal: 12 }}>
              <Text style={styles.nameText}>Monney Arthur</Text>
              <Text style={styles.usernameText}>@MonneyArthur</Text>
            </View>
            <View style={{ paddingHorizontal: 12 }}>
              <Text style={styles.bioText}>
                Fullstack Designer, Web Developer. Creator of <Text style={styles.tweetLink}>@laravelshopper</Text> - Laravel Cameroon organizer.
                Use <Text style={styles.tweetLink}>@laravelphp</Text> <Text style={styles.tweetLink}>@laravelcm</Text> <Text style={styles.tweetLink}>@reactjs</Text> and <Text style={styles.tweetLink}>@reactnative</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                <Icon name="link" style={{ fontSize: 13, color: '#97A2B1' }} />
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#3CABF7' }}>arthurmonney.com</Text>
              </View>
              <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                <Icon name="calendar" style={{ fontSize: 13, color: '#97A2B1' }} />
                <Text style={{ marginLeft: 5, fontSize: 12, color: '#97A2B1' }}>A rejoint Twiiter en août 2010</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: '#fff' }}>460</Text>
                <Text style={{ fontSize: 13, color: "#97A2B1", marginLeft: 5 }}>Abonnements</Text>
              </View>
              <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: '#fff' }}>2954</Text>
                <Text style={{ fontSize: 13, color: "#97A2B1", marginLeft: 3 }}>Abonnés</Text>
              </View>
            </View>
          </View>
          <Tabs
            style={{ marginTop: 10 }}
            tabBarUnderlineStyle={{ backgroundColor: '#3CABF7', height: 3 }}
            renderTabBar={()=> <ScrollableTab />}
          >
            <Tab 
              heading="Tweets"
              tabStyle={[styles.scrollTab]}
              activeTabStyle={[styles.activeTabStyle]}
              textStyle={styles.tabTextStyle}
              activeTextStyle={styles.activeTabTextStyle}
            >
              <Tweets
                data={userTweets.data}
                keyExtractor={this._keyExtractor}
              />
            </Tab>
            <Tab 
              heading="Tweets et réponses"
              tabStyle={[styles.scrollTab]}
              activeTabStyle={[styles.activeTabStyle]}
              textStyle={styles.tabTextStyle}
              activeTextStyle={styles.activeTabTextStyle}
            >
              <Content style={styles.tabContainer}>
                <View style={{ backgroundColor: '#172334', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                  <Icon name="repeat" style={{ fontSize: 50, color: '#fff' }} />
                  <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>Tweets et reponses</Text>
                </View>
              </Content>
            </Tab>
            <Tab 
              heading="Médias"
              tabStyle={[styles.scrollTab]}
              activeTabStyle={[styles.activeTabStyle]}
              textStyle={styles.tabTextStyle}
              activeTextStyle={styles.activeTabTextStyle}
            >
              <Content style={styles.tabContainer}>
                <View style={{ backgroundColor: '#172334', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                  <Icon name="images" style={{ fontSize: 50, color: '#fff' }} />
                  <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>Medias</Text>
                </View>
              </Content>
            </Tab>
            <Tab 
              heading="J'aime"
              tabStyle={[styles.scrollTab]}
              activeTabStyle={[styles.activeTabStyle]}
              textStyle={styles.tabTextStyle}
              activeTextStyle={styles.activeTabTextStyle}
            >
              <Content style={styles.tabContainer}>
                <View style={{ backgroundColor: '#172334', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                  <Icon name="heart" style={{ fontSize: 50, color: '#fff' }} />
                  <Text style={{ color: "#fff", fontSize: 25, fontWeight: 'bold' }}>Mentions J'aime</Text>
                </View>
              </Content>
            </Tab>
          </Tabs>
        </Animated.ScrollView>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "#3CABF7", zIndex: -1 }}
          onPress={() => alert('New Tweet')}
          ref={"FAB"}
        >
          <Icon name="ios-leaf" />
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
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "column",
    backgroundColor: "#172334"
  },
  avatar: {
    marginLeft: 26,
    marginTop: -95,
    width: 89,
    height: 89,
    borderRadius: 44,
    zIndex: 12
  },
  headerButton: {
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 3,
    paddingTop: 3,
    marginRight: 8
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff'
  },
  usernameText: {
    color: "#97A2B1",
    fontSize: 15
  },
  bioText: {
    fontSize: 14,
    marginTop: 15,
    color: '#fff'
  },
  tweetLink: {
    color: '#3CABF7'
  },
  locationText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    color: "#97A2B1"
  },
  topMargin: {
    // marginTop: 25
  },
  content: {
    padding: 10,
    backgroundColor: "#172334"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: "#97A2B1"
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  scrollTab: {
    backgroundColor: '#172334',
    width: null
  },
  activeTabStyle: {
    backgroundColor: '#172334'
  },
  tabTextStyle: {
    color: '#97A2B1',
    fontWeight: '500',
    fontSize: 12
  },
  activeTabTextStyle: {
    color: '#3CABF7',
    fontWeight: '500',
    fontSize: 12
  },
  tabContainer: {
    backgroundColor: '#172334'
  }
});
