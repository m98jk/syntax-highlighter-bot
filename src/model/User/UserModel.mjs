import { Model, snakeCaseMappers } from 'objection'

class UserModel extends Model {

  static columnNameMappers = snakeCaseMappers();

  static defaultEagerAlgorithm = Model.JoinEagerAlgorithm;

  static get tableName () {
    return 'users'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['telegramId', 'name', 'theme'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        theme: { type: 'string', minLength: 1, maxLength: 40 },
        createdAt: { type: 'datetime' },
        updatedAt: { type: 'datetime' },
      },
    }
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }

}

export default UserModel