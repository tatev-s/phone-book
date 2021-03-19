// START Create PhoneBook
exports.createPhoneBookSchema = {
  firstName: { type: 'string', optional: false, empty: false },
  lastName: { type: 'string', optional: false, empty: false },
  phoneNumber: { type: 'string', optional: false, empty: false },
  groups: {
    type: 'array', min: 1, empty: false, optional: false
  }
};
// END Create PhoneBook

// START Update PhoneBook
exports.updatePhoneBookSchema = {
  firstName: { type: 'string', optional: true, empty: false },
  lastName: { type: 'string', optional: true, empty: false },
  phoneNumber: { type: 'string', optional: true, empty: false },
  groups: {
    type: 'array', min: 1, empty: true, optional: false
  }
};
// END Update PhoneBook

// START Create Group
exports.createGroupSchema = {
  name: { type: 'string', optional: false, empty: false }
};
// END Create Group

// START Update Group
exports.updateGroupSchema = {
  name: { type: 'string', optional: true, empty: false }
};
// END Update Group

