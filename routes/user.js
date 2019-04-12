module.exports = function(router) {
  router.post("/authenticate", "user#authenticate");
  router.post("/register", "user#register");
};
