import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-candidato-detalle',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule, RouterModule],
  templateUrl: './candidato-detalle.component.html',
  styleUrl: './candidato-detalle.component.css'
})
export class CandidatoDetalleComponent implements OnInit{
  candidato:any;
  cvUrl:string='';


  constructor(
    private route: ActivatedRoute,
    private candidatoService: CandidatoService,
    private router: Router  ){}

    ngOnInit(): void {
      const id=this.route.snapshot.paramMap.get('id');
      if(id){
        this.candidatoService.getCandidato(+id).subscribe((data)=>{
          this.candidato=data;
          this.cvUrl=`/cv/${data.cvUrl}`;
        })
      }
    }

    //volver a lista candidatos
    goBack() {
      this.router.navigate(['/candidatos']);
    }
    

}
