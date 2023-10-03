const {
   createUserService,
   getUserService,
   getUserByIdService,
   updateUserByIdService,
   deleteUserByIdService,
   loginUserService,
} = require("../services/user.service");

module.exports.getUsers = async (req, res, next) => {
   try {
      const user = await getUserService();
      res.status(200).send({
         status: "success",
         message: "Users found Successfully",
         data: user,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.createUser = async (req, res, next) => {
   try {
      const user = await createUserService(req.body);

      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User doesn't created",
         });
      }
      const accessToken = await user.createJWT();
      res.status(200).send({
         status: "success",
         message: "Users found Successfully",
         data: user,
         accessToken,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.getUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await getUserByIdService(id);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User not found with this id" + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "User found successfully",
         data: user,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.updateUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await getUserByIdService(id);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't find with this id" + id,
         });
      }

      const results = await updateUserByIdService(id, req.body);
      console.log(results);
      if (!results?.modifiedCount) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't update with this id" + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "User updated successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.deleteUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await getUserByIdService(id);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't find with this id" + id,
         });
      }

      const results = await deleteUserByIdService(id);
      console.log(results);
      if (!results?.deletedCount) {
         return res.status(400).send({
            status: "failed",
            message: "User didn't delete with this id" + id,
         });
      }
      res.status(200).send({
         status: "success",
         message: "User deleted successfully",
         data: results,
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};

module.exports.loginUser = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      if (!email) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide your email address",
         });
      }
      if (!password) {
         return res.status(400).send({
            status: "failed",
            message: "Please provide your password",
         });
      }
      const user = await loginUserService(email);
      if (!user) {
         return res.status(400).send({
            status: "failed",
            message: `user didn't found with this id ${email}`,
         });
      }
      const isPasswordValid = user.comparePassword(password, user?.password);
      if (!isPasswordValid) {
         return res.status(400).send({
            status: "failed",
            message: "email & password not matched",
         });
      }
      const accessToken = await user.createJWT();
      res.status(200).send({
         status: "success",
         message: "user found successfully",
         data: { user, accessToken },
      });
   } catch (err) {
      res.status(400).send({
         status: "failed",
         message: err.message,
         name: err.name,
      });
   }
};
