import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  historialPredicciones: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  solicitarPrediccion(cultivo: any) {
    this.cargando = true; 
    this.resultadoPrediccion = null;
    this.alertaClimatica = null;

    // Si pasaron el objeto completo desde el HTML, extraemos el id
    const id = typeof cultivo === 'number' ? cultivo : cultivo.id_cultivo;

    setTimeout(() => {
      this.cargando = false; 
      
      let rendimiento = 0;
      let precioPorTon = 0;
      let costoBase = 0;
      let alertasPosibles: any[] = [];

      // Lógica realista según el tipo de cultivo
      if (id === 1) { // Maíz
        rendimiento = 7.0 + Math.random() * 3.5; // Entre 7.0 y 10.5 Ton/ha
        precioPorTon = 1200000; // $1.2M COP promedio por Ton
        costoBase = 6500000; // Costo por hectárea
        alertasPosibles = [
          { tipo_fenomeno: 'Déficit Hídrico', nivel_riesgo: 'Alto' },
          { tipo_fenomeno: 'Helada Nocturna', nivel_riesgo: 'Moderado' }
        ];
      } else { // Frijol
        rendimiento = 1.5 + Math.random() * 1.2; // Entre 1.5 y 2.7 Ton/ha
        precioPorTon = 4500000; // $4.5M COP promedio por Ton
        costoBase = 5000000; // Costo por hectárea
        alertasPosibles = [
          { tipo_fenomeno: 'Exceso de Lluvias', nivel_riesgo: 'Alto' },
          { tipo_fenomeno: 'Proliferación de Hongos', nivel_riesgo: 'Moderado' }
        ];
      }

      // Simulación de fluctuación de mercado en el precio (+/- 10%)
      const variacionPrecio = 1 + (Math.random() * 0.2 - 0.1);
      const ingresosEstimados = rendimiento * (precioPorTon * variacionPrecio);
      
      // Fórmula básica del ROI: ((Ingresos - Costos) / Costos) * 100
      const roi = ((ingresosEstimados - costoBase) / costoBase) * 100;

      this.resultadoPrediccion = {
        rendimiento_estimado_ton: rendimiento.toFixed(2),
        precio_proyectado_cop: Math.round(ingresosEstimados).toLocaleString('es-CO'),
        roi_calculado_porcentaje: roi.toFixed(2)
      };

      // 60% de probabilidad de arrojar una alerta climática específica de su cultivo
      if (Math.random() > 0.4) {
        this.alertaClimatica = alertasPosibles[Math.floor(Math.random() * alertasPosibles.length)];
      }
      
      // Guardamos la predicción exitosa en la Capa de Datos (historial)
      const nombreCultivo = id === 1 ? 'Maíz' : (id === 2 ? 'Frijol' : 'Desconocido');
      this.historialPredicciones.unshift({
        tipo_cultivo: nombreCultivo,
        rendimiento_estimado_ton: this.resultadoPrediccion.rendimiento_estimado_ton,
        roi_calculado_porcentaje: this.resultadoPrediccion.roi_calculado_porcentaje,
        fecha: new Date()
      });
      // Mantenemos solo las últimas 3 predicciones en la tabla
      if (this.historialPredicciones.length > 3) {
        this.historialPredicciones.pop();
      }
      
      // Le avisamos a Angular que actualice la vista con los nuevos datos
      this.cdr.detectChanges();
    }, 2000);
  }
}