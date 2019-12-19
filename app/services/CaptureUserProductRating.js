const rootPrefix = '../..',
  ServicesBase = require(rootPrefix + '/app/services/Base'),
  basicHelper = require(rootPrefix + '/helpers/basic'),
  ProductsModel = require(rootPrefix + '/models/Product'),
  UserProductRatingsModel = require(rootPrefix + '/models/UserProductRating'),
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  CommonValidators = require(rootPrefix + '/helpers/validators');

class CaptureUserProductRating extends ServicesBase{
  constructor(params){
    super(params);
    const oThis = this;
    
    console.log('--params--', params);
    
    oThis.currentUser = params.current_user;
    oThis.productId = params.product_id;
    oThis.rating = params.rating;
  
    oThis.userId = oThis.currentUser.id;
    
  }
  
  /**
   * Async Perform
   *
   * @returns {Promise<void>}
   * @private
   */
  async _asyncPerform(){
    const oThis = this;
    
    await oThis._validateAndSanitize();
    
    await oThis._fetchProductAndValidate();
    
    await oThis._insertInUserProductRating();
    
    await oThis._updateProductsAverageRating();
    
    return {
      success: true,
      code: 200
    }
    
  }
  
  /**
   * Validate And Sanitize
   *
   * @returns {Promise<void>}
   * @private
   */
  async _validateAndSanitize() {
    const oThis = this;
    
    if(!CommonValidators.isValidRating(oThis.rating)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Invalid rating.'})
    }
  
    if(!CommonValidators.validateNonZeroInteger(oThis.productId)){
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Invalid product id.'})
    }
  }
  
  /**
   * Fetch product and validate.
   *
   * @returns {Promise<void>}
   * @private
   */
  async _fetchProductAndValidate() {
    const oThis = this;
    
    let product = await ProductsModel.findOne({
      where: {id: oThis.productId}
    });
    
    if(!product) {
      return Promise.reject({
        success: false,
        code: 422,
        error: 'Incorrect product id.'})
    }
    
    oThis.currentRating = product.dataValues.average_rating;
    oThis.reviewsCount  = product.dataValues.review_count;
  }
  
  /**
   * Insert in user product rating
   *
   * @returns {Promise<void>}
   * @private
   */
  async _insertInUserProductRating() {
    const oThis = this;
  
    let insertResponse = await UserProductRatingsModel.create({
      user_id: oThis.userId,
      product_id: oThis.productId,
      rating: oThis.rating
    }).catch(function(err){
      if(err.name === 'SequelizeUniqueConstraintError'){
        return Promise.reject({
          success: false,
          code: 422,
          error: 'User has already provided rating for the given product.'
        })
      } else {
        return Promise.reject(err);
      }
    });
  }
  
  /**
   * Update products average rating
   *
   * @returns {Promise<void>}
   * @private
   */
  async _updateProductsAverageRating() {
    const oThis = this;
  
    let newProductRating = oThis.rating;
    if(oThis.currentRating !== null){
      newProductRating = (parseFloat(oThis.currentRating) + parseFloat(oThis.rating)) / (oThis.reviewsCount + 1);
    }
    await ProductsModel.update({
        average_rating: newProductRating,
        review_count: oThis.reviewsCount + 1
      }, {
        where: {id: oThis.productId}
      });
  }
  
}

module.exports = CaptureUserProductRating;
