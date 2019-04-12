const express = require("express"),
  bodyParser = require("body-parser"),
  RestEx = require("restex"),
  path = require("path");

let app = express();
app.use(bodyParser.json());
app.use(function(req,res,next){
  
    console.log('Url',req.originalUrl,req.method)
    next()
})
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res, next) {
  res.json({ message: "Welcome To resetex mongodb demo app" });
});
let restex = new RestEx(app, {
  database: {
    provider: "mongo", //mongodb,mysql
    conn: {
      // mongooseConnection: mongoose.connection
      uri: "mongodb://localhost:27017/user-auth-app"
    }
  },
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log('err',err)
  // set locals, only providing error in development
  // render the error page
  res.status(err.status || 500);
  res.send(err.message || "Something Went wrong");
});
app.listen(3004, function() {
  console.log("restex-mongod-demo listening on 3002");
});
process.on('unhandledRejection',function(err){
    console.log('err',err)

})