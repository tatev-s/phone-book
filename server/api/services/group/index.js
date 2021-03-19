const { RESOURCE_NOT_FOUND } = require('../../../utils/errorDetails');
const { ResourceNotFoundError } = require('../../../modules/exceptions');
const { Group, Sequelize } = require('../../../data/models');

const { Op } = Sequelize;
/**
 * Abstract Class GroupService
 */
class GroupService {
  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static create({ data }) {
    return Group.create(data);
  }

  /**
     *
     * @param data
     * @param id
     * @param transaction
     * @returns {Promise<*>}
     */
  static async update({ data, id }) {
    const group = await GroupService.getById({ id });
    if (!group) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);
    return group.update(data);
  }

  /**
     *
     * @param id
     * @returns {Promise.<*>}
     */
  static getById({ id }) {
    return Group.findByPk(id);
  }

  /**
     *
     * @param id
     * @returns {Promise<void>}
     */
  static async delete({ id }) {
    const group = await GroupService.getById({ id });
    if (!group) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);
    return group.destroy();
  }

  /**
     *
     * @param limit
     * @param offset
     * @param filter
     * @returns {Promise.<*>}
     */
  static async get({
    limit, offset, search
  }) {
    const condition = {};
    if (search) {
      condition.name = { [Op.like]: `%${search}%` };
    }
    return Group.findAndCountAll({
      where: condition,
      offset: (offset - 1) * limit,
      limit: parseInt(limit, 10),
      sabQuery: false,
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = GroupService;
