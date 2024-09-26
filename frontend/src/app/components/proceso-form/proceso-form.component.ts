import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-proceso-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './proceso-form.component.html',
  styleUrl: './proceso-form.component.css'
})
export class ProcesoFormComponent implements OnInit{

  proceso: any = {
    titulo: '',
    departamento: '',
    descripcion: '',
    ubicacion: '',
    modalidad: '',
    detalleHibrido: '',
    salario: '',
    cliente: [], //dejarlo como array, debe obtener toda la info
    estado: ''
  };

  isEditMode = false;
  procesoId: number | null = null;

  //especifico los desplegables del formulario
  ciudades: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Murcia', 'Alicante', 'Sevilla', 'Málaga', 'Toledo', 'Zaragoza', 'Coruña', 'Bilbao'];
  modalidades: string[] = ['PRESENCIAL', 'REMOTO', 'HIBRIDO'];
  estados: string[] = ['ACTIVO', 'INACTIVO', 'FINALIZADO'];
  clientes: any[] = []; //se irán llenando con los clientes guardados en bbdd


  constructor(
    private procesoService: ProcesoService,
    private clienteService: ClienteService, //para poder obtener los clientes
    private route: ActivatedRoute,
    private router: Router
  ){}
  //obtener id proceso si en edición
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.procesoId=params['id'];
      if(this.procesoId){
        this.isEditMode=true;
        this.procesoService.getProceso(this.procesoId).subscribe(data=>{
          this.proceso=data;
        });
      }
    });


    //obtener lista de clientes
    this.clienteService.getClientes().subscribe((clientes: any[])=>{
      this.clientes=clientes;
    });
  }


  //mostrar y ocultar el detalle de híbrido en función de la modalidad escogida
  onModalidadChange(): void{
    if(this.proceso.modalidad !== 'HIBRIDO'){
      this.proceso.detalleHibrido = ''; //se limpiará detalle híbrido si no es híbrido
    }
  }

  saveProceso(): void{
    console.log("Proceso antes de guardar:", this.proceso);
    //ajusto proceso.cliente para que sea objeto completo
    if (typeof this.proceso.cliente === 'string') {
      const selectedCliente = this.clientes.find(c => c.nombre === this.proceso.cliente);
    if (selectedCliente) {
      this.proceso.cliente = selectedCliente;
    } else {
      alert('Por favor, seleccione un cliente válido.');
      return;
    }
  }

    if(this.isEditMode){
      this.procesoService.updateProceso(this.procesoId!, this.proceso).subscribe(()=>{
        this.router.navigate(['/procesos']);
      });
    }else {
      this.procesoService.createProceso(this.proceso).subscribe(()=>{
        this.router.navigate(['/procesos']);
      });
    }
  }
  }

