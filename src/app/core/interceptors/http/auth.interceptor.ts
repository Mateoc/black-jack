import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../../services/uthorization/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        authorization: 'Basic dXNlcjpwYXNzd29yZA=='
      }
    });
    if (this.sessionService.isLogged()) {
      request = request.clone({
        setParams: {
          token: this.sessionService.getSessionToken()
        }
      });
    }
    return next.handle(request);
  }
}
