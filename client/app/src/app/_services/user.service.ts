import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable, of } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // Authorization: 'Bearer eyJhbGiJIUI6IkpXVCJ9.eyJpZCI6NCwibG9naW4iOiJ3a3VjaHRhIiwicGFzc3dvcmQiOiJ3a3VjaHRhIiwiaWF0IjoxNjA0NDAzNTc2fQ.RoEEOeYhMSuLvTbHHeUV2z0CCmDwB1mK0sYXp0gg04c'
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibG9naW4iOiJ3a3VjaHRhIiwicGFzc3dvcmQiOiJ3a3VjaHRhIiwiaWF0IjoxNjA0NDAzNTc2fQ.RoEEOeYhMSuLvTbHHeUV2z0CCmDwB1mK0sYXp0gg04c'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  url: string = `http://localhost:3000/users`;
  urlLogin: string = `http://25.68.211.177:3500/login`;
  urlAccount: string = `http://25.68.211.177:3500/account`;

  setToken(x: any): void{
    localStorage.setItem('token', JSON.stringify(x));
  }

  

  // TODO: change to get info about only one user
  // getUserInfo(id: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.url);
  // }
  getUserInfo(): Observable<User[]> {

      const auth = "Bearer ";// + this.getToken();

      /*const httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: auth
        })
      };*/      

      return this.http.get<User[]>(this.urlAccount, httpOptions);
    }

  sendLoginInfo(username: string, password: string): Observable<any> {
    // return this.http.get('http://25.68.211.177:3500/account', httpOptions);
    return this.http.post(this.urlLogin, {username, password}, httpOptions);
    // return this.http.post(this.urlLogin, {login, pass});
  }

}
