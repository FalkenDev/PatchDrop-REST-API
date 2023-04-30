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
  address: String,
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
  products: {
    type: Schema.Types.ObjectId,
    ref: "BidProduct",
  },
  totalPrice: Number,
  createdAt: Date,
  user: mongoose.SchemaTypes.ObjectId,
  paymentMethod: String,
  delivery: { deliverySchema },
});

const bidSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "DropProduct",
    },
  ],
  totalPrice: Number,
  createdAt: Date,
  user: mongoose.SchemaTypes.ObjectId,
  paymentMethod: String,
  delivery: { deliverySchema },
});

const deliverySchema = new Schema({
  deliveryAddress: {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  invoicingAddress: {
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
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
    gender: {
      type: String,
      required: true,
      enum: ["Man", "Kvinna", "ickebinär", "annat"],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
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
        type: Schema.Types.ObjectId,
        ref: "DropProduct",
      },
    ],
    biddings: [
      {
        type: Schema.Types.ObjectId,
        ref: "BidProduct",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
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
      payment_type: {
        type: String,
        required: false,
      },
      provider: {
        type: String,
        required: false,
      },
      account_no: {
        type: String,
        required: false,
      },
      expiry: {
        type: String,
        required: false,
      },
    },
    reviews: {},
    generalInfo: {},
    orderHistory: {
      dropProducts: [dropSchema],
      bidProducts: [bidSchema],
    },
    lastLogedIn: Date,
    credit: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
