const HTTP_STATUS_METHODS = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  unauthorized: 401,
  notValid: 422,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
  serviceNotAvailable: 503
};

const PAGINATION = {
  LIMIT: 10,
  OFFSET: 1,
  START: 0,
  END: 50,
  ALL: 'ALL'
};

module.exports = {
  HTTP_STATUS_METHODS,
  PAGINATION
};
