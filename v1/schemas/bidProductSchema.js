import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bidProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    slug: String,
    summary: String,
    type: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: String,
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Created",
        "Confirmation",
        "Started",
        "Completed",
        "AwaitingPayment",
        "Shipped",
        "Closed",
        "Rejected",
      ],
      default: "Created",
    },
    publishedAt: {
      type: Date,
      default: () => Date.now(),
    },
    startsAt: {
      type: Date,
      default: () => Date.now(),
    },
    endAt: {
      type: Date,
      required: true,
    },
    bidds: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        bidAmount: {
          type: Number,
          required: true,
        },
        bidAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
    content: {},
  },
  {
    timestamps: true,
  }
);

module.exports = model("BidProduct", bidProductSchema);
