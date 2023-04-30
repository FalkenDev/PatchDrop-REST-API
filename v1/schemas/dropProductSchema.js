import mongoose from "mongoose";
import { ObjectId } from "mongoose";
const { Schema } = mongoose;

const dropProductSchema = new Schema({
  userId: ObjectId,
  title: String,
  metaTitle: String,
  slug: String,
  summary: String,
  type: String,
  sku: String,
  price: Number,
  discount: String,
  quantity: Number,
  status: String,
  createdAt: Date,
  publishedAt: Date,
  updatedAt: Date,
  content: {},
});
