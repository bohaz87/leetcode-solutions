type Feeds = { tweetId: number; userId: number }[];
type User = { userId: number; followees: number[] };

class Twitter {
  users: User[];
  feeds: Feeds;
  constructor() {
    this.users = [];
    this.feeds = [];
  }

  postTweet(userId: number, tweetId: number) {
    this.feeds.push({ userId, tweetId });
  }

  getNewsFeed(userId: number) {
    const res = [];
    let count = 0;
    const followees = this.getUser(userId).followees;
    for (let i = this.feeds.length - 1; i >= 0; i--) {
      const feed = this.feeds[i];
      if (feed.userId === userId) {
        res.push(feed.tweetId);
        count++;
      } else if (followees.includes(feed.userId)) {
        res.push(feed.tweetId);
        count++;
      }

      if (count >= 10) {
        break;
      }
    }
    // console.log(res);
    return res;
  }

  follow(followerId: number, followeeId: number) {
    this.getUser(followerId).followees.push(followeeId);
  }

  unfollow(followerId: number, followeeId: number) {
    const user = this.getUser(followerId);
    user.followees.splice(user.followees.indexOf(followeeId), 1);
  }

  getUser(userId: number): User {
    this.users[userId] = this.users[userId] || { userId, followees: [] };
    return this.users[userId];
  }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

const twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1); // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2); // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1); // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2); // User 1 unfollows user 2.
twitter.getNewsFeed(1); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
twitter.postTweet(3, 7); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(3); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
twitter.follow(3, 1); // User 1 follows user 2.
twitter.getNewsFeed(3); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
twitter.follow(3, 2); // User 1 follows user 2.
twitter.getNewsFeed(3); // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
