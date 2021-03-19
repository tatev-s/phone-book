/* eslint-disable max-classes-per-file */
const { BASE_ERRORS } = require('./constants');

class BaseError extends Error {}
class InternalServerError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INTERNAL_SERVER_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: BASE_ERRORS.INTERNAL_SERVER_ERROR.debug };

    return error;
  }
}
class InvalidUserInput extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      if (this.details.name) {
        delete this.details.name;
      }
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.INVALID_USER_INPUT.debug };
    }

    return error;
  }
}

class RequiredParameterNotProvided extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.REQUIRED_PARAMETER_NOT_PROVIDED;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class SequelizeError extends BaseError {
  constructor(exception) {
    super();
    this.exception = exception;
    this.details = exception.errors ? exception.errors[0].message : exception.message;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      error = { ...error, details: this.details };
      if (!this.exception.errors) { [error.details, error.debug] = [error.debug, error.details]; }
      error.details = {
        message: error.details
      };
    }
    return error;
  }
}

class SomethingWentWrong extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.SOMETHING_WENT_WRONG;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: { message: BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR.debug } };
    return error;
  }
}

class BadRequest extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.BAD_REQUEST;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

module.exports = {
  BaseError,
  BadRequest,
  InvalidUserInput,
  RequiredParameterNotProvided,
  ResourceNotFoundError,
  SequelizeError,
  SomethingWentWrong,
  InternalServerError
};
