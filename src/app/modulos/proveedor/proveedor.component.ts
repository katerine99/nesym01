import { Component } from '@angular/core';
import { proveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {
//variables globales
verf = false;
proveedor: any;
idprove: any;
prov = {
  nombre: "",
  direccion: "",
  celular: "",
  email: ""
};

//para validar
validnombre = true;
validdireccion = true;
validcelular= true;
validemail= true;
validcargo = true;
beditar = false;
constructor (private sproveedor: proveedorService) {}

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
      this.idprove = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.prov.nombre = "";
  this.prov.direccion = "";
  this.prov.celular = "";
  this.prov.email = ""
}
//validar
validar() {
  if (this.prov.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }
if (this.prov.direccion == "") {
    this.validdireccion= false;
  }else{
    this.validdireccion = true;
}
  if (this.prov.celular == "") {
    this.validcelular = false;
  }else{
    this.validcelular= true;
  }
  if (this.prov.email == "") {
    this.validemail = false;
  }else{
    this.validemail = true;
  }


}


consulta() {
  this.sproveedor.consultar().subscribe((result: any) => {
    this.proveedor = result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validnombre == true && this.validdireccion == true && this.validcelular == true && this.validemail == true) {

    this.sproveedor.insertar(this.proveedor).subscribe((datos: any) => {
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
    title: '¿ Esta seguro de eliminar el proveedor ' + nombre + '?',
    text: 'El proceso no podra ser revertido!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!',
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
    if (datos['resultado'] == 'OK') {
      this.consulta();
    }
  });
}

cargardatos(datos: any, id: number) {
  //console.log(datos);
  this.prov.nombre = datos.nombre;
  this.prov.direccion = datos.direccion;
  this.prov.celular= datos.celular;
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
    this.sproveedor.edit(this.prov).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok') {
        // alerta datos
        this.consulta();
      }
    });
    this.mostrar(0);
  }
}
}
