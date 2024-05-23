import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  verf = false;
  clientes: any[] = [];
  idclie: any;
  client= {
    nombre: "",
    celular: ""
  };
  validnombre = true;
  validcelular= true;
  beditar = false;

  constructor(private scliente: ClienteService) { }

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  consulta() {
    this.scliente.consultar().subscribe((result: any) => {
      this.clientes= result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validnombre && this.validcelular) {
      this.scliente.insertar(this.client).subscribe((datos: any) => {
        if (datos.resultado === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar el cliente ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarclientes(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'el cliente ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  borrarclientes(id: any) {
    this.scliente.eliminar(id).subscribe((datos: any) => {
      if (datos.resultado === 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.client.nombre = datos.nombre;
    this.client.celular = datos.celular;
    this.idclie = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();
    if (this.validnombre && this.validcelular) {
      console.log("Datos a editar:", this.client, this.idclie);
      this.scliente.editar(this.client, this.idclie).subscribe(
        (datos: any) => {
          console.log("Respuesta del servidor:", datos);
          if (datos.resultado === 'OK') {
            this.consulta();
            this.mostrar(0);
          }
        },
        (error) => {
          console.error('Error al editar:', error);
        }
      );
    }
  }

  validar() {
    this.validnombre = this.client.nombre !== "";
    this.validcelular = this.client.celular !== "";
  }

  limpiar() {
    this.client.nombre = "";
    this.client.celular = "";
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idclie = "";
        break;
      case 1:
        this.verf = true;
        break;
    }
  }
}