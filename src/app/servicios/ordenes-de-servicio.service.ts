import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenesDeServicioService {
  private apiUrl = 'http://localhost/nesym01/src/app/php/ordenes%20de%20servicio/';

  constructor(private http: HttpClient) {}

  editar(orden: any, id: any): Observable<any> {
    const payload = {
      ...orden,
      id: id,
    };
    return this.http.post(`${this.apiUrl}editar.php`, JSON.stringify(payload), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  consultar(): Observable<any> {
    return this.http.get(`${this.apiUrl}consulta.php`);
  }

  insertar(articulo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}insertar.php`, JSON.stringify(articulo), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  eliminar(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}eliminar.php?id=${id}`);
  }
}
