const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
   {
      firstName: {
         type: String,
         trim: true,
         lowercase: true,
         minLength: [3, "firstName minimum 3 char"],
         maxLength: [100, "firstName minimum 100 char"],
         required: [true, "please provide your first name"],
      },
      lastName: {
         type: String,
         trim: true,
         lowercase: true,
         minLength: [3, "lastName minimum 3 char"],
         maxLength: [100, "lastName minimum 100 char"],
         required: [true, "please provide your last name"],
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         validate: [validator.isEmail, "Please provide a valid email"],
         required: [true, "please provide an email"],
      },
      phoneNumber: {
         type: String,
         trim: true,
         validate: [
            validator.isMobilePhone,
            "Please provide a valid phoneNumber",
         ],
      },
      password: {
         type: String,
         validate: {
            validator: (value) => {
               validator.isStrongPassword(value, {
                  minLength: 6,
                  minLowercase: 3,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
               });
            },
         },
      },
      confirm: {
         type: String,
         validate: {
            validator: function (value) {
               return value === this.password;
            },
         },
      },
      role: {
         type: String,
         enum: {
            values: ["admin", "user"],
            message: "{VALUE} shouldn't be role",
         },
         default: "user",
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre("save", function (next) {
   this.password = bcrypt.hashSync(this.password);
   this.confirm = bcrypt.hashSync(this.confirm);
   next();
});

userSchema.methods.comparePassword = (password, hash) => {
   const isPasswordValid = bcrypt.compareSync(password, hash);
   return isPasswordValid;
};

userSchema.methods.createJWT = async function () {
   try {
      const accessToken = jwt.sign(
         { email: this.email, name: this.name },
         process.env.SCRET_KEY,
         {
            expiresIn: "1d",
         }
      );
      return accessToken;
   } catch (err) {
      throw new Error(er);
   }
};
const User = mongoose.model("User", userSchema);

module.exports = User;
