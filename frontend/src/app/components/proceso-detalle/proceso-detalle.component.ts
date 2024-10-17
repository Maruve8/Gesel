import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proceso-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proceso-detalle.component.html',
  styleUrl: './proceso-detalle.component.css'
})
export class ProcesoDetalleComponent implements OnInit{
  proceso:any;

  constructor(
    private procesoService: ProcesoService,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.procesoService.getProceso(+id).subscribe((data)=>{
        this.proceso=data;
      });
    }
  }

//volver a procesos
  goBack():void{
    window.history.back();
  }

}
