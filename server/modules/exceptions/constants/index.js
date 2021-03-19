const SEQUELIZE_ERRORS = {
  SequelizeValidationError: true,
  SequelizeUniqueConstraintError: true,
  SequelizeCheckConstraintError: true,
  SequelizeForeignKeyConstraintError: true,
  SequelizeDatabaseError: true
};

const BASE_ERRORS = {
  INTERNAL_SERVER_ERROR: { status: 500, statusName: 'internalServerError', debug: 'INTERNAL_SERVER_ERROR' },
  INVALID_USER_INPUT: { status: 400, statusName: 'badRequest', debug: 'INVALID_USER_INPUT' },
  REQUIRED_PARAMETER_NOT_PROVIDED: { status: 400, statusName: 'badRequest', debug: 'REQUIRED_PARAMETER_NOT_PROVIDED' },
  RESOURCE_NOT_FOUND_ERROR: { status: 404, statusName: 'notFound', debug: 'RESOURCE_NOT_FOUND_ERROR' },
  SOMETHING_WENT_WRONG: { status: 409, statusName: 'forbidden', debug: 'SOMETHING_WENT_WRONG' },
  BAD_REQUEST: { status: 400, statusName: 'badRequest', debug: 'BAD_REQUEST' }
};

module.exports = {
  SEQUELIZE_ERRORS,
  BASE_ERRORS
};
