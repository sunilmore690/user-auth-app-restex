module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: Date
  });

  userSchema.pre("save", function(done) {
    if (this.isNew) {
      this.createdAt = new Date();
    } else {
      this.updatedAt = new Date();
    }
    done();
  });
  userSchema.statics = {
    collectionName: "users",
    routeOption: {
      middleware: ["isAuthenticated"]
    }
  };
  return userSchema;
};
