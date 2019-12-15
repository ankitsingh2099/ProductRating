const rootPrefix = '..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  coreConstants = require(rootPrefix + '/coreConstants'),
  userConstants = require(rootPrefix + '/lib/globalConstant/user');

const cookieDefaultOptions = {
  httpOnly: true,
  signed: true,
  path: '/',
  domain: coreConstants.PA_COOKIE_DOMAIN,
  secure: basicHelper.isProduction(),
  sameSite: 'strict'
};


/**
 * Class for cookie helper.
 *
 * @class CookieHelper
 */
class CookieHelper {
  constructor(){}
  
  /**
   * Set login cookie.
   *
   * @param {object} responseObject
   * @param {string} cookieValue
   */
  setLoginCookie(responseObject, cookieValue) {
    let options = Object.assign({}, cookieDefaultOptions, {
      maxAge: 1000 * userConstants.cookieExpiryTime
    });
    
    // Set cookie
    responseObject.cookie(userConstants.loginCookieName, cookieValue, options); // Options is optional.
  }
  
  createLoginCookieValue(userId){
    const oThis = this,
      currentTimeStamp = Date.now();
    
    let stringToSign = userId + ':' + currentTimeStamp + coreConstants.COOKIE_SECRET;
    
    return userId + ':' + currentTimeStamp + ':' + basicHelper.createMd5Digest(stringToSign);
  }
}

const cookieHelperObj = new CookieHelper();
module.exports = cookieHelperObj;
