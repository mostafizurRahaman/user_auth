const User = require("../models/user.model");

module.exports.getUserService = async () => {
   const users = await User.find({});
   return users;
};

module.exports.createUserService = async (data) => {
   const user = new User(data);
   const result = await user.save();

   return result;
};

module.exports.getUserByIdService = async (id) => {
   const user = await User.findById(id);
   return user;
};

module.exports.updateUserByIdService = async (id, data) => {
   const results = await User.updateOne({ _id: id }, data, {
      runValidators: true,
   });
   return results;
};
module.exports.deleteUserByIdService = async (id) => {
   const results = await User.deleteOne({ _id: id });
   return results;
};

module.exports.loginUserService = async (email) => {
   const user = await User.findOne({  email });
   return user;
};
