import { _UpdateWriteOpResult } from 'mongoose'
import ProductRepository from '../database/repositories/ProductRepository'
import Product from '../interfaces/Product'



export default class ProductService {

  private productRepository = new ProductRepository()

  async createProduct(product: Product[]) {
    
    const productArray = this.createNewProductModelArray(product)
    return (!this.isProductArrayValid(productArray) 
      ? null
      : await this.productRepository.createMany(productArray))
  }

  async findAll() {
    const result = await this.productRepository.findAll()
    return result
  }

  async findById(id: String) {
    const result = await this.productRepository.findById(id)

    return(!result
      ? null
      : result) 
  }

  async deleteAll() {
    return await this.productRepository.deleteAll()
  }

  async deleteById(id: String) {
    const deleted = await this.productRepository.deleteById(id)
    return await deleted
  }

  async update(id: String ,product: Product) {
    const updated = await this.productRepository.update(id, product) 
    return updated
  }
  
  private async isCollectionAlreadyEmpty() {
    const collection = await this.findAll()
    return (collection.length === 0
      ? true
      : false)
  }

  private isProductArrayValid(product: Product[]) {
    let isValid: boolean = true
    product.forEach(product => {
      if(!this.isProductValid(product)){
        isValid = false
      }
    })
    return isValid
  }

  private isProductValid(product: Product) {
    const {name, price, description} = product
    if(name === '' || price === null || description === ''){
      return false
    }
    if(name === undefined || price === undefined || description === undefined){
      return false
    }
    return true
  }

  private createNewProductModel(product: Product) {
    const newProduct: Product = {
      name: product.name.trim(),
      price: product.price,
      description: product.description.trim(),
      out_of_stock: product.out_of_stock === null ? false : product.out_of_stock
    }

    return newProduct
  }

  private createNewProductModelArray(product: Product[]) {
    const productArray: Product[] = product.map(product => {
      product = {
        name: product.name.trim(),
        price: product.price,
        description: product.description.trim(),
        out_of_stock: product.out_of_stock === null ? false : product.out_of_stock
      }
      return product
    });
    
    return productArray
  }

}

 