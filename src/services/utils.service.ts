import * as moment from 'moment';

export function messageLog(user: string, message: string, obj: any = null) {
  console.log(
    moment().format('DD.MM.YYYY HH:mm:ss') + ' [' + user + '] ' + message
  );
  if (obj) {
    console.log(obj);
  }
}
