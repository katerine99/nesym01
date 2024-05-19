import { Component, OnInit } from '@angular/core';
import { IntervencionDeUrgenciaService } from 'src/app/servicios/intervencion-de-urgencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intervencion-de-urgencia',
  templateUrl: './intervencion-de-urgencia.component.html',
  styleUrls: ['./intervencion-de-urgencia.component.scss'],
})
export class IntervencionDeUrgenciaComponent implements OnInit {
  verf = false;
  intervencion_de_urgencia: any;
  idintur: any;
  interurg = {
    area: ''
  };

  validarea = true;
  beditar = false;

  constructor(private sintervenciondeurgencia: IntervencionDeUrgenciaService) {}

  ngOnInit(): void {
    this.consulta();
    this.limpiar();
  }

  mostrar(dato: any) {
    switch (dato) {
      case 0:
        this.verf = false;
        this.beditar = false;
        this.idintur = '';
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  limpiar() {
    this.interurg.area = '';
  }

  validar() {
    this.validarea = this.interurg.area !== '';
  }

  consulta() {
    this.sintervenciondeurgencia.consultar().subscribe((result: any) => {
      this.intervencion_de_urgencia = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validarea) {
      this.sintervenciondeurgencia.insertar(this.interurg).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
      this.limpiar();
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar la intervencion ' + nombre + '?',
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarintervencion(id);
      }
    });
  }

  borrarintervencion(id: any) {
    this.sintervenciondeurgencia.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire('¡Eliminado!', 'la intervencion ha sido eliminado.', 'success');
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.interurg.area = datos.area;
    this.idintur = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();
    if (this.validarea) {
      this.sintervenciondeurgencia.editar(this.interurg, this.idintur).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          this.mostrar(0);
        }
      });
    }
  }

  eliminar() {
    if (confirm("¿Estás seguro de eliminar la intervencion?")) {
      this.sintervenciondeurgencia.eliminar(this.idintur).subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire('¡Eliminado!', 'la intervencion ha sido eliminada.', 'success');
          this.mostrar(0);
        }
      });
    }
  }
}
