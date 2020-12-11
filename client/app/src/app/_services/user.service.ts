import { UserPreferences } from './../_interfaces/userPreferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable, of } from 'rxjs';
import { WordsetService } from './wordset.service';
import { Router } from '@angular/router';


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
  public lastPage: string


  constructor(
    private http: HttpClient,
    private router: Router,
    private wordsetService: WordsetService
  ) {
    //style classes for main colors in app 
    this.changeColorSet()
    this.lastPage = ""
  }

  changeColorSet() {
    if (!this.colorset)
      this.colorset = new Array<string>()
    let length = this.colorset.length
    for (var i = 0; i < length; i++)
      this.colorset.pop()
    let userColorset = 1
    if (this.getUserData() && this.getUserData().preferences && this.getUserData().preferences.idColorSets)
      userColorset = this.getUserData().preferences.idColorSets
    this.colorset.push('c1_' + userColorset);
    this.colorset.push('c2_' + userColorset);
    this.colorset.push('c3_' + userColorset);
    this.colorset.push('c4_' + userColorset);
    this.colorset.push('c5_' + userColorset);
  }

  setToken(x: any): void {
    localStorage.setItem('token', JSON.stringify(x));
  }

  getToken(): string {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token)
      return token.accessToken;
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getUserData(): User {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData)
      return userData;
  }


  deleteUserData(): void {
    localStorage.removeItem('userData');
  }

  // TODO: change to get info about only one user
  // getUserInfo(id: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.url);
  // }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.wordsetService.url}/user/account`, httpOptions);
  }

  sendLoginInfo(username: string, password: string): Observable<any> {
    console.log("sendLoginInfo")
    return this.http.post(`${this.wordsetService.url}/user/login`, { username, password }, httpOptions);
  }

  sendRegistrationInfo(user: User): Observable<any> {
    console.log(user);
    return this.http.post(`${this.wordsetService.url}/user/register`, { user }, httpOptions);
  }

  savePreferences(preferences: UserPreferences): Observable<any> {
    return this.http.post(`${this.wordsetService.url}/user/preferences`, preferences, httpOptions);
  }

  goBack() {
    if(this.lastPage=="user/favourite")
      this.router.navigateByUrl('user/favourite')
    else if(this.lastPage=="user/sets")
      this.router.navigateByUrl('user/sets')
    // else if(this.lastPage=="user/search")
    //   this.router.navigateByUrl('user/search')
    else
      this.router.navigateByUrl('user/favourite')
  }

}
