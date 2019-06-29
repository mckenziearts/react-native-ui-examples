import React from 'react'
import {
  Text, View, StyleSheet, TouchableOpacity, Image,
  ScrollView, FlatList, TouchableHighlight, Dimensions, StatusBar
} from 'react-native'
import { DrawerItemsProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Thumbnail,
  Fab
} from 'native-base';

import { tweets } from '../modules/generator';
import { IHomeStates } from '../modules/Model';

const { width } = Dimensions.get('window');

export default class Home extends React.Component<DrawerItemsProps, IHomeStates> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Accueil',
    headerBackTitle: null,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#172334',
      borderBottomWidth: 1,
      borderColor: '#97A2B1'
    },
    headerLeft: (
      <View style={{ paddingLeft: 8 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../assets/me.jpg')}
          style={styles.imageStyle}
        />
        </TouchableOpacity>
      </View>
    ),
    headerRight: (
      <View style={{ paddingRight: 10 }}>
        <TouchableOpacity onPress={() => alert('Popular Tweets')}>
          <Icon name="ios-star-outline" size={25} color="#3CABF7" />
        </TouchableOpacity>
      </View>
    )
  });

  componentDidMount() {
    
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={tweets.data}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View style={styles.tweet}>
                <TouchableHighlight
                  onPress={() => alert('Alert Tweet')}
                  underlayColor="#0C1624"
                  activeOpacity={0.75}
                >
                  <View>
                    <View style={{
                      flexDirection: "row",
                      paddingHorizontal: 16,
                      paddingVertical: 15,
                      justifyContent: 'space-between'
                    }}>
                      <Thumbnail source={{ uri: item.user.avatar }} small />
                      <View style={{
                        flexWrap: 'wrap',
                        paddingLeft: 7,
                        paddingRight: 15
                      }}>
                        <View style={styles.tweetHeader}>
                          <Text style={{ fontWeight: "bold", fontSize: 15, color: '#fff' }}>
                            {item.user.name}
                          </Text>
                          <Text style={{ paddingLeft: 5, color: "#97A2B1", fontSize: 12 }}>
                            {"@" + item.user.username}
                          </Text>
                        </View>
                        <View style={{ flexDirection:'row' }}> 
                          <Text style={styles.tweetText}>{item.tweetContent}</Text>
                        </View>
                        <View style={[styles.tweetFooter, { width: width - 100 }]}>
                          <View style={styles.footerIcons}>
                            <TouchableOpacity
                              onPress={() => alert('Tweet Detail')}
                              style={styles.footerIcons}
                            >
                              <Icon name="ios-chatbubbles" color="#97A2B1" size={25} />
                              <Text style={styles.badgeCount}>{item.replies}</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.footerIcons}>
                            <Icon name="ios-repeat" color="#97A2B1" size={25} />
                            <Text style={styles.badgeCount}>{item.retweets}</Text>
                          </View>
                          <View style={styles.footerIcons}>
                            <Icon name="ios-heart-empty" color="#97A2B1" size={25} />
                            <Text style={styles.badgeCount}>{item.likes}</Text>
                          </View>
                          <View style={styles.footerIcons}>
                            <Icon name="ios-open" color="#97A2B1" size={25} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          />
        </ScrollView>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "#3CABF7", zIndex: -1 }}
          onPress={() => alert('New Tweet')}
          ref={"FAB"}
        >
          <Icon name="ios-leaf" />
        </Fab>
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
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  tweetImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  tweetHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    flexWrap: 'wrap',
    flexShrink: 1
  },
  tweetMore: {},
  tweet: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
    fontSize: 18,
    color: "#fff"
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  badgeCount: {
    fontSize: 14,
    paddingLeft: 5,
    color: '#97A2B1'
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  }
})
