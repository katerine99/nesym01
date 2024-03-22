import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost/nesym01/src/app/php/login/';

  constructor(private http: HttpClient) {}

  consultar(user: any, clave: any) {
    return this.http.get(`${this.url}login.php?user=${user}&clave=${clave}`);
  }
}
