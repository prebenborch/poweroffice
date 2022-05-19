import * as config from 'config';
import axios from 'axios';
import qs = require('qs');

export class CustomerService {
  public config: any;

  constructor() {
    this.config = config;
  }

  public async getCustomersFromPowerOffice(token: any) {
    const powerOfficeConfig: any = this.config.powerOffice;

    const headers = {
      Authorization: 'Bearer ' + token
    };

    return await axios({
      method: 'get',
      url: powerOfficeConfig.customerURL,
      headers: headers,
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      return err;
    });
  }

  public async createCustomer(token: any, customer: any) {
    const powerOfficeConfig: any = this.config.powerOffice;
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    };

    return await axios({
      method: 'post',
      url: powerOfficeConfig.customerURL,
      headers: headers,
      data: JSON.stringify(customer)
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      console.log(err);
      return err;
    });
  }

}
