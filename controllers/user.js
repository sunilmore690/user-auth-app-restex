let model_name = "users"; // make sure user schema exist in models dir
const config = require("config");
const jwt = require("jsonwebtoken");
module.exports = function(restex) {
  let UserDao = restex.dao(model_name);
  let authenticate = async function(req, res, next) {
    try {
      let user = await UserDao.get({
        email: req.body.email,
        password: req.body.password
      });
      if (user) {
        var token = jwt.sign({ userId: user.id }, config.auth.tokenKey);
        res.json({ user, token });
      } else {
        return next({ status: 421, message: "email or password wrong" });
      }
    } catch (e) {
      next(e);
    }
    //Using Promise then & catch
  };
  const register = async function(req, res, next) {
    try {
      UserDao.add({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(function(user) {
        res.json(user);
      });
    } catch (e) {
      next(e);
    }
    //Using Promise then & catch
  };
  return {
    authenticate,
    register
  };
};
