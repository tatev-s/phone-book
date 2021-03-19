const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require('fast-csv');
const { RESOURCE_NOT_FOUND } = require('../../../utils/errorDetails');
const { ResourceNotFoundError } = require('../../../modules/exceptions');
const {
  PhoneBook, Group, Sequelize
} = require('../../../data/models');

const { Op } = Sequelize;
/**
 * Abstract Class PhoneBookService
 */
class PhoneBookService {
  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static async create({ data: { groups, ...rest }, transaction }) {
    try {
      const phoneBook = await PhoneBook.create(rest, { transaction });
      await phoneBook.addGroups(groups, { transaction });
      await transaction.commit();
      return phoneBook;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
     *
     * @param data
     * @returns {Promise.<*>}
     */
  static async import({ file: { file } }) {
    return new Promise((resolve) => {
      const { path } = file;
      const items = [];
      const groups = [];
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          items.push(row);
          if (row.group) {
            const groupsArr = row.group.split('|');
            groupsArr.forEach((group) => {
              groups.push({ name: group });
            });
          }
        })
        .on('end', async () => {
          await Group.bulkCreate(groups, { ignoreDuplicates: true });
          const promises = items.map(async (item) => {
            const {
              first_name: firstName, last_name: lastName, phone_number: phoneNumber, group: rowGroups
            } = item;
            const groupArr = rowGroups.split('|');
            const phoneBook = await PhoneBook.create({
              firstName, lastName, phoneNumber
            });

            const groupIds = [];
            for (let i = 0; i < groupArr.length; i++) {
              const group = await Group.findOne({ where: { name: groupArr[i] } });
              if (group) {
                groupIds.push(group.id);
              }
            }
            await phoneBook.addGroups(groupIds);
          });
          Promise.allSettled(promises)
            .then((allSettled) => {
              const fulfilled = allSettled.filter(settled => settled.status === 'fulfilled').length;
              resolve({ allSettled: allSettled.length, rejected: allSettled.length - fulfilled, fulfilled });
            });
        });
    });
  }

  /**
     *
     * @param data
     * @param id
     * @param transaction
     * @returns {Promise<*>}
     */
  static async update({ data: { groups, ...rest }, id, transaction }) {
    const phoneBook = await PhoneBookService.getById({ id });
    if (!phoneBook) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);
    try {
      await phoneBook.update(rest, { transaction });
      await phoneBook.setGroups(groups, { transaction });
      await transaction.commit();
      return phoneBook;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
     *
     * @param id
     * @returns {Promise.<*>}
     */
  static async getById({ id }) {
    const phoneBook = await PhoneBook.findByPk(id);
    const phoneBookGroups = await phoneBook.getGroups();
    phoneBook.dataValues.groups = phoneBookGroups.map(group => group.id);
    return phoneBook;
  }

  /**
     *
     * @param id
     * @returns {Promise<void>}
     */
  static async delete({ id }) {
    const phoneBook = await PhoneBookService.getById({ id });
    if (!phoneBook) throw new ResourceNotFoundError(RESOURCE_NOT_FOUND);
    return phoneBook.destroy();
  }

  /**
     *
     * @param limit
     * @param offset
     * @param search
     * @returns {Promise.<*>}
     */
  static async get({
    limit, offset, search
  }) {
    const condition = {};
    if (search) {
      condition[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { phoneNumber: { [Op.like]: `%${search}%` } }
      ];
    }
    return PhoneBook.findAndCountAll({
      where: condition,
      offset: (offset - 1) * limit,
      limit: parseInt(limit, 10),
      sabQuery: false,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Group,
          through: {
            attributes: []
          },
          attributes: ['id', 'name'],
          as: 'groups',
          required: false
        }
      ]
    });
  }
}

module.exports = PhoneBookService;
