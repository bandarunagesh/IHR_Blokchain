import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        // const authToken = 'Bearer ' + this.auth.getToken();
        let authReq = req.clone({
            setHeaders: {
                "Content-Type": "application/json"
            }
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);


    }
}