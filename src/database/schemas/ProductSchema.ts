import { Schema } from 'mongoose';

import Product from '../../interfaces/Product';

export const productSchema = new Schema<Product>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  out_of_stock: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now()}
})

