const express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser');

const rootPrefix = "..",
  AuthController = require(rootPrefix + '/app/controllers/Auth'),
  coreConstant = require(rootPrefix + '/coreConstants');

router.use(cookieParser(coreConstant.COOKIE_SECRET));

router.post('/sign-up', AuthController.signup);

router.post('/login',AuthController.login);

module.exports = router;
