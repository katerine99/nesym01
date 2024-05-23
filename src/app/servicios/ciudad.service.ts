import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private url = 'http://localhost/nesym01/src/app/php/ciudad/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  consultar_depto() {
    return this.http.get(`${this.url}consulta_depto.php`);
  }

  insertar(articulo: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(articulo), { headers });
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  editar(datos: any, id: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}editar.php`, JSON.stringify({ ...datos, id }), { headers });
  }
}