import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
//variables globales
verf = false;
cliente: any;
idclie: any;
client = {
  nombre: "",
  celular: "",
};

//para validar
validnombre = true;
validcelular = true;
beditar = false;
constructor (private scliente: ClienteService) {}

ngOnInit(): void {
  this.consulta();
  this.limpiar();

}
//mostrar formulario
mostrar(dato: any) {
  switch (dato) {
    case 0:
      this.verf = false;
      this.beditar = false;
      this.idclie = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.client.nombre = "";
  this.client.celular = "";
  
}
//validar
validar() {
  if (this.client.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }
if (this.client.celular == "") {
    this.validcelular = false;
  }else{
    this.validcelular = true;
}
 
  }



consulta() {
  this.scliente.consultar().subscribe((result: any) => {
    this.cliente = result;
   // console.log(this.usuario);
  })
}

ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validnombre == true && this.validcelular==true) {

    this.scliente.insertar(this.cliente).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        //alert(datos['mensaje']);
        this.consulta();
      }
    });
    this.mostrar(0);
    this.limpiar();
  }
}
pregunta(id: any, nombre: any) {
  console.log('entro con el id' + id);
  Swal.fire({
    title: '¿ Esta seguro de eliminar el cliente' + nombre + '?',
    text: 'El proceso no podra ser revertido!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.borrarcliente(id);
      Swal.fire({
        title: 'Eliminado!',
        text: 'El usuario ha sido eliminado.',
        icon: 'success',
      });
    }
  });
}

borrarcliente(id: any) {
  this.scliente.eliminar(id).subscribe((datos: any) => {
    if (datos['resultado'] == 'OK') {
      this.consulta();
    }
  });
}

cargardatos(datos: any, id: number) {
  //console.log(datos);
  this.client.nombre = datos.nombre;
  this.client.celular = datos.celular;
  this.idclie = id;
  this.mostrar(1);
  this.beditar = true;
}

editar() {
  this.validar();

  if (
    this.validnombre == true &&
    this.validcelular== true
    
  ) {
    this.scliente.edit(this.client).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok') {
        // alerta datos
        this.consulta();
      }
    });
    this.mostrar(0);
  }
}
eliminar() {
  if (confirm("¿Estás seguro de eliminar el cliente?")) {
    this.scliente.eliminar(this.idclie).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire('¡Eliminado!', 'el cliente ha sido eliminado.', 'success');
        this.mostrar(0);
      }
    });
  }
}

}





