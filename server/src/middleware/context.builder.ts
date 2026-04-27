import _            from 'lodash';
import config       from 'config';
import { verify }   from 'jsonwebtoken';

import * as utils   from '@/utils';
import { Context }  from 'model/context.model';

const jwtTokenParser = (token: string) => {
  return <any> verify(token, config.get('crypto.secret'));
};

export const contextBuilder = (jwtToken?: string, request?: any) => {
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
    if (jwtPayload.version != config.get('jwt.version')) {
      throw new Error('JWT versions mismatch');
    }
    const createdAt = jwtPayload.createdAt? new Date(Date.parse(jwtPayload.createdAt)): new Date();
    if (!utils.isWithinDuration(createdAt, config.get('jwt.validDuration'))) {
      throw new Error('JWT createdAt is past valid duration');
    }
  } catch (error: any) {
    jwtPayload = undefined;
  }

  const context = new Context(
    _.get(jwtPayload, 'email'),
    _.get(jwtPayload, 'userId'),
    _.chain(jwtPayload).get('roles').split(/\s*,\s*/).map(v => v.trim()).filter(v => v.length > 0).value(),
    ipAddress
  );

  return context;
};
