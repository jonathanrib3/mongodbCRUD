import { Router, Response, Request } from 'express'
import { celebrate, Joi, errors, Segments  } from 'celebrate'
import cors from 'cors'

import ProductController from '../controllers/ProductController'


const routes = Router()
const productController = new ProductController()

routes.get('/products', (req: Request, res: Response) => productController.findAll(req, res))
routes.get('/products/:id', (req: Request, res: Response) => productController.findById(req, res))

routes.post('/products', celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      out_of_stock: Joi.boolean(),
    })  
  )
}), (req: Request, res: Response) => productController.create(req, res))
routes.use(errors());

routes.delete('/products', (req: Request, res: Response) => productController.deleteAll(req, res))
routes.delete('/products/:id', (req: Request, res: Response) => productController.deleteById(req, res))
/*
  ({
    
  })
*/
routes.put('/products/:id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    out_of_stock: Joi.boolean(),
  })
}), (req: Request, res: Response) => productController.update(req, res))

export default routes