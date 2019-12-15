const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  UserModel = require(rootPrefix + '/models/User'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class Login extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    
    oThis.emailId = params.email_id;
    oThis.password = params.password;
  }
  
  async _asyncPerform(){
    const oThis = this;
    
    await oThis._validateAndSanitize();
    
    await oThis._fetchUserDetails();
    
    await oThis._verifyPassword();
    
    await oThis._prepareCookieValue();
    
    return {
      success: true,
      code: 200,
      cookieValue: oThis.cookieValue
    }
  }
  
  async _validateAndSanitize() {
    const oThis = this;
    
    if(!CommonValidators.validateEmailId(oThis.emailId)){
      return {
        success: false,
        code: 422,
        error: 'Invalid Email Id'
      }
    }
  }
  
  async _fetchUserDetails() {
    const oThis = this;
    
    let dbRow = await UserModel.findOne({ where: {email_id: oThis.emailId} });
    
    if(!dbRow){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Given email id does not exist in our system.'
      })
    }
    
    oThis.userDetails = dbRow.dataValues;
  }
  
  async _verifyPassword() {
    const oThis = this;
    
    let createdPasswordHash = await basicHelper._generatePasswordHash(oThis.password, oThis.userDetails.encryption_salt);
    
    if(createdPasswordHash != oThis.userDetails.password){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Incorrect password.'
      })
    }
  }
  
  async _prepareCookieValue() {
    const oThis = this;
    
    oThis.cookieValue = cookieHelper.createLoginCookieValue(oThis.userDetails.id);
  }
}

module.exports = Login;
