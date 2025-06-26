import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // Use environment variable for base URL
  const baseUrl = environment.apiUrl;
  let apiReq = req;

  // Prepend base URL if request is relative
  if (!req.url.startsWith('http')) {
    apiReq = req.clone({ url: baseUrl + req.url });
  }

  // Add Authorization header if token exists
  // if (token) {
  //   apiReq = apiReq.clone({
  //     setHeaders:
  //     {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }
  apiReq = apiReq.clone({
    setHeaders:
    {
      Authorization: `Bearer ${token}`,
      "x-api-key": "reqres-free-v1"
    }
  });
  return next(apiReq);
};
