import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  // Only intercept requests that don't already have a full URL
  if (!request.url.startsWith('http')) {
    // Clone the request and prepend the base API URL
    const apiRequest = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next(apiRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle common errors here
        if (error.status === 401) {
          console.error('Unauthorized request');
          // You could redirect to login here
        } else if (error.status === 404) {
          console.error('API endpoint not found');
        } else if (error.status >= 500) {
          console.error('Server error occurred');
        }
        
        return throwError(() => error);
      })
    );
  }

  // Pass through requests that already have full URLs
  return next(request);
}; 