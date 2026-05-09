import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  
  cargando: boolean = false;
  
  cultivos = [
    { id_cultivo: 1, tipo_cultivo: 'Maíz', estado_fase: 'Crecimiento vegetativo' },
    { id_cultivo: 2, tipo_cultivo: 'Frijol', estado_fase: 'Floración' }
  ];

  resultadoPrediccion: any = null;
  alertaClimatica: any = null;

  constructor() {}

  ngOnInit(): void {}

  solicitarPrediccion(id_cultivo: number) {
    this.cargando = true; 
    this.resultadoPrediccion = null;
    this.alertaClimatica = null;

    setTimeout(() => {
      this.cargando = false; 
      
      this.resultadoPrediccion = {
        rendimiento_estimado_ton: 12.5,
        precio_proyectado_cop: '15,000,000',
        roi_calculado_porcentaje: 24.5
      };

      if (id_cultivo === 1) {
        this.alertaClimatica = {
          tipo_fenomeno: 'Helada Nocturna',
          nivel_riesgo: 'Alto'
        };
      }
    }, 2000);
  }
}