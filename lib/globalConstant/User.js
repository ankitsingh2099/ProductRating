const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic');

let invertedStatuses, propertiesHash, invertedPropertiesHash;

/**
 * Class for users constants.
 *
 * @class User
 */
class User {
  get activeStatus() {
    return 'ACTIVE';
  }
  
  get inActiveStatus() {
    return 'INACTIVE';
  }
  
  get statuses() {
    const oThis = this;
    
    return {
      '1': oThis.activeStatus,
      '2': oThis.inActiveStatus
    };
  }
  
  get invertedStatuses() {
    const oThis = this;
    
    invertedStatuses = invertedStatuses || basicHelper.invert(oThis.statuses);
    
    return invertedStatuses;
  }
  
  get loginCookieName() {
    return 'pla';
  }
  
  get cookieExpiryTime() {
    return 60 * 60 * 24 * 30; // 30 days
  }
  
  get nameLengthMaxLimit() {
    return 30;
  }
}

module.exports = new User();
