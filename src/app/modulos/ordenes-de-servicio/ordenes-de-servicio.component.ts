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
    this.validelectromecanica = this.ordens.electromecanica !== "";
    this.validmetalmecanica = this.ordens.metalmecanica !== "";
    this.validasistenciatecnica = this.ordens.asistenciatecnica !== "";
  }

  consulta() {
    this.sordenesdeservicio.consultar().subscribe((result: any) => {
      this.ordenesdeservicio = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validelectromecanica && this.validmetalmecanica && this.validasistenciatecnica) {
      this.sordenesdeservicio.insertar(this.ordens).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          Swal.fire('¡Éxito!', datos['mensaje'], 'success');
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  editar() {
    this.validar();
    if (this.validelectromecanica && this.validmetalmecanica && this.validasistenciatecnica) {
      this.sordenesdeservicio.edit(this.ordens).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          Swal.fire('¡Éxito!', datos['mensaje'], 'success');
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

  eliminar(item: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sordenesdeservicio.eliminar(item.id).subscribe((datos: any) => {
          if (datos['resultado'] === 'OK') {
            Swal.fire('¡Eliminado!', datos['mensaje'], 'success');
            this.consulta();
          }
        });
      }
    });
  }
}