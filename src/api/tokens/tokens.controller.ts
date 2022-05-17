import {Request, Response, Router} from 'express';
import * as dss from '../../data-source';
import {User} from '../../entity/User';
import {TenantService, TokenService} from '../../services/index.service';

const router: Router = Router({mergeParams: true});

class TokensController {
  async generateToken(req: Request, res: Response) {
    const tenantService = new TenantService();
    const tenant = tenantService.getTenantByUser(req.query.siteId as string); // siteId == tenant.user

    try {
      const tokenService = new TokenService();
      const token = await tokenService.getTokenOfPowerOffice(
          req.query.siteId,
      );

      console.log('... ... ... token');
      console.log(token);

      await tokenService.saveTokenToDB(
          tenant,
          token,
      );

      // delete the token from db then again save new token
      /*await tokenService.deleteToken(tenant.user);
      await tokenService.saveTokenToDB(
          tenant,
          token.token,
          req.query.companyId as string
      );
      messageLog(
          tenant.user,
          'The token has been created and saved in DB successfully. Token: ' +
          token.token
      );*/
      return res.status(200).json({success: true, token});
    } catch (e) {
      console.log('Error!', e.message);
      return res.status(500).json({success: false, message: e.message});
    }
  }

  async generateToken2(req: Request, res: Response) {
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
