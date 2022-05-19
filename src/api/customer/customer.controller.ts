import {Request, Response, Router} from 'express';
import {TokenService} from '../../services/token.service';
import {CustomerService} from '../../services/customer.service';

const router: Router = Router({mergeParams: true});

class CustomerController {
    async getCustomers(req: Request, res: Response) {
        try {
            const tokenService = new TokenService();
            const token = await tokenService.getTokenOfPowerOffice(
                req.query.siteId
            );

            const customerService = new CustomerService();
            const customers = await customerService.getCustomersFromPowerOffice(token.access_token);

            res.status(200).json({success: true, customers});
        } catch (e) {
            console.log(e);
            res.sendStatus(500);

            throw new Error(e);
        }
    }

    async postCustomer(req: Request, res: Response) {
        try {
            const tokenService = new TokenService();
            const token = await tokenService.getTokenOfPowerOffice(
                req.query.siteId
            );

            const cdata = req.body;

            const customerService = new CustomerService();
            const customer = await customerService.createCustomer(token.access_token, cdata);

            res.status(200).json({success: true, customer});
        } catch (e) {
            console.log(e);
            res.sendStatus(500);

            throw new Error(e);
        }
    }

}

const controller = new CustomerController();

router.get('/', (req: Request, res: Response, next) => {
    controller.getCustomers(req, res);
    /*controller.get(req, res)
        .then(() => {
            res.set("Connection", "close");
        }).catch(e => {
        next(e);
    });*/
});

router.get('/:id', (req: Request, res: Response, next) => {
    res.send('with id');
})

router.post('/', (req: Request, res: Response, next) => {
    controller.postCustomer(req, res);
    /*controller.put(req, res)
        .then(() => {
        }).catch(e => {
        console.log('Customers not synced...')
        next(e);
    });*/
});

export const customerController: Router = router;
