import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/servicios/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  // Variables globales
  verf = false;
  reportes: any[] = [];
  idrepor: any;
  report = {
    preventivo: "",
    correctivo: "",
    emergente: ""
  };

  // Para validar
  validpreventivo = true;
  validcorrectivo = true;
  validemergente = true;
  beditar = false;

  constructor(private sreporte: ReporteService) {}

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
        this.idrepor = "";
        this.limpiar();
        break;
      case 1:
        this.verf = true;
        break;
    }
  }

  // Limpiar formulario
  limpiar() {
    this.report = { preventivo: "", correctivo: "", emergente: "" };
    this.validpreventivo = true;
    this.validcorrectivo = true;
    this.validemergente = true;
  }

  // Validar formulario
  validar() {
    this.validpreventivo = this.report.preventivo.trim() !== "";
    this.validcorrectivo = this.report.correctivo.trim() !== "";
    this.validemergente = this.report.emergente.trim() !== "";
  }

  consulta() {
    this.sreporte.consultar().subscribe((result: any) => {
      this.reportes = result;
    });
  }

  ingresar() {
    this.validar();
    if (this.validpreventivo && this.validcorrectivo && this.validemergente) {
      this.sreporte.insertar(this.report).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }

  pregunta(id: any, nombre: any) {
    Swal.fire({
      title: `¿Está seguro de eliminar el reporte ${nombre}?`,
      text: 'El proceso no podrá ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarreporte(id);
        Swal.fire('Eliminado!', 'El reporte ha sido eliminado.', 'success');
      }
    });
  }

  borrarreporte(id: any) {
    this.sreporte.eliminar(id).subscribe((datos: any) => {
      if (datos['resultado'] === 'OK') {
        this.consulta();
      }
    });
  }

  cargardatos(datos: any, id: number) {
    this.report = { ...datos };
    this.idrepor = id;
    this.mostrar(1);
    this.beditar = true;
  }

  editar() {
    this.validar();
    if (this.validpreventivo && this.validcorrectivo && this.validemergente) {
      this.sreporte.edit(this.report).subscribe((datos: any) => {
        if (datos['resultado'] === 'OK') {
          this.consulta();
        }
      });
      this.mostrar(0);
    }
  }
}
