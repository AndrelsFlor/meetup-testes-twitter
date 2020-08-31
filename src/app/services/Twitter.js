import Twitter from 'twitter';
import TweetModel from '../models/Tweet';

export default class TwitterService {
    constructor() {
        this.twitter = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });
    }

    filterRetweets(tweets) {
        return tweets.statuses.filter(tweet => !tweet.retweeted_status);
    }

    getOnlyText(tweets) {
        return tweets.map(tweet => tweet.text);
    }

    async saveToDatabase(tweets) {
        // eslint-disable-next-line no-restricted-syntax
        for (const tweet of tweets) {
            // eslint-disable-next-line no-await-in-loop
            await TweetModel.create({ tweet });
        }
    }

    async getRecentTweetsAboutSubject(query) {
        try {
            const params = { q: query };
            const recentTweets = await new Promise((resolve, reject) => {
                this.twitter.get(
                    'search/tweets',
                    params,
                    async (error, tweets) => {
                        if (error) {
                            return reject(error);
                        }
                        const tweetsFiltered = this.filterRetweets(tweets);
                        const tweetsText = this.getOnlyText(tweetsFiltered);
                        await this.saveToDatabase(tweetsText);
                        return resolve(tweetsText);
                    }
                );
            });
            return { ok: true, tweets: recentTweets };
        } catch (err) {
            return { ok: false, error: err };
        }
    }
}
