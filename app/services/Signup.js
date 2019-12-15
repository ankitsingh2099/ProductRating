const rootPrefix = '../..',
  ServiceBase = require(rootPrefix + '/app/services/Base'),
  CommonValidators = require(rootPrefix + '/helpers/validators'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  UserModel = require(rootPrefix + '/models/User');

const crypto = require('crypto');

/**
 * Signup
 *
 * @Class
 */
class Signup extends ServiceBase{
  /**
   *
   * @param params
   * @constructor
   */
  constructor(params){
    super(params);
    const oThis = this;
    
    oThis.password = params.password;
    oThis.emailId = params.email_id;
    oThis.mobileNumber = params.mobile_number;
  }
  
  /**
   * Perform
   *
   * @returns {Promise<void>}
   */
  async _asyncPerform(){
    const oThis = this;
    
    let response = await oThis._validateAndSanitize();
    if(!response.success){
      return response;
    }
    
    oThis.encryptionSalt = await basicHelper._generateRandomString(10);
    
    oThis.passwordHash = await basicHelper._generatePasswordHash(oThis.password, oThis.encryptionSalt);
    
    await oThis._insertInUsers();
    
    await oThis._prepareCookieValue();
    
    return {
      success: true,
      cookieValue: oThis.cookieValue
    }
  }
  
  /**
   * Validate and Sanitize.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;
    
    if(!CommonValidators.validateEmailId(oThis.emailId)){
      return {
        success: false,
        code: 422,
        error: 'Invalid Email Id'
      }
    }
    
    if(!CommonValidators.validatePasswordString(oThis.password)){
      return {
        success: false,
        code: 422,
        error: 'Invalid Password. Password should contain minimum 4 characters with at least one letter and one number.'
      }
    }
    
    if(!CommonValidators.validateMobileNumber(oThis.mobileNumber)){
      return {
        success: false,
        code: 422,
        error: 'Invalid Mobile Number'
      }
    }
    
    return {
      success: true
    }
  }
  
  /**
   * Insert in users table.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _insertInUsers() {
    const oThis = this;
    
    let insertResponse = await UserModel.create({
      email_id: oThis.emailId,
      password: oThis.passwordHash,
      mobile_number: oThis.mobileNumber,
      encryption_salt: oThis.encryptionSalt
    });
    
    oThis.userId = insertResponse.dataValues.id;
  }
  
  async _prepareCookieValue() {
    const oThis = this;
    
    oThis.cookieValue = cookieHelper.createLoginCookieValue(oThis.userId);
  }
  
}

module.exports = Signup;
