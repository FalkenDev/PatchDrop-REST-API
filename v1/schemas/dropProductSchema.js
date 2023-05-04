const { model, Schema } = require("mongoose");

const patchInfo = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["Embroidered", "Woven"],
  },
  size: {},
  embroiderySurface: {
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    diameter: {
      type: Number,
    },
  },
  fabricCOlor: {},
  quantity: {},
  back: {
    type: String,
    required: true,
    enum: ["Simple", "Iron-on", "Burdock"],
  },
  corner: {},
  other: {},
});

const dropProductSchema = new Schema(
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
    slug: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {},
    subCategory: {},
    discount: {
      type: Boolean,
      required: true,
      default: false,
    },
    purchasesNeed: {
      type: Number,
      default: 0,
    },
    productStage: {
      type: String,
      required: true,
      enum: ["InStock", "ShipSoon", "PreOrder"],
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Created",
        "Confirmation",
        "Open",
        "Completed",
        "Closed",
        "Rejected",
      ],
      default: "Created",
    },
    publishedAt: {
      // When status is "Open"
      type: Date,
      required: false,
    },
    content: {},
    logs: [String],
  },
  {
    timestamps: true,
  }
);

moongose.model("DropProduct", dropProductSchema);
module.exports = model("DropProduct", dropProductSchema);
