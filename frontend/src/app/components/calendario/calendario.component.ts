import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; //opciones del calendario
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';//interacción
import timeGridPlugin from '@fullcalendar/timegrid'; //quiero vista semanal
import { DateClickArg } from '@fullcalendar/interaction'; //tipo correcto para info
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcesoCandidatoService } from '../../services/proceso-candidato.service';
import { ChangeDetectorRef } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es'; //español


//interfaces para Candidato y Proceso
interface Candidato {
  id: number;
  nombre: string;
  apellidos: string;
  descripcion?: string;
  estado?: string;
  cv?: string;
  proceso?: Proceso;
 
}

interface Proceso {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: string;
  
}

interface ProcesoCandidato {
  id: {
    candidatoId: number;
    procesoId: number;
  };
  proceso: Proceso; 
  candidato: Candidato; 
}

declare var bootstrap: any;





@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, FormsModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit{

  calendarOptions: CalendarOptions = {};

  fechaSeleccionada: string = '';
  mostrarFormulario: boolean = false;
  ubicacion: string = '';
  feedback: string='';
  recruiter: any = {};
  hora: string='';
  tipoEntrevista: string = ''; //valor del enum
  candidatoId: number | null = null; 
  procesoId: number | null = null; 

  recruiterId: string | null = null;


  //candidatos: any[] = []; //lista de candidatos
  //procesos: any[] = [];   //lista de procesos

  candidatos: Candidato[] = []; 
  procesos: Proceso[] = []; 

  

  //enum TipoEntrevista 
  tiposEntrevista = ['RECRUITER', 'CLIENTE', 'PROYECTO'];

  detallesEntrevista: any = {};//variable detalles entrevista


  constructor(private http: HttpClient, private procesoCandidatoService: ProcesoCandidatoService, private cdRef: ChangeDetectorRef) {

  }
  

  ngOnInit(): void {
    this.calendarOptions={
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek', //vista zsemanal
      weekends: false, //sólo weekdays
      editable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),//click entrevista en calendario
      locales: [esLocale], //agrega idiomas
      locale: 'es', //especifico español
    };

    //obtener el id directamente desde localstorage
    this.recruiterId = localStorage.getItem('id');
    console.log('Recruiter Id:', this.recruiterId);



    if (this.recruiterId) {
      this.cargarEntrevistas(this.recruiterId);
    } else {
      console.error('ID de recruiter no encontrado en el localStorage');
    }

    //cargar candidatos
    this.cargarCandidatos();

    //cargar procesos
    this.cargarProcesos();
  }





  //método cargar entevistas
  cargarEntrevistas(recruiterId: string): void {
    this.http.get(`/api/entrevistas/recruiters/${recruiterId}/entrevistas`).subscribe({
      next: (response: any) => {
        const entrevistas: any[] = response;  //importante response es array
        this.calendarOptions.events = entrevistas.map(entrevista => ({
          title: `Entrevista ${entrevista.candidato || 'Candidato no disponible'}`,
          start: `${entrevista.fecha}T${entrevista.hora}`, //combina fecha y hora
          end: `${entrevista.fecha}T${entrevista.hora}`,  
          extendedProps: {
            candidato: entrevista.candidato || 'Candidato no disponible',
            proceso: entrevista.proceso || 'Proceso no disponible',
            ubicacion: entrevista.ubicacion || 'Ubicación no disponible',
            feedback: entrevista.feedback || 'Sin feedback',
            tipo: entrevista.tipo || 'Sin tipo'
          }
        }));
        console.log('Entrevistas cargadas: ', this.calendarOptions.events);

        //refrescar el calendario sin actualizar la página
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar entrevistas', error);
      }
    });
  }


  //método carga candidatos en proceso
  cargarCandidatos(): void{
    this.http.get<Candidato[]>('/api/candidatos/con-proceso').subscribe({
      next: (response: Candidato[]) =>{
        //filtrar solo candidatos con proceso asignado
        this.candidatos = response;
        console.log('Candidatos cargados con proceso asignado:', this.candidatos);
      },
      error: (error) =>{
        console.error('Error al cargar candidatos', error);
      }
    });
  }

  //llamar a este método cuando se selcciona un candidato
  actualizarProcesoSegunCandidato(): void {
    console.log("Candidato seleccionado ID:", this.candidatoId); // Verificar que se recibe correctamente el id
    if (this.candidatoId) {
      this.http.get<ProcesoCandidato[]>(`/api/proceso-candidato/candidato/${this.candidatoId}`).subscribe({
        next: (response: ProcesoCandidato[]) => {
          const procesoCandidato = response[0]; // Tomar el primer proceso asociado al candidato
          if (procesoCandidato && procesoCandidato.proceso) {
            this.procesos = [procesoCandidato.proceso]; // Establecer el proceso asociado
            console.log("Proceso asignado al candidato:", this.procesos);
          } else {
            this.procesos = []; // Si no tiene proceso, vaciar la lista
            console.log("Sin proceso asignado");
          }
        },
        error: (error) => {
          console.error('Error al cargar el proceso del candidato', error);
        }
      });
    }
  }
  


  //método cargar procesos
  cargarProcesos(): void{
    this.http.get<Proceso[]>('/api/procesos').subscribe({
      next: (response: Proceso[]) => {
        this.procesos = response;
        console.log('Procesos cargados:', this.procesos);
      },
      error: (error) => {
        console.error('Error al cargar procesos', error);
      }
    });
  }


  //click en fecha
  handleDateClick(info: DateClickArg){
    const fechaSeleccionada = new Date(info.dateStr);//string en date
    const fechaFormateada = fechaSeleccionada.toLocaleDateString('es-ES');
    const horaFormateada = fechaSeleccionada.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    console.log('Fecha seleccionada: ', fechaSeleccionada);
    
    this.fechaSeleccionada = `${fechaFormateada} ${horaFormateada}`;
  this.hora = horaFormateada;
  this.mostrarFormulario = true;

    
    
  }

  
  //formatear la hora
  formatTime(date:Date):string{
  const hours=date.getHours().toString().padStart(2, '0');
  const minutes=date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


//abrir modal con detalle entrevista cuando click en calendario
handleEventClick(clickInfo:any){
  const entrevista=clickInfo.event;//datos entrevista

  console.log('Entrevista: ', entrevista);

  //formato fehc ay horal del modal
  const fechaObj = new Date(entrevista.startStr);
  //modal con los detalles
  this.mostrarDetallesEntrevista({
    fecha: fechaObj.toLocaleDateString('es-ES'),
    hora: fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),  
    candidato: entrevista.extendedProps?.candidato || 'Candidato no disponible',  
    ubicacion: entrevista.extendedProps?.ubicacion || 'Ubicación no disponible',  
    feedback: entrevista.extendedProps?.feedback || 'Sin feedback',
    tipo: entrevista.extendedProps?.tipo || 'Sin tipo'
  });
}


