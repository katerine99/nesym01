import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = 'http://localhost/nesym01/src/app/php/compras/';

  constructor(private http: HttpClient) { }

  consultar(): Observable<any> {
    return this.http.get(`${this.url}consulta.php`);
  }

  consultar_productos(): Observable<any> {
    return this.http.get(`${this.url}consulta_producto.php`);
  }

  consultar_usuarios(): Observable<any> {
    return this.http.get(`${this.url}consulta_usuarios.php`);
  }

  consultar_proveedores(): Observable<any> {
    return this.http.get(`${this.url}consulta_proveedor.php`);
  }

  insertar(articulo: any): Observable<any> {
    return this.http.post(`${this.url}insertar.php`, JSON.stringify(articulo)).pipe(
      catchError(error => {
        console.error('Error al insertar artículo:', error);
        throw error;
      })
    );
  }

  eliminar(id: number): Observable<any> {
    return this.http.get(`${this.url}eliminar.php?id=${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar artículo:', error);
        throw error;
      })
    );
  }

  editar(datos: any, id: number) {
    return this.http.post(
      `${this.url}editar.php?id=${id}`,
      JSON.stringify(datos)
    );
  }
}









