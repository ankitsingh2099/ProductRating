const rootPrefix = '../..',
  cookieHelper = require(rootPrefix + '/helpers/cookie');

exports.signup = function (req, res) {
  const SignupService = require(rootPrefix + '/app/services/Signup');
  let signup = new SignupService(req.body);
  
  signup.perform().then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.success){
        cookieHelper.setLoginCookie(res,rsp.cookieValue);
        res.status(200).json({success: true});
        res.send();
      } else {
        res.status(rsp.code).json(rsp);
      }
    }
  });
};

exports.login = function (req, res) {
  const Login = require(rootPrefix + '/app/services/Login');
  let login = new Login(req.body)
  login.perform().then(function(rsp){
    if(!rsp){
      res.status(500).json({});
    } else {
      if(rsp.success){
        cookieHelper.setLoginCookie(res,rsp.cookieValue);
        res.status(200).json({success: true});
        res.send();
      } else {
        res.status(rsp.code).json(rsp);
      }
    }
  });
};
