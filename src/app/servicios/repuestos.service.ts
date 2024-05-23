import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepuestosService {
  url = 'http://localhost/nesym01/src/app/php/repuestos/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);
  }

  insertar(articulo: any) {
    return this.http.post(`${this.url}insertar.php`, articulo);
  }

  eliminar(id: number) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  editar(datos: any, id: number) {
    const payload = { ...datos, id }; // Agregamos el id al objeto de datos
    return this.http.post(`${this.url}editar.php`, payload);
  }
}