const rootPrefix = '../..',
  cookieHelper = require(rootPrefix + '/helpers/cookie');

exports.productsList = function (req, res) {
  const ProductsListService = require(rootPrefix + '/app/services/GetProducts');
  let productsList = new ProductsListService(req.body);
  
  productsList.perform().then(function(serviceResponse){
    if(!serviceResponse){
      res.status(500).json({});
    } else {
      if(serviceResponse.success){
        res.status(200).json(serviceResponse);
        res.send();
      } else {
        let errorCode = serviceResponse.code || 500;
        res.status(errorCode).json(serviceResponse);
      }
    }
  });
};

exports.captureUserRating = function (req, res) {
  const CaptureUserRating = require(rootPrefix + '/app/services/CaptureUserProductRating');
  let captureUserRating = new CaptureUserRating(req.body);
  captureUserRating.perform().then(function(serviceResponse){
    if(!serviceResponse){
      res.status(500).json({});
    } else {
      if(serviceResponse.success){
        res.status(200).json(serviceResponse);
        res.send();
      } else {
        let errorCode = serviceResponse.code || 500;
        res.status(errorCode).json(serviceResponse);
      }
    }
  });
};
