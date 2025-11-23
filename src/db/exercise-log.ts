import { Sequelize, DataTypes, Model } from 'sequelize'
import { UserModel } from "./user";
import { ExerciseModel } from "./exercise";

export interface ExerciseLogModel extends Model {
    id: number
    user: UserModel
    exercise: ExerciseModel
    duration: number
    datetime: Date
}

export default (sequelize: Sequelize, modelName: string) => {
    const ExerciseLogModelCtor = sequelize.define<ExerciseLogModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            duration: {
                type: DataTypes.BIGINT,
            },
            datetime: {
              type: DataTypes.DATE,
            }
        },
        {
            paranoid: true,
            timestamps: true,
            tableName: 'exerciseLog'
        }
    )

    ExerciseLogModelCtor.associate = (models) => {
        ExerciseLogModelCtor.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        })
        ExerciseLogModelCtor.belongsTo(models.Exercise, {
            foreignKey: {
                name: 'exerciseId',
                allowNull: false
            }
        })
    }

    return ExerciseLogModelCtor
}
