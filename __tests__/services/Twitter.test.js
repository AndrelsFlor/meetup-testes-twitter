import Twitter from 'twitter';
import TwitterService from '../../src/app/services/Twitter';
import mockedTweets from '../helpers/TwitterResponse';

import '../../src/database';

jest.mock('twitter');

describe('/src/app/services/Twitter', () => {
    describe('getRecenteTweetsAboutSubject', () => {
        test('Deve retornar os tweets sobre um assunto', () => {
            Twitter.mockImplementation(() => ({
                get: (actionString, params, cb) => {
                    cb(false, mockedTweets);
                },
            }));

            const twitterService = new TwitterService();
            return twitterService
                .getRecentTweetsAboutSubject('nasa')
                .then(tweets => {
                    expect(tweets).toStrictEqual({
                        ok: true,
                        tweets: [
                            'chicos con todo respeto, cómo verga va a estar un cuarto de millón de pesos una computadora? ni aunque tengas que h… https://t.co/8V9EHt1DF6',
                            "@NASA_thaanks isn't it ALWAYS after 1 am",
                            'I want to be an astronaut #NASA @NASA',
                            '@jecikaah @OOTDFESS Mau yg NASA',
                            'With Poles shifting faster than ever, humans ll be trapped on this planet n lose connection with the universe, we g… https://t.co/C2lJzwUkDc',
                            "ngayon ko lang natututunan yung mga inexpect kong matutunan nung nasa college pa 'ko\n" +
                                '\n' +
                                "hay hay hay :'3",
                            'Nasa punto ako ng buhay ko na tuwing umaga mas inuuna kong i-check ang email ko kesa sa messenger.',
                            'Crew Spending Weekend in Station’s Russian Segment https://t.co/CcK1iBvw7n',
                        ],
                    });
                });
        });
    });
});
