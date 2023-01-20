const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    rolAdmin: {
      type: Boolean,
      required: true,
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
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
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
module.exports = mongoose.model("User", userSchema);
