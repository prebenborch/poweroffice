import {Token} from '../entity/Token';
import {TenantService} from './index.service';
import axios from 'axios';
import * as qs from 'qs';

import * as config from 'config';
import * as dss from '../data-source';

export class TokenService {
  private config: any;

  constructor() {
    this.config = config;
  }

  public async getTokenOfPowerOffice(user: any) {
    const tenantService = new TenantService();
    const tenant = tenantService.getTenantByUser(user);

    const powerOfficeConfig: any = this.config.powerOffice;

    const response = await axios({
      method: 'post',
      url: powerOfficeConfig.tokenUrl,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: tenant.clientId,
        password: tenant.clientSecret,
      },
      data: qs.stringify({
        'grant_type': 'client_credentials',
      }),
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      console.log(err);
    });

    return response;
  }

  async saveTokenToDB(tenant: any, token: any) {
    const now = new Date();
    let dataSource = dss[tenant.datasource];
    const data = new Token();
    data.access_token = token.access_token;
    data.refresh_token = token.refresh_token;
    data.expires_in = token.expires_in;
    data.user = tenant.user;
    data.password = tenant.password;
    //data.companyId = 'companyId';
    data.created = data.created || now;
    data.updated = now;
    await dataSource.manager.save(data);
    console.log('Saved a new user with id: ' + data.Id);
  }

  /*async getTokenFromDB(db: string): Promise<Token> {
    const repo = getConnection(db).getRepository('Token');
    return (await repo.findOne()) as Token;
  }

  async deleteToken(db: string) {
    const repo = getConnection(db).getRepository('Token');
    const result = repo.clear();
    return result;
  }*/
}
