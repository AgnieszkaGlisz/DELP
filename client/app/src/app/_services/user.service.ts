import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable, of } from 'rxjs';
import { WordsetService } from './wordset.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private wordsetService: WordsetService
  ) { }

  setToken(x: any): void{
    localStorage.setItem('token', JSON.stringify(x));
  }

  getUserData(): any{
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData)
    return userData;
}


  // TODO: change to get info about only one user
  // getUserInfo(id: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.url);
  // }
  
  getUserInfo(): Observable<User> {
      return this.http.get<User>(`${this.wordsetService.urlAga}/account`, httpOptions);
    }

  sendLoginInfo(username: string, password: string): Observable<any> {
    return this.http.post(`${this.wordsetService.urlAga}/login`, {username, password}, httpOptions);
  }

}
