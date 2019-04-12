
const config = require("config");
const jwt = require("jsonwebtoken");
module.exports = function(restex) {
  let UserDao = restex.dao('users');
  const isAuthenticated = function(req, res, next) {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, config.auth.tokenKey, function(err, payload) {
        if (err) return next(err);
        if (payload) {
          UserDao.get({ _id: payload.userId })
            .then(user => {
              req.user = user;
              next();
            })
            .catch(err => {
              return next(err);
            });
        } else {
          next({ status: 401, message: "Not Authorized" });
        }
      });
    } catch (e) {
      next(e);
    }
  };

  return {
      isAuthenticated
  }
};
