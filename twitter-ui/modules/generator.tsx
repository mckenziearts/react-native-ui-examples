import faker from 'faker';
import _ from 'lodash';

faker.locale = "en_IND";

export const tweets = {
  data: _.times(10, function(index) {
    return {
      id: index,
      user: {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        cover: faker.image.image(),
        bio: faker.lorem.sentence(),
        location: faker.address.city(),
        following: faker.random.number(1000),
        followers: faker.random.number(10000)
      },
      time: faker.date.recent(10),
      tweetContent: faker.lorem.sentences(2),
      likes: faker.random.number(500),
      retweets: faker.random.number(500),
      replies: faker.random.number(500)
    };
  }),
};

export const userTweets = {
  data: _.times(20, function(index) {
    return {
      id: index,
      tweetContent: faker.lorem.sentences(2),
      likes: faker.random.number(500),
      retweets: faker.random.number(500),
      replies: faker.random.number(500)
    };
  }),
};

export const tweetReplies = {
  data: _.times(10, function(index) {
    return {
      id: index,
      user: {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
        cover: faker.image.image(),
        bio: faker.lorem.sentence(),
        location: faker.address.city(),
        following: faker.random.number(1000),
        followers: faker.random.number(10000)
      },
      time: faker.date.recent(10),
      tweetContent: faker.lorem.sentences(2),
      likes: faker.random.number(10),
      retweets: faker.random.number(8),
      replies: faker.random.number(5)
    };
  })
}
