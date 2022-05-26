import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PostService {

  private url = 'https://abcjsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  getPost(){
    //return this.httpClient.get(this.url);
    return this.httpClient.get(this.url)
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

  // createPost(post: any){
  //   return this.httpClient.post(this.url, JSON.stringify(post));
  // }

  createPost(post: any){
    return this.httpClient.post(this.url, JSON.stringify(post))
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

  updatePost(post: any){
    return this.httpClient.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }

  // deletePost(id: any){
  //   return this.httpClient.delete(this.url + '/' + id)
  //     .catch(err => {

  //     })
  // }

  deletePost(id: any){
    return this.httpClient.delete(this.url + '/' + id)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    // if (error.status === 0) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `, error.error);
    // }
    // // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));

    return throwError(() => {
      console.log("567")
      if(error.status === 404)
        return throwError(() => new NotFoundError() )
      return new AppError(error);
    });
     
    

  }

  
  

}
