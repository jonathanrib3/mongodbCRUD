import { ProductModel } from '../models/ProductModel';
import { connectDB, checkConnection } from '../dbConnection';
import Product from '../../interfaces/Product';
import Update from '../../interfaces/Update';
import { UpdateWriteOpResult } from 'mongoose';


export default class ProductRepository {

  private productModel = ProductModel

  constructor(){
     connectDB()
  }

  async create(product: Product) {
    await checkConnection()
    const newProduct = new ProductModel({
      name: product.name,
      price: product.price,
      description: product.description,
      out_of_stock: product?.out_of_stock
    })
    newProduct.save()
    return newProduct
  }

  async createMany(products: Product[]) {
    await checkConnection()
    const productsToBeInserted: Product[] = products

    this.productModel.insertMany(productsToBeInserted).catch(err => null)
    return productsToBeInserted
  }

  async findAll() {
    await checkConnection()
    const result = await this.productModel.find({}).lean().exec()
    return result
  }

  async findById(id: String) {
    await checkConnection()
    return await this.productModel.findById(id).catch(err => null)
  }

  async deleteAll() {
    await checkConnection()
    return await this.productModel.deleteMany({}).catch(err => null)
  }

  async deleteById(id: String) {
    await checkConnection()
    return await this.productModel.deleteOne({ _id: id })
  }
  
  async update(id: String, data: Product) : Promise<any> {
    await checkConnection()
    
    return await this.productModel.updateOne({_id : id},{
      name: data.name,
      price: data.price,
      description: data.description,
      out_of_stock: data.out_of_stock
    }).catch(err => null)
  }

  }

