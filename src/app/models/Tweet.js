import Sequelize, { Model } from 'sequelize';

export default class Tweet extends Model {
    static init(sequelize) {
        super.init(
            {
                tweet: Sequelize.TEXT,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}
