import mongoose from "mongoose";
const { model, Schema } = mongoose;

const nameSchema = new Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema({
  adreess: String,
  postalCode: Number,
  place: String,
  country: String,
});

const noticeSchema = new Schema({
  activeDevice: {
    type: Boolean,
    default: true,
  },
  buyer: {
    bidsWon: {
      type: Boolean,
      default: true,
    },
    overBid: {
      type: Boolean,
      default: true,
    },
    whishListEnd: {
      type: Boolean,
      default: true,
    },
  },
  seller: {
    firstBid: {
      type: Boolean,
      default: true,
    },
    forAllBid: {
      type: Boolean,
      default: true,
    },
    soldPatch: {
      type: Boolean,
      default: true,
    },
    paymentConfirm: {
      type: Boolean,
      default: true,
    },
  },
});

const payoutSchema = new Schema({
  bankTransfer: {},
  paypal: {},
});

const dropSchema = new Schema({
  products: { dropProductSchema },
  totalPrice: Number,
  createdAt: Date,
  user: mongoose.SchemaTypes.ObjectId,
  payment: {},
});

// Main schema
const userSchema = new Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    facebookId: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
    },
    name: nameSchema,
    gender: String,
    phoneNumber: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: addressSchema,
    drops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DropProduct",
      },
    ],
    biddings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BidProduct",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    settings: {
      notices: noticeSchema,
      security: {},
      payout: payoutSchema,
      language: {
        type: String,
        required: true,
        default: "Svenska",
      },
      currency: {
        type: String,
        required: true,
        default: "kronor",
      },
    },
    payment: {
      payment_type: String,
      provider: String,
      account_no: Number,
      expiry: Date,
    },
    reviews: {},
    generalInfo: {},
    orderHistory: {
      drops: [dropSchema],
      biddings: [],
    },
    lastLogedIn: {},
    credit: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
