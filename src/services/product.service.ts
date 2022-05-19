import * as config from 'config';
import axios from 'axios';

export class ProductService {
  public config: any;

  constructor() {
    this.config = config;
  }

  public async getProductsFromPowerOffice(token: any) {
    const powerOfficeConfig: any = this.config.powerOffice;

    const headers = {
      Authorization: 'Bearer ' + token
    };

    return await axios({
      method: 'get',
      url: powerOfficeConfig.productURL,
      headers: headers,
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  }

}
