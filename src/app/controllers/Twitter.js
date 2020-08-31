import TwitterService from '../services/Twitter';

class TwitterController {
    async getTweets(req, res) {
        const { query } = req.params;
        const twitterService = new TwitterService();
        const data = await twitterService.getRecentTweetsAboutSubject(query);
        return res.json(data);
    }
}

export default new TwitterController();
