import * as _               from 'lodash-es';

import { Server }           from 'model/server.model';
import { ServerResponse }   from 'model/server-response.model';

export function emptyFunction() {
};

export function isNonEmpty(v: any): boolean {
  return !_.isNil(v) && (typeof v != 'string' || v.length > 0);
};

export function isEmpty(v: any): boolean {
  return !isNonEmpty(v);
};

export function isTruthy(v: any): boolean {
  const lower = !_.isNil(v)? String(v).toLowerCase(): null;
  return lower == 'y' || lower == 'yes' || lower == 'true' || lower == '1';
};

export function asSingleValue(value: any): any {
  return Array.isArray(value)? value[0]: value;
};

export function getErrorInResponse(response: any): string {
  let r: string;
  if (typeof response === 'string' || response instanceof String) {
    r = String(response);
  }
  if (!_.isNil(response.error)) {
    response = response.error;
  }
  if (_.get(response, 'status') === 'failure') {
    if (typeof response.value === 'string' || response.value instanceof String) {
      r = response.value;
    } else {
      const first: any = asSingleValue(response.value);
      const tpe: string = _.keys(first)[0];
      if (!_.isNil(first[tpe].reason) && first[tpe].reason.length > 0) {
        r = first[tpe].reason;
      } else {
        r = first[tpe].message;
      }
    }
  } else {
    r = 'Unexpected error, please try again later';
  }
  return r;
};

export function addParameters(url: string, parameters: {[key: string]: any}): string {
  let _url = url;
  _.forEach(parameters, (value: any, key: string) => {
    _url = addParameter(_url, key, value);
  });
  return _url;
};

export function addParameter(url: string, key: string, value: any): string {
  const stringValue = encodeURIComponent(String(value));
  if (isNonEmpty(stringValue) && stringValue !== 'null' && stringValue !== 'undefined') {
    url = url.trim();
    if (!url.includes('?')) {
      url = url + '?';
    }
    if (url.endsWith('?')) {
      url = `${url}${key}=${stringValue}`;
    } else {
      url = `${url}&${key}=${stringValue}`;
    }
  }

  return url;
};

export function serverUrl(server: Server, uri: string = '', parameters: { [key: string]: any } = {}): string {
    let effectiveUri = uri == 'null'? '': uri;
    if (effectiveUri.startsWith('/')) {
      effectiveUri = effectiveUri.substring(1);
    }
    let url = `${server.protocol}://${server.host}/${effectiveUri}`;
    url = addParameters(url, parameters);
    return url;
};

export function typeOf(value: any): (string | undefined) {
  return _.head(_.keys(value));
};

export function getFirstInServerResponse<T>(response: ServerResponse): (T | undefined) {
  let r: (T | undefined) = undefined;
  if (response.status === 'success') {
    r = response.value[0] as T;
  }
  return r;
};

export function getCountInServerResponse<T>(response: ServerResponse): number {
  return _.get(getFirstInServerResponse<any>(response), 'Count');
};

export function find<T>(value: Array<any>, type: string): T {
  const x = _.find(value, (e: any) => typeOf(e) === type);
  if (!_.isNil(x)) { return x[type] as T; } else { return x as T; }
};

export function findInServerResponse<T>(response: ServerResponse, type: string): (T | undefined) {
  let r: (T | undefined) = undefined;
  if (response.status === 'success') {
    r = find<T>(response.value, type);
  }
  return r;
};

export function findAll<T>(value: Array<any>, type: string): Array<T> {
  const matching = _.filter(value, (e: any) => typeOf(e) === type);
  return _.map(matching, (m: any) => m[type] as T);
};

export function findAllInServerResponse<T>(response: ServerResponse, type: string): Array<T> {
  let r: Array<T>;
  if (response.status === 'success') {
    r = findAll(response.value, type);
  } else {
    r = [];
  }
  return r;
};
