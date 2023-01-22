const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

    phoneNumber: {
      type: Number,
    },

    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },
  },
  { minimize: false }
);
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invalid credentials");
  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (isSamePassword) return user;
  throw new Error("invalid credentials");
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
//Validar si este metodo se ejecuta si el dato es nuevo o esta siendo modificado
//Antes de guardar la password se hashea
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
