import { Component, AfterViewInit } from '@angular/core';
import { Chart, LinearScale, BarController, CategoryScale, Title, LineController, PointElement, LineElement, PieController, registerables } from 'chart.js';
import { GraficosService } from '../../services/graficos.service';

//finalmente registro todos los elementos necesarios de chart
Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements AfterViewInit {

  constructor(private graficosService: GraficosService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createCharts();
  }

  createCharts() {
    const ctx1 = document.getElementById('candidatosContratados') as HTMLCanvasElement;
    const ctx2 = document.getElementById('entrevistas') as HTMLCanvasElement;
    const ctx3 = document.getElementById('candidatosTotal') as HTMLCanvasElement;
    const ctx4 = document.getElementById('procesosActivos') as HTMLCanvasElement;

   


    //crear gráfico contrataciones
    this.graficosService.getContratacionesPorMes().subscribe(data => {
      const labelsContrataciones = Object.keys(data);
      const dataContrataciones = Object.values(data);

      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: labelsContrataciones,
          datasets: [{
            label: 'Contrataciones',
            data: dataContrataciones,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    //GRÁFICO ENTREVISTAS SEMANALES
    this.graficosService.getEntrevistasPorSemana().subscribe(data => {
      const labelsEntrevistas = Object.keys(data);
      const dataEntrevistas = Object.values(data);

      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: labelsEntrevistas,
          datasets: [{
            label: 'Entrevistas',
            data: dataEntrevistas,
            backgroundColor: 'rgba(255, 159, 64, 0.2)', 
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2,
            fill: true
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    //crear gráfico candidatos totales
    this.graficosService.getTotalCandidatos().subscribe(data => {
      new Chart(ctx3, {
        type: 'doughnut',
        data: {
          labels: ['Total Candidatos'],
          datasets: [{
            label: 'Total Candidatos',
            data: [data],
            backgroundColor: 'rgba(255, 206, 86, 0.2)', 
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Número Total de Candidatos'
            }
          }
        }
      });
    });

    //GRÁFICO PROCESOS ACTIVOS DURANTE LA SEMANA EN CURSO
    this.graficosService.getProcesosActivosPorSemana().subscribe(data => {
      const labelsProcesos = Object.keys(data);
      const dataProcesos = Object.values(data);

      new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: labelsProcesos,
          datasets: [{
            label: 'Procesos Activos',
            data: dataProcesos,
            backgroundColor: 'rgba(153, 102, 255, 0.2)', 
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}