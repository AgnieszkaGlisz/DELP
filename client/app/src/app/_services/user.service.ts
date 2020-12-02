import { UserPreferences } from './../_interfaces/userPreferences';
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
  public colorset: string[];
 

  constructor(
    private http: HttpClient,
    private wordsetService: WordsetService
  ) { 
    this.colorset = new Array<string>();
    this.colorset.push('c1');
    this.colorset.push('c2');
    this.colorset.push('c3');
    this.colorset.push('c4');
    this.colorset.push('c5');

  }

  setToken(x: any): void{
    localStorage.setItem('token', JSON.stringify(x));
  }

  deleteToken(): void{
    localStorage.removeItem('token');
  }

  getUserData(): User {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData)
    return userData;
}


  // TODO: change to get info about only one user
  // getUserInfo(id: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.url);
  // }
  
  getUserInfo(): Observable<User> {
      return this.http.get<User>(`${this.wordsetService.url}/user/account`, httpOptions);
    }

  sendLoginInfo(username: string, password: string): Observable<any> {
    return this.http.post(`${this.wordsetService.url}/user/login`, {username, password}, httpOptions);
  }

  savePreferences(preferences: UserPreferences): Observable<any> {
    return this.http.post(`${this.wordsetService.url}/user/preferences`, preferences, httpOptions);
  }

}
