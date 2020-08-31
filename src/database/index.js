import Sequelize from 'sequelize';

// import User from '../app/models/User';
import Tweet from '../app/models/Tweet';

import databaseConfig from '../config/database';

const models = [Tweet];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
