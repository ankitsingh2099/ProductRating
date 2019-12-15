/**
 * Class for core constants.
 *
 * @class CoreConstants
 */
class CoreConstants {
  get environment() {
    return process.env.PR_ENVIRONMENT;
  }
  
  get APP_NAME() {
    return process.env.PR_APP_NAME;
  }
  
  get PA_COOKIE_DOMAIN() {
    return process.env.PR_COOKIE_DOMAIN;
  }
  
  get COOKIE_SECRET() {
    return process.env.PR_COOKIE_SECRET;
  }
}

module.exports = new CoreConstants();
