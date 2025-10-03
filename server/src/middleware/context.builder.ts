import _                  from 'lodash';
import config             from 'config';
import { verify }         from 'jsonwebtoken';

import Context            from 'model/context.model';

const jwtTokenParser = (token: string) => {
  return <any> verify(token, config.get('crypto.secret'));
};

const contextBuilder = (jwtToken?: string, request?: any) => {
  const query: any = {};
  _.forEach(request?.query ?? {}, (value: any, key: string) => {
    if (!_.isNil(value)) {
      query[key] = String(value);
    }
  });

  const body: any = {};
  _.forEach(request?.body ?? {}, (value: any, key: string) => {
    if (!_.isNil(value)) {
      body[key] = String(value);
    }
  });

  const ipAddress = String(_.get(request, 'headers.x-forwarded-for', ['unknown']));

  let jwtPayload;
  try {
    jwtPayload = jwtToken? jwtTokenParser(jwtToken): undefined;
  } catch (error: any) {
    // ignore error
  }

  const context = new Context(
    _.get(jwtPayload, 'email'),
    _.get(jwtPayload, 'userId'),
    _.chain(jwtPayload).get('roles').split(/\s*,\s*/).map(v => v.trim()).filter(v => v.length > 0).value(),
    ipAddress
  );

  return context;
};
export default contextBuilder;
