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
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ViewChild } from '@angular/core';


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

interface ApiResponse {
  id: number;
  
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
  @ViewChild('fullCalendar') calendarComponent!: FullCalendarComponent;

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

  isEditing: boolean = false;



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
          id: entrevista.id,
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

  //asigno id entrevista
  const idEntrevista = entrevista.id;

  console.log('Entrevista: ', entrevista);
  console.log('ID de la entrevista: ', idEntrevista);

  //formato fehc ay horal del modal
  const fechaObj = new Date(entrevista.startStr);


  //modal con los detalles
  this.mostrarDetallesEntrevista({
    id: idEntrevista,//asignar el id de la entrevista
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

  console.log('ID de la entrevista en detalles:', this.detallesEntrevista.id);

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

    //comprobar la fecha: error fewcha no válida
    console.log('Fecha seleccionada antes de la conversión:', this.fechaSeleccionada);

    //sdeparo fecha y hora porque da error
    const [fechaSinHora, hora] = this.fechaSeleccionada.split(' ');


    const fechaFormateada=this.convertirFecha(fechaSinHora);


    if (!fechaFormateada.match(/^\d{4}-\d{2}-\d{2}$/)) {
      console.error('Fecha no válida');
      return;
    }

    if (!this.hora.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      console.error('Hora no válida');
      return;
    }
    
    //objeto de la entrevista
    const nuevaEntrevista={
      id: this.detallesEntrevista.id || null, //id de la entrevista si está editando
      fecha: fechaFormateada, //utilizo la fecha formateads
      hora: hora,//la hora ya separada de la fecha
      ubicacion: this.ubicacion,
      feedback: this.feedback,
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


    this.http.post('/api/entrevistas', payload).subscribe({
      next: (response) => {
        console.log('Entrevista creada', response);
  
        //cargar todas las entrevistas desde el backend
        this.cargarEntrevistas(this.recruiterId || '');
  
        
        this.limpiarFormulario();
  
        this.mostrarFormulario = false; 
      },
      error: (error) => {
        console.error('Error al crear la entrevista', error);
      }
    });
  }

//función convertir fecha para el backend en yyyy-mm-dd
convertirFecha(fecha:string):string{
  const partes=fecha.split('/');
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

//Método para limpiar el formulario después de crear 
limpiarFormulario() {
  this.hora = '';
  this.ubicacion = '';
  this.feedback = '';
  this.candidatoId = null;
  this.procesoId = null;
  this.tipoEntrevista = '';
}


editarEntrevista() {

  this.isEditing = true;
  //cargar los datos de la entrevista seleccionada
  this.fechaSeleccionada=this.detallesEntrevista.fecha;
  this.hora=this.detallesEntrevista.hora;
  this.ubicacion=this.detallesEntrevista.ubicacion;
  this.feedback=this.detallesEntrevista.feedback;
  this.tipoEntrevista=this.detallesEntrevista.tipo;

  const candidatoSeleccionado = this.candidatos.find(c => c.nombre === this.detallesEntrevista.candidato);
 
 

  if(candidatoSeleccionado){
    this.candidatoId=candidatoSeleccionado.id;

     //proceso según el candidato seleccionado
  this.actualizarProcesoSegunCandidato();

  //asignar proceso 
  setTimeout(()=>{
    const procesoSeleccionado=this.procesos.find(p=>p.titulo===this.detallesEntrevista.proceso);
    if(procesoSeleccionado){
      this.procesoId=procesoSeleccionado.id;
    }
  }, 500);
  }


 
  

  
  this.mostrarFormulario = true;

  
  this.cerrarModal();
}


//eliminar entrevista
eliminarEntrevista(){
  console.log('ID de la entrevista en detalles: ', this.detallesEntrevista.id);

  if(!this.detallesEntrevista.id){
    console.error('No se ha seleccionado entrevista para eliminar');
    return;
  }

  //confirmar antes de eliminar
  if(confirm("Deseas eliminar esta entrevista?")){
    this.http.delete(`/api/entrevistas/${this.detallesEntrevista.id}`).subscribe({
      next:()=>{
        console.log('Entrevista eliminada');


        //eliminarla del calendario
        const calendarApi=this.calendarComponent.getApi();
        const event=calendarApi.getEventById(this.detallesEntrevista.id);
        if(event){
          event.remove();
        }

        this.detallesEntrevista={};

        this.cerrarModal();
      },
      error:(error)=>{
        console.error('Error al eliminar la entrevista', error);
      }
    })
  }
}
  
  

}
