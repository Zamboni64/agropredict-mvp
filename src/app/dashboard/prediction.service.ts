import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Prediccion {
  id_cultivo: number;
  tipo_cultivo: string;
  rendimiento_estimado_ton: number;
  precio_proyectado_cop: string;
  roi_calculado_porcentaje: number;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  // Simulación de la Capa de Datos: Historial en memoria
  private historialPredicciones: Prediccion[] = [];

  generarPrediccion(id_cultivo: number, tipo_cultivo: string): Observable<Prediccion> {
    const nuevaPrediccion: Prediccion = {
      id_cultivo,
      tipo_cultivo,
      rendimiento_estimado_ton: +(12.5 + Math.random() * 2).toFixed(2), // Variación simulada
      precio_proyectado_cop: '15,000,000',
      roi_calculado_porcentaje: +(24.5 + Math.random() * 5).toFixed(2),
      fecha: new Date()
    };

    // Guardar en el historial y mantener solo las últimas 3
    this.historialPredicciones.unshift(nuevaPrediccion);
    if (this.historialPredicciones.length > 3) {
      this.historialPredicciones.pop();
    }

    return of(nuevaPrediccion).pipe(delay(2000));
  }

  getHistorial(): Prediccion[] {
    return this.historialPredicciones;
  }
}