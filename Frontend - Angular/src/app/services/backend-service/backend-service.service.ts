import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from '../local-storage-service/local-storage-service.service';
import { environment } from 'src/environments/environment';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {

  constructor(private http: HttpClient, private localstorage: LocalStorageServiceService) { }
  

  login(data: any){
    return this.http.post(`${environment.baseUrl}api/auth/login`,data).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    // return this.http.post(`http://localhost:8080/api/auth/login`,data)
  }

  getQuestions(data:any){
    return this.http.get(`${environment.baseUrl}api/quiz/questions/${data}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  submitQuizResponse(data:any){
    return this.http.post(`${environment.baseUrl}api/quiz/answers`, data ).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  getResultById(){
    const userId = this.localstorage.getUserId()
    return this.http.get(`${environment.baseUrl}api/results/user/${userId}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
