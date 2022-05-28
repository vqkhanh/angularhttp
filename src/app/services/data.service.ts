import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

  
export class DataService {

  constructor(private httpClient: HttpClient) { }
  url: any;
  getAll(url: string){
    url = url;
    return this.httpClient.get(url)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError( (error: HttpErrorResponse) => {
        return throwError(() => {
          if(error.status === 404)
            return throwError(() => new BadInput(error) )
          return new AppError(error);
        });
      }) // then handle the error
    );
  }

  create(resource: any){
    return this.httpClient.post(this.url, JSON.stringify(resource))
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError( (error: HttpErrorResponse) => {
        return throwError(() => {
          if(error.status === 400)
            return throwError(() => new BadInput(error) )
          return new AppError(error);
        });
      }) // then handle the error
    );
  }

  update(resource: any){
    return this.httpClient.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}));
  }


  delete(id: any){
    return this.httpClient.delete(this.url + '/' + id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => {
      if(error.status === 404)
        return throwError(() => new NotFoundError() )
      return new AppError(error);
    });
  }

}
