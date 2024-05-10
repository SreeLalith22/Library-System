import express from 'express';
import { add_product_handler, delete_product_handler, getone_productId_handler, getone_productname_handler, put_product_handler } from './product-handler';


const productRouter = express.Router();

productRouter.post('/addProduct', express.json(), add_product_handler);
productRouter.get('/:product_name', getone_productname_handler);
productRouter.get('/:product_id', getone_productId_handler);
productRouter.delete('/:product_id', delete_product_handler);
productRouter.put("/update/:product_id", put_product_handler);

export default productRouter;