import * as dss from './data-source';
import * as express from 'express';
import {ApiController} from './api';

const port = 8503;
const app = express();
app.use(express.json());

app.use('/api', ApiController);

Promise.all([dss.AppDataSource.initialize(), dss.AppDataSource2.initialize()])
  .then(values => {
    //console.log(values);
    console.log('... ... ... all Database initialized');
  })
  .catch(error => {
    console.error(error.message);
  });

app.listen(port, () => {
  console.log('Server Started at Port, ' + port);
});
