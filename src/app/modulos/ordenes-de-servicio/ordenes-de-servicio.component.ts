import { Component } from '@angular/core';
import { OrdenesDeServicioService } from 'src/app/servicios/ordenes-de-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes-de-servicio',
  templateUrl: './ordenes-de-servicio.component.html',
  styleUrls: ['./ordenes-de-servicio.component.scss']
})
export class OrdenesDeServicioComponent {
  //variables globales
  verf = false;
  ordenesdeservicio: any;
  idord: any;
  ordens = {
    electromecanica: "",
    metalmecanica: "",
    asistenciatecnica: "",
  };

  //para validar
  validelectromecanica = true;
  validmetalmecanica = true;
  validasistenciatecnica = true;
  beditar = false;

  constructor(private sordenesdeservicio: OrdenesDeServicioService) { }

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
        this.idord = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  //limpiar
  limpiar() {
    this.ordens.electromecanica = "";
    this.ordens.metalmecanica = "";
    this.ordens.asistenciatecnica = "";
  }

  //validar
  validar() {
    if (this.ordens.electromecanica == "") {
      this.validelectromecanica = false;
    } else {
      this.validelectromecanica = true;
    }
    if (this.ordenesdeservicio.metalmecanica == "") {
      this.validmetalmecanica= false;
    } else {
      this.validmetalmecanica= true;
    }

    if (this.ordens.asistenciatecnica== "") {
      this.validasistenciatecnica = false;
    } else {
      this.validasistenciatecnica = true;
    }
  }

  consulta() {
    this.sordenesdeservicio.consultar().subscribe((result: any) => {
      this.ordenesdeservicio = result;
    });
  }

  ingresar() {
    this.validar();

    if (this.validelectromecanica==true  && 
      this.validmetalmecanica==true && 
      this.validasistenciatecnica==true) {
        
      this.sordenesdeservicio.insertar(this.ordens).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          
          this.consulta();
        }
      });
      this.mostrar(0)
      this.limpiar();
    }
  }
  pregunta(id: any, nombre: any) {
    console.log('entro con el id' + id);
    Swal.fire({
      title: '¿ Esta seguro de eliminar la orden ' + nombre + '?',
      text: 'El proceso no podra ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarorden(id);
        Swal.fire({
          title: 'Eliminado!',
          text: 'la orden ha sido eliminada.',
          icon: 'success',
        });
      }
    });
  }

  borrarorden(id: any) {
    this.sordenesdeservicio.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
      }
    });
  }

  editar() {
    this.validar();

    if (this.validelectromecanica ==true && 
      this.validmetalmecanica ==true && 
      this.validasistenciatecnica ==true ) {

      this.sordenesdeservicio.editar(this.ordens, this.idord).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
cargardatos(datos: any, id: number) {
    //console.log(datos);
    this.ordens.electromecanica = datos.electromecanica;
    this.ordens.metalmecanica = datos.metalmecanica;
    this.ordens.asistenciatecnica = datos.asistenciatecnica;
    
    this.idord = id;
    this.mostrar(1);
    this.beditar = true;
  }
  eliminar() {
    if (confirm("¿Estás seguro de eliminar la orden?")) {
      this.sordenesdeservicio.eliminar(this.idord).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire('¡Eliminado!', 'la orden ha sido eliminada.', 'success');
          this.mostrar(0);
        }
      });
    }
  }
  }
