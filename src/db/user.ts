import { Sequelize, DataTypes, Model } from 'sequelize'

import { USER_ROLE } from '../utils/enums'
import { ExerciseLogModel } from './exercise-log'

export interface UserModel extends Model {
    id: number
    name: string
    surname: string
    nickName: string
    email: string
    passwordHash: string
    role: USER_ROLE
    ExerciseLogs?: ExerciseLogModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
    const UserModelCtor = sequelize.define<UserModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(200),
            },
            surname: {
                type: DataTypes.STRING(200),
            },
            nickName: {
                type: DataTypes.STRING(100),
                unique: true
            },
            email: {
                type: DataTypes.STRING(200),
                unique: true
            },
            passwordHash: {
                type: DataTypes.STRING(500),
            },
            role: {
                type: DataTypes.ENUM(...Object.values(USER_ROLE))
            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'users'
        }
    )

    UserModelCtor.associate = (models) => {
        UserModelCtor.hasMany(models.ExerciseLog, {
            foreignKey: 'exerciseId',
        })
    }

    return UserModelCtor
}
