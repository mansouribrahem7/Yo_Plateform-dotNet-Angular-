import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('request', request);

    const modifiedRequest = request.clone({
      headers: request.headers
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('content-type', 'application/json'),
    });

    return next.handle(modifiedRequest);
  }
}
