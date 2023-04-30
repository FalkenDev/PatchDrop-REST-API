import mongoose from "mongoose";
import { ObjectId } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: String,
    facebookId: String,
    username: { type: String, required: true },
    name: {
      first: String,
      last: String,
    },
    gender: String,
    phoneNumber: String,
    email: String,
    password: String,
    address: {
      adreess: String,
      postalCode: Number,
      place: String,
      country: String,
    },
    drops: {},
    biddings: {},
    posts: {},
    settings: {},
    payment: {
      payment_type: String,
      provider: String,
      account_no: Number,
      expiry: Date,
    },
    reviews: {},
    generalInfo: {},
    orderHistory: {
      drops: [
        {
          products: {},
          totalPrice: Number,
          createdAt: Number,
          user: {},
          payment: {},
        },
      ],
      biddings: [],
    },
    lastLogedIn: {},
    updatedAt: Date,
    createdAt: Date,
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + " " + this.name.last;
        },
        set(v) {
          this.name.first = v.substr(0, v.indexOf(" "));
          this.name.last = v.substr(v.indexOf(" ") + 1);
        },
      },
    },
  }
);
