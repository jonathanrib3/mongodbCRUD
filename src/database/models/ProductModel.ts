import { model } from 'mongoose';
import Product from '../../interfaces/Product';
import { productSchema } from '../schemas/ProductSchema';

export const ProductModel = model<Product>('Product', productSchema)



