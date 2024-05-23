import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost/nesym01/src/app/php/cliente/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  insertar(cliente: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(cliente), { headers });
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  editar(datos: any, id: number) {
    return this.http.post(
      `${this.url}editar.php?id=${id}`,
      JSON.stringify(datos)
    );
  }
}
