import { Component, AfterViewInit } from '@angular/core';
import { Chart, LinearScale, BarController, CategoryScale, Title, LineController, PointElement, LineElement, PieController, registerables } from 'chart.js';

//finalmente registro todos los elementos necesarios de chart
Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.createCharts();
  }

  createCharts() {
    const ctx1 = document.getElementById('candidatosContratados') as HTMLCanvasElement;
    const ctx2 = document.getElementById('entrevistas') as HTMLCanvasElement;
    const ctx3 = document.getElementById('candidatosTotal') as HTMLCanvasElement;
    const ctx4 = document.getElementById('procesosActivos') as HTMLCanvasElement;

    //datos y config para gráfico contrataciones
    const labelsContrataciones = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dataContrataciones = {
      labels: labelsContrataciones,
      datasets: [{
        label: 'Contrataciones',
        data: [12, 19, 3, 5, 2, 8, 20, 15, 23, 16, 9, 19],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    //config gráfico contrataciones
    const configContrataciones = {
      type: 'bar' as const,
      data: dataContrataciones,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    //crear gráfico contrataciones
    const candidatosContratadosChart = new Chart(ctx1, configContrataciones);

    //GRÁFICO ENTREVISTAS SEMANALES
    const labelsEntrevistas = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const dataEntrevistas = {
      labels: labelsEntrevistas,
      datasets: [{
        label: 'Entrevistas',
        data: [5, 10, 7, 12, 15, 8, 6], // Datos estáticos
        backgroundColor: 'rgba(255, 159, 64, 0.2)', 
        borderColor: 'rgba(255, 159, 64, 1)', 
        borderWidth: 2,
        fill: true 
      }]
    };

    //config gráfico entrevistas
    const configEntrevistas = {
      type: 'line' as const,
      data: dataEntrevistas,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    //creargráfico entrevistas
    const entrevistasChart = new Chart(ctx2, configEntrevistas);

    //GRÁFICO CANDIDATOS TOTALES EN BBDD
    const totalCandidatos = 150; // Dato estático
    const dataCandidatos = {
      labels: ['Total Candidatos'],
      datasets: [{
        label: 'Candidatos Totales',
        data: [totalCandidatos],
        backgroundColor: 'rgba(255, 206, 86, 0.2)', 
        borderColor: 'rgba(255, 206, 86, 1)', 
        borderWidth: 1
      }]
    };

    //config gráfico candidatos totales
    const configCandidatos = {
      type: 'doughnut' as const, // Doughnut o pie
      data: dataCandidatos,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Número Total de Candidatos'
          }
        }
      }
    };

    //crear gráfico candidatos totales
    const candidatosTotalChart = new Chart(ctx3, configCandidatos);

    //GRÁFICO PROCESOS ACTIVOS DURANTE LA SEMANA EN CURSO
    const labelsProcesos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const dataProcesos = {
      labels: labelsProcesos,
      datasets: [{
        label: 'Procesos Activos',
        data: [3, 5, 2, 4, 6, 3, 7], // Datos estáticos 
        backgroundColor: 'rgba(153, 102, 255, 0.2)', 
        borderColor: 'rgba(153, 102, 255, 1)', 
        borderWidth: 1
      }]
    };

    //config gráfico procesos activos
    const configProcesos = {
      type: 'bar' as const, 
      data: dataProcesos,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    //crear gráfico procesos activos
    const procesosActivosChart = new Chart(ctx4, configProcesos);
  }
}








