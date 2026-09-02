const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const { sequelize } = require('../instances/mysql')

class User extends Model {
    toJSON() {
        const values = { ...this.get() }

        delete values.pass

        return values
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        pic: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    },

    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,

        hooks: {
            beforeCreate: async (user) => {
                if (user.pass) {
                    user.pass = await bcrypt.hash(
                        user.pass,
                        10
                    )
                }
            },

            beforeUpdate: async (user) => {
                if (user.changed('pass')) {
                    user.pass = await bcrypt.hash(
                        user.pass,
                        10
                    )
                }
            },
        },
    }
)

module.exports = User