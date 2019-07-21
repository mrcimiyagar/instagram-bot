var Sequelize = require('sequelize');
var pgtools = require('pgtools');

var sequelizeClient;
var UserAccount;
var User;
var Session;
var InstaAccount;
var Tag;
var Follow;
var Block;
var Like;
var Comment;

var pgUsername = 'postgres';
var pgPassword = '3g5h165tsK65j1s564L69ka5R168kk37sut5ls3Sk2t';
var dbName = 'InstaAiBot';

module.exports = {
    setup: function() {

        pgtools.createdb({
            user: pgUsername,
            password: pgPassword,
            port: 5432,
            host: 'localhost'
        }, dbName, function (err, res) {
            prepareSequelizeInstance();
            prepareUserAccountModel();
            prepareUserModel(function() {
                prepareSessionModel();
                prepareInstaAccountModel(function () {
                    prepareTagModel();
                    prepareFollowModel();
                    prepareBlockModel();
                });
            });
            module.exports['sequelClient'] = sequelizeClient;
        });
    }
};

function prepareSequelizeInstance() {
    sequelizeClient = new Sequelize('InstaAiBot', pgUsername, pgPassword, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}

function prepareUserAccountModel() {
    UserAccount = sequelizeClient.define('UserAccount', {
        userAccountOId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: Sequelize.STRING,
        forgot: Sequelize.BOOLEAN,
        pending: Sequelize.BOOLEAN,
        vCode: Sequelize.STRING
    }, {
        freezeTableName: true
    });
    UserAccount.sync().then(function () {
        module.exports['UserAccount'] = UserAccount;
    });
}

function prepareUserModel(done) {
    User = sequelizeClient.define('User', {
        userId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING
    }, {
        freezeTableName: true
    });
    User.sync().then(function () {
        module.exports['User'] = User;
        done();
    });
}

function prepareSessionModel() {
    Session = sequelizeClient.define('Session', {
        sessionId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        userId: Sequelize.BIGINT,
        token: Sequelize.STRING

    }, {
        freezeTableName: true
    });
    Session.belongsTo(User, { foreignKey: 'userId' });
    Session.sync().then(function () {
        module.exports['Session'] = Session;
    });
}

function prepareInstaAccountModel(done) {
    InstaAccount = sequelizeClient.define('InstaAccount', {
        instaAccountId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        title: Sequelize.STRING
    }, {
        freezeTableName: true
    });
    InstaAccount.belongsTo(User, { foreignKey: 'userId' });
    InstaAccount.sync().then(function () {
        module.exports['InstaAccount'] = InstaAccount;
        done();
    });
}

function prepareTagModel() {
    Tag = sequelizeClient.define('Tag', {
        tagId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING
    }, {
        freezeTableName: true
    });
    Tag.belongsTo(InstaAccount, { foreignKey: 'instaAccountId' });
    Tag.sync().then(function () {
        module.exports['Tag'] = Tag;
    });
}

function prepareFollowModel() {
    Follow = sequelizeClient.define('Follow', {
        followId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING
    }, {
        freezeTableName: true
    });
    Follow.belongsTo(InstaAccount, { foreignKey: 'instaAccountId' });
    Follow.sync().then(function () {
        module.exports['Follow'] = Follow;
    });
}

function prepareBlockModel() {
    Block = sequelizeClient.define('Block', {
        blockId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        data: Sequelize.STRING,
        type: Sequelize.INTEGER
    }, {
        freezeTableName: true
    });
    Block.belongsTo(InstaAccount, { foreignKey: 'instaAccountId' });
    Block.sync().then(function () {
        module.exports['Block'] = Block;
    });
}

function prepareLikeModel() {
    Like = sequelizeClient.define('Like', {
        likeId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
    }, {
        freezeTableName: true
    });
    Like.belongsTo(InstaAccount, { foreignKey: 'instaAccountId' });
    Like.sync().then(function () {
        module.exports['Like'] = Like;
    });
}

function prepareCommentModel() {
    Comment = sequelizeClient.define('Comment', {
        commentId:  {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
    }, {
        freezeTableName: true
    });
    Comment.belongsTo(InstaAccount, { foreignKey: 'instaAccountId' });
    Comment.sync().then(function () {
        module.exports['Comment'] = Comment;
    });
}