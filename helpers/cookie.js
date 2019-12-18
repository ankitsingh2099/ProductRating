const rootPrefix = '..',
  UserModel = require(rootPrefix + '/models/User'),
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
  
  /**
   * Create Login cookie value
   *
   * @param userId
   * @returns {string}
   */
  createLoginCookieValue(userId){
    const oThis = this,
      currentTimeStamp = Date.now();
    
    let stringToSign = userId + ':' + currentTimeStamp + coreConstants.COOKIE_SECRET;
    
    return userId + ':' + currentTimeStamp + ':' + basicHelper.createMd5Digest(stringToSign);
  }
  
  /**
   * Validate login cookie
   *
   * @param cookieValue
   */
  async validateLoginCookieValue(req, res, next) {
    const oThis = this,
      cookieValue = req.signedCookies[userConstants.loginCookieName];
    
    let splitParts = cookieValue.split(':'),
      userId = splitParts[0],
      timeStamp = splitParts[1],
      stringToSign = userId + ':' + timeStamp + coreConstants.COOKIE_SECRET,
      signedPart = basicHelper.createMd5Digest(stringToSign),
      finalCookieValue = userId + ':' + timeStamp + ':' + signedPart;
    
    if(finalCookieValue !== cookieValue) {
      res.status(401).json({success:false, reason: 'Invalid credentials'});
      res.send();
      return;
    }
  
    let dbRow = await UserModel.findOne({ where: {id: userId} });
    req.body.current_user = dbRow.dataValues;
    
    next();
  }
}

const cookieHelperObj = new CookieHelper();
module.exports = cookieHelperObj;