//método detalles entrevista
mostrarDetallesEntrevista(entrevista:any){
  this.detallesEntrevista = entrevista;

  //modal
  const modalElement = document.getElementById('modalDetallesEntrevista');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);  
    modal.show();
  }
}


//cerra modal con detalles entrevista
cerrarModal(){
  const modalElement=document.getElementById('modalDetallesEntrevista');
  if (modalElement){
    const modal = bootstrap.Modal.getInstance(modalElement); 
    if (modal) {
      modal.hide();
    }
  }
}





  //crear enrevista
  crearEntrevista(){
    if (!this.recruiterId || !this.candidatoId || !this.procesoId || !this.tipoEntrevista) {
      console.error('Faltan datos para añadir entrevista.');
      return;
    }
    
    //objeto de la entrevista
    const nuevaEntrevista={
      fecha: this.fechaSeleccionada.split('T')[0],
      hora: this.hora,
      ubicacion: this.ubicacion,
      feedback: this.feedback,
      //recruiterId: this.recruiterId, //recruiter que crea la entrevista
      candidatoId: this.candidatoId,  
      procesoId: this.procesoId,      
      tipo: this.tipoEntrevista
      
      

    };
    console.log('Hora seleccionada: ', this.hora);
    console.log("Payload enviado:", nuevaEntrevista);

    //payload que con el recruiterId y la entrevista
    const payload = {
    recruiterId: this.recruiterId, 
    entrevista: nuevaEntrevista
  };

    console.log('Datos enviados:', payload);


    //aquí se envía el payload al backend 
    this.http.post('/api/entrevistas', payload).subscribe({
      next: (response) => {
        

        console.log('Entrevista creada', response);

       
        


        //refrescar todas las entrevistas desde el backend
        this.cargarEntrevistas(this.recruiterId || '');

      //limpiar el form
      this.hora = '';
      this.ubicacion = '';
      this.feedback = '';
      this.candidatoId = null;
      this.procesoId = null;
      this.tipoEntrevista = '';

      this.mostrarFormulario = false; //fuera form una vez creada entrevista
    },
    error: (error) => {
      console.error('Error al crear la entrevista', error);
    }
  });
}
  
  

}
