import {Request, Response, Router} from 'express';
import {TokenService} from '../../services/token.service';
import {CustomerService} from '../../services/customer.service';
import {ProductService} from '../../services/product.service';

const router: Router = Router({mergeParams: true});

class ProductsController {
    async getProducts(req: Request, res: Response) {
        try {
            const tokenService = new TokenService();
            const token = await tokenService.getTokenOfPowerOffice(
                req.query.siteId
            );

            const customerService = new ProductService();
            const customers = await customerService.getProductsFromPowerOffice(token.access_token);

            res.status(200).json({success: true, customers});
        } catch (e) {
            console.log(e);
            res.sendStatus(500);

            throw new Error(e);
        }
    }

}

const controller = new ProductsController();

router.get('/', (req: Request, res: Response, next) => {
    controller.getProducts(req, res);
});

export const productsController: Router = router;
