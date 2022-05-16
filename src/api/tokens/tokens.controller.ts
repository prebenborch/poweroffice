import {Request, Response, Router} from 'express';
import * as dss from '../../data-source';
import {User} from '../../entity/User';
import * as config from 'config';
import {TenantService} from '../../services/tenant.service';

const router: Router = Router({mergeParams: true});

class TokensController {
  async generateToken(req: Request, res: Response) {
    let dataSource;

    const tenantService = new TenantService();
    //const tenant = tenantService.getTenantByUser(req.body.site._name);
    const tenant = tenantService.getTenantByUser(req.query.siteId as string);

    dataSource = dss[tenant.datasource];

    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'From token TimberDD';
    user.lastName = 'Token Saw';
    user.age = 25;
    await dataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await dataSource.manager.find(User);
    console.log('Loaded users: ', users);

    return res.status(200).json({success: true});
  }
} // end of tenant controller class

const controller = new TokensController();

router.get('/generateToken', (req: Request, res: Response, next) => {
  controller.generateToken(req, res);
});

export const tokensController: Router = router;
