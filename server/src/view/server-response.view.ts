import _  from 'lodash';

class ServerResponse {
  status: string;
  value: any;

  constructor(status: string, value: any) {
    this.status = status;
    this.value = value;
  }

  static success(value?: (any | Array<any>)): ServerResponse {
      if (!_.isNil(value)) {
        return Array.isArray(value)? new ServerResponse('success', value): new ServerResponse('success', [ value ]);
      } else {
        return new ServerResponse('success', [ ]);
      }
      return new ServerResponse('success', value);
  }

  static failure(value: any): ServerResponse {
      return new ServerResponse('failure', value);
  }

}
export default ServerResponse;
