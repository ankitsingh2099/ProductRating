const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  cookieHelper = require(rootPrefix + '/helpers/cookie'),
  AuthController = require(rootPrefix + '/app/controllers/Auth'),
  ProductsController = require(rootPrefix + '/app/controllers/Product'),
  coreConstant = require(rootPrefix + '/coreConstants');

router.use(cookieParser(coreConstant.COOKIE_SECRET));

router.post('/sign-up', AuthController.signup);

router.post('/login',AuthController.login);

router.get('/products', ProductsController.productsList);

router.use('/rating', cookieHelper.validateLoginCookieValue);
router.post('/rating', ProductsController.captureUserRating);
module.exports = router;
