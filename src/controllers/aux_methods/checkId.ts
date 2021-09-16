import ProductService from "../../services/ProductService";


const productService = new ProductService()
export async function idExists(id: String) {
  return await productService.findById(id) !== null 
}