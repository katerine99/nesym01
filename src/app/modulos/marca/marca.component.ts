import { Component } from '@angular/core';
import { MarcaService } from 'src/app/servicios/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent {
//variables globales
verf = false;
marca: any;
idmar: any;
marc = {
  nombre: "",
};

//para validar
validnombre = true;
beditar= false;
constructor (private smarca: MarcaService) {}

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
      this.idmar = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.marc.nombre = "";
  
}
//validar
validar() {
  if (this.marc.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }


}


consulta() {
  this.smarca.consultar().subscribe((result: any) => {
    this.marca = result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validnombre == true) {

    this.smarca.insertar(this.marc).subscribe((datos: any) => {
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
    title: '¿ Esta seguro de eliminar la marca ' + nombre + '?',
    text: 'El proceso no podra ser revertido!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.borrarmarca(id);
      Swal.fire({
        title: 'Eliminado!',
        text: 'la marca ha sido eliminada.',
        icon: 'success',
      });
    }
  });
}

borrarmarca(id: any) {
  this.smarca.eliminar(id).subscribe((datos: any) => {
    if (datos['resultado'] == 'OK') {
      this.consulta();
    }
  });
}

cargardatos(datos: any, id: number) {
  //console.log(datos);
  this.marc.nombre = datos.nombre;
  this.idmar = id;
  this.mostrar(1);
  this.beditar = true;
}

editar() {
  this.validar();

  if (
    this.validnombre == true 
    
  ) {
    this.smarca.editar(this.marc, this.idmar ).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok') {
        // alerta datos
        this.consulta();
      }
    });
    this.mostrar(0);
  }
}
}
