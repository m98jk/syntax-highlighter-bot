import Objection from 'objection'
import UserModel from '../User/UserModel'
import ChatModel from '../Chat/ChatModel'

const Model = Objection.Model
const snakeCaseMappers = Objection.snakeCaseMappers

class UseModel extends Model {

  static tableName = 'uses';

  static columnNameMappers = snakeCaseMappers();

  static defaultEagerAlgorithm = Model.JoinEagerAlgorithm;

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['userId', 'chatId'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        chatId: { type: 'integer' },
        lang: { type: 'string' },
        code: { type: 'string' },
        image: { type: 'string' },
        createdAt: { type: 'datetime' },
      },
    }
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'UseModel.userId',
          to: 'UserModel.id',
        },
      },

      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatModel,
        join: {
          from: 'UseModel.chatId',
          to: 'ChatModel.id',
        },
      },
    }
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }

}

export default UseModel
