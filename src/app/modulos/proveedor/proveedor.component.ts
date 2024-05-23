import { Component } from '@angular/core';
import { proveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http'; // Importación de HttpErrorResponse

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {
  // Variables globales
  verf = false;
  proveedor: any;
  idprove: any;
  prov = {
    nombre: "",
    direccion: "",
    celular: "",
    email: ""
  };

  // Para validar
  validnombre = true;
  validdireccion = true;
  validcelular = true;
  validemail = true;
  validcargo = true;
  beditar = false;

  constructor(private sproveedor: proveedorService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  // Mostrar formulario
  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idprove = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  // Limpiar
  limpiar() {
    this.prov.nombre = "";
    this.prov.direccion = "";
    this.prov.celular = "";
    this.prov.email = ""
  }

  // Validar
  validar() {
    this.validnombre = this.prov.nombre !== "";
    this.validdireccion = this.prov.direccion !== "";
    this.validcelular = this.prov.celular !== "";
    this.validemail = this.prov.email !== "";
  }

  consulta() {
    this.sproveedor.consultar().subscribe((result: any) => {
      this.proveedor = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validnombre && this.validdireccion && this.validcelular && this.validemail) {
      this.sproveedor.insertar(this.prov).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar el proveedor ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarproveedor(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  borrarproveedor(id: any) {
    this.sproveedor.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.prov.nombre = datos.nombre;
    this.prov.direccion = datos.direccion;
    this.prov.celular = datos.celular;
    this.prov.email = datos.email;
    this.idprove = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();

    if (
      this.validnombre == true &&
      this.validdireccion == true &&
      this.validcelular == true &&
      this.validemail == true
    ) {
      this.sproveedor.editar(this.prov, this.idprove).subscribe((datos: any) => {
        if (datos['resultado'] == 'ok') {
          // alerta datos
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}
