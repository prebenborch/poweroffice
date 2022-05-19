import * as bodyParser from 'body-parser';
import {Router, Request, Response} from 'express';
import {tokensController as TokensController} from './tokens/tokens.controller';
import { customersController as CustomersController } from './customers/customers.controller';
import {productsController as ProductsController} from './products/products.controller';

const router: Router = Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/tokens', TokensController);
router.use('/customer', CustomersController)
router.use('/product', ProductsController)

router.get('/', (req: Request, res: Response) => {
  res.send('PowerOffice api server is running!');
});

export const ApiController: Router = router;
