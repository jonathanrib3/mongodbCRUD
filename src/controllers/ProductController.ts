import {Request, Response}  from 'express';

import { ExceptionMessages } from '../messages/exceptionsMessages';
import { Messages } from '../messages/successfulMessages';
import ProductService from '../services/ProductService';
import { isBodyEmpty } from './aux_methods/checkEmptyBody';
import { idExists } from './aux_methods/checkId';

export default class ProductController {
  
  private productService: ProductService
  
  constructor() {
    this.productService = new ProductService()
  }

  async create(req: Request, res: Response) {
    const { body } = req
    if(isBodyEmpty(body)){
      return res.status(400).send(ExceptionMessages.EMPTY_BODY_ERROR)
    }
    const products = await this.productService.createProduct(body)

    return(!products
      ? res.status(500).send(ExceptionMessages.INVALID_PRODUCT_ERROR)
      : res.status(200).send(products))
  }

  async findAll(req: Request, res: Response) {
    const products = await this.productService.findAll()
    return (products.length === 0 
      ? res.status(500).send(ExceptionMessages.GET_DATA_ERROR)
      : res.send(products))
  }

  async findById(req: Request, res: Response) {
    const productFound = await this.productService.findById(req.params.id)

    return(!productFound
      ? res.status(500).send(ExceptionMessages.INVALID_ID_ERROR)
      : res.status(200).send(productFound))
  }

  async deleteAll(req: Request, res: Response) {
    const deleted = await this.productService.deleteAll()
    console.log(deleted)
    return(deleted?.deletedCount === 0
      ? res.status(500).send(ExceptionMessages.DATA_DELETE_ERROR)
      : res.status(200).send(Messages.DELETE_ALL_SUCCESSFUL));
  }

  async deleteById(req: Request, res: Response) {
    if(await !idExists(req.params.id)){
      return res.status(500).send(ExceptionMessages.INVALID_ID_ERROR)
    }
    const deleted = await this.productService.deleteById(req.params.id)
    console.log(deleted)
    return(!deleted
      ? res.status(500).send(ExceptionMessages.DATA_DELETE_ERROR)
      : res.status(200).send(Messages.DELETE_SUCCESSFUL));
  }

  async update(req: Request, res: Response) {
    const { params, body } = req
    if(await !idExists(params.id)){
      return res.status(400).send(ExceptionMessages.INVALID_ID_ERROR)
    }

    const updated = await this.productService?.update(params.id, body)
    if(!updated) {
      return res.status(500).send(ExceptionMessages.NULL_UPDATE_OBJECT_ERROR)
    }
    return (updated?.nModified === 0 
      ? res.status(500).send(ExceptionMessages.DATA_UPDATE_ERROR) 
      : res.status(200).send(Messages.UPDATE_SUCCESSFUL))
  }
}
