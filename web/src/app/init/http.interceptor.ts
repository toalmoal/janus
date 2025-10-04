import { HttpEvent,
         HttpParams,
         HttpRequest,
         HttpHandlerFn }      from '@angular/common/http';

import { Observable }         from 'rxjs';

import * as _                 from 'lodash-es';

function appHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let params: HttpParams = new HttpParams();
    const body: any = (req.body instanceof FormData)? undefined: _.clone(req.body);

    params = modify(body, params, '_', new Date().getTime());

    const cloneReq = req.clone({
      body,
      params,
      headers: req.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
    });
    return next(cloneReq);
};

function modify(body: any, params: HttpParams, key: string, value: any) {
  if (value) {
    if (!_.isNil(body) && !(body instanceof FormData)) {
      body[key] = value;
    } else {
      params = params.set(key, String(value));
    }
  }
  return params;
};

export default appHttpInterceptor;
