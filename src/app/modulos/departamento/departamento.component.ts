import { Component } from '@angular/core';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent {
//variables globales
verf = false;
departamento: any;
iddep: any;
depto = {
  nombre: "",
};

//para validar
validnombre = true;
beditar= false;
constructor (private sdepartamento: DepartamentoService) {}

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
      this.iddep = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.depto.nombre = "";
  
}
//validar
validar() {
  if (this.depto.nombre == "") {
    this.validnombre = false;
  }else{
    this.validnombre = true;
  }


}


consulta() {
  this.sdepartamento.consultar().subscribe((result: any) => {
    this.departamento = result;
   // console.log(this.usuario);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validnombre == true) {

    this.sdepartamento.insertar(this.departamento).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        //alert(datos['mensaje']);
        this.consulta();
      }
    });
    this.mostrar(0);
    this.limpiar();
  }
}
}