import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url = 'http://localhost/nesym01/src/app/php/compras/';
  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consulta.php`);

  }
  consultar_productos() {
    return this.http.get(`${this.url}consulta_producto.php`);
}

    consultar_usuarios() {
    return this.http.get(`${this.url}consulta_usuarios.php`);
}

  consultar_proveedores() {
        return this.http.get(`${this.url}consulta_proveedor.php`);
      }

  insertar(articulo: any) {

    return this.http.post(`${this.url}insertar.php`, JSON.stringify(articulo));

  }
  eliminar(id: number) {

    return this.http.get(`${this.url}eliminar.php?id=${id}`);

  }

  editar(datos: any) {

    return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }
}
