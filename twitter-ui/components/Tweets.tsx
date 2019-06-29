import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Tweets: React.StatelessComponent<any> = ({
  data, keyExtractor
}) => {
  return (
    <View style={{ backgroundColor: "#172334", flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <View style={styles.tweet}>
            <View style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              paddingVertical: 15,
              justifyContent: 'space-between'
            }}>
              <Thumbnail source={require('../assets/me.jpg')} small />
              <View style={{
                flexWrap: 'wrap',
                paddingLeft: 7,
                paddingRight: 15
              }}>
                <View style={styles.tweetHeader}>
                  <Text style={{ fontWeight: "bold", fontSize: 15, color: '#fff' }}>
                    Monney Arthur
                  </Text>
                  <Text style={{ paddingLeft: 5, color: "#97A2B1", fontSize: 12 }}>
                    @MonneyArthur
                  </Text>
                </View>
                <View style={{ flexDirection:'row' }}> 
                  <Text style={styles.tweetText}>{item.tweetContent}</Text>
                </View>
                <View style={[styles.tweetFooter, { width: width - 100 }]}>
                  <View style={styles.footerIcons}>
                    <Icon name="ios-chatbubbles" color="#97A2B1" size={25} />
                    <Text style={styles.badgeCount}>{item.replies}</Text>
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Tweets;
