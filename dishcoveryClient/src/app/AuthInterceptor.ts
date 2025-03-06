// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Your interceptor logic here
  const jwtToken = localStorage.getItem('jwtToken');
  console.log('Interceptor running for URL:', req.url);
  console.log('Token exists:', !!jwtToken);
  
  if (jwtToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};