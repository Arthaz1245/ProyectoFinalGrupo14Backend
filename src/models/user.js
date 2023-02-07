const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    rolAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (str) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    // resetToken: {
    //   type: String,
    // },
    address: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    myPurchases: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  { versionKey: false }
);

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const isSamePassword = await bcrypt.compare(password, user.password);
  if (isSamePassword) return user;
  throw new Error("Invalid credentials");
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
//Validar si este metodo se ejecuta si el dato es nuevo o esta siendo modificado
//Antes de guardar la password se hashea
const saltRounds = 10;

userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const user = this;
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  } else {
    next();
  }
});
// userSchema.methods.generateResetToken = function () {
//   const user = this;

//   const resetToken = jwt.sign(
//     { _id: user._id.toString() },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "10m",
//     }
//   );

//   user.resetToken = resetToken;
//   return user.save();
// };
//antes de que se remueva de la database
userSchema.pre("remove", function (next) {
  this.model("Order").remove({ owner: this._id }, next);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
