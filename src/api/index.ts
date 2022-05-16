import * as bodyParser from 'body-parser';
import {Router, Request, Response} from 'express';
import {tokensController as TokensController} from './tokens/tokens.controller';

const router: Router = Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/tokens', TokensController);

router.get('/', (req: Request, res: Response) => {
  res.send('PowerOffice api server is running!');
});

export const ApiController: Router = router;
