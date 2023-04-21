'use strict';

const Sequelize = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV ? 'production' : 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        logging: false
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

db.User = require('./user')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Img = require('./img')(sequelize, Sequelize);
db.Kuser = require('./kuser')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.School =  require('./school')(sequelize, Sequelize);

require('./user/foreignkey')(db);
require('./board/foreignkey')(db);
require('./comment/foreignkey')(db);
require('./img/foreignkey')(db);
require('./kuser/foreignkey')(db);
require('./like/foreignkey')(db);
require('./school/foreignkey')(db);

module.exports = db;
