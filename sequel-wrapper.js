let Sequelize = require('sequelize');
let pgTools = require('pgtools');

let sequelizeClient;
let UserAccount;
let User;
let Session;
let InstaAccount;
let Tag;
let Follow;
let Block;
let Like;
let Comment;

const pgUsername = 'postgres';
const pgPassword = '3g5h165tsK65j1s564L69ka5R168kk37sut5ls3Sk2t';
const dbName = 'InstaAiBot';

module.exports = {
    setup: async function() {
        const config = {
            user: pgUsername,
            password: pgPassword,
            port: 5432,
            host: 'localhost'
        };
        // try {
        //     await pgTools.dropdb(config, dbName);
        // } catch (e) {}
        try {
            await pgTools.createdb(config, dbName);
        } catch (e) {}
        prepareSequelizeInstance();
        await prepareUserAccountModel();
        await prepareUserModel();
        await prepareSessionModel();
        await prepareInstaAccountModel();
        await prepareTagModel();
        await prepareFollowModel();
        await prepareBlockModel();
        await prepareLikeModel();
        await prepareCommentModel();
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

async function prepareUserAccountModel() {
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
    await UserAccount.sync();
    module.exports['UserAccount'] = UserAccount;
}

async function prepareUserModel(done) {
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
    await User.sync();
    module.exports['User'] = User;
}

async function prepareSessionModel() {
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
    await Session.sync();
    module.exports['Session'] = Session;
}

async function prepareInstaAccountModel(done) {
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
    await InstaAccount.sync();
    module.exports['InstaAccount'] = InstaAccount;
}

async function prepareTagModel() {
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
    await Tag.sync();
    module.exports['Tag'] = Tag;
}

async function prepareFollowModel() {
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
    await Follow.sync();
    module.exports['Follow'] = Follow;
}

async function prepareBlockModel() {
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
    await Block.sync();
    module.exports['Block'] = Block;
}

async function prepareLikeModel() {
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
    await Like.sync();
    module.exports['Like'] = Like;
}

async function prepareCommentModel() {
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
    await Comment.sync();
    module.exports['Comment'] = Comment;
}