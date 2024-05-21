import { Component } from '@angular/core';
import { RepuestosService} from 'src/app/servicios/repuestos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent {
  
//variables globales
verf = false
repuestos: any;
idrepu: any;
repuest= {
cantidad: 0,
  total: 0,
};

//para validar
validcantidad = true;
validtotal = true;
beditar= false;

constructor (private srepuestos: RepuestosService) {}

ngOnInit(): void {
  this.consulta();
  this.limpiar();

}
//mostrar formulario
mostrar(dato: any) {
  switch (dato) {
    case 0:
      this.verf = false;
      //this.beditar = false;
      this.idrepu = "";
      this.limpiar();
      break;
    case 1:
      this.verf = true;
      break;
  }

}
//limpiar
limpiar() {
  this.repuest.cantidad = 0;
  this.repuest.total = 0;
  
}
//validar
validar() {
  if (this.repuest.cantidad == 0) {
    this.validcantidad = false;
  }else{
    this.validcantidad = true;
  }
if (this.repuest.total== 0) {
    this.validtotal = false;
  }else{
    this.validtotal = true;
}
  


}


consulta() {
  this.srepuestos.consultar().subscribe((result: any) => {
    this.repuestos = result;
   // console.log(this.repuestos);
  })
}
ingresar() {
  //console.log(this.cat);
  this.validar();
  if (this.validcantidad == true && 
    this.validtotal==true) {

    this.srepuestos.insertar(this.repuest).subscribe((datos: any) => {
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
  Swal.fire({
    title: '¿Está seguro de eliminar el usuario ' + nombre + '?',
    text: 'El proceso no podrá ser revertido!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, Eliminar!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.borrarrepuestos(id);
    }
  });
}

borrarrepuestos(id: any) {
  this.srepuestos.eliminar(id).subscribe((datos: any) => {
    if (datos['resultado'] == 'OK') {
      this.consulta();
      Swal.fire('¡Eliminado!', 'El repuesto ha sido eliminado.', 'success');
    }
  });
}

cargardatos(datos: any, id: number) {
  this.repuest.cantidad = datos.cantidad;
  this.repuest.total= datos.total;
  this.idrepu = id;
  this.mostrar(1);
  this.beditar = true;
}

  editar() {
  this.validar();
  if (this.validcantidad== true &&
    this.validtotal== true
  ) {
    this.srepuestos.editar(this.repuest).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        this.mostrar(0);
      }
    });
  }
}

eliminar() {
  if (confirm("¿Estás seguro de eliminar el área?")) {
    this.srepuestos.eliminar(this.idrepu).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire('¡Eliminado!', 'El repuesto ha sido eliminado.', 'success');
        this.mostrar(0);
      }
    });
  }
}
}



