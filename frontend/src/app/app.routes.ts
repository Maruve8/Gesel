import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RecruiterListComponent } from './components/recruiter-list/recruiter-list.component';
import { RecruiterFormComponent } from './components/recruiter-form/recruiter-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ProcesoListComponent } from './components/proceso-list/proceso-list.component';
import { ProcesoFormComponent } from './components/proceso-form/proceso-form.component';
import { CandidatoListComponent } from './components/candidato-list/candidato-list.component';
import { CandidatoFormComponent } from './components/candidato-form/candidato-form.component';
import { EntrevistaListComponent } from './components/entrevista-list/entrevista-list.component';
import { EntrevistaFormComponent } from './components/entrevista-form/entrevista-form.component';
import { RecruiterProcesoListComponent } from './components/recruiter-proceso-list/recruiter-proceso-list.component';
import { RecruiterCandidatoListComponent } from './components/recruiter-candidato-list/recruiter-candidato-list.component';
import { RecruiterEntrevistaListComponent } from './components/recruiter-entrevista-list/recruiter-entrevista-list.component';
import { RecruiterClienteListComponent } from './components/recruiter-cliente-list/recruiter-cliente-list.component';
import { ProcesoCandidatoListComponent } from './components/proceso-candidato-list/proceso-candidato-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CandidatoDetalleComponent } from './components/candidato-detalle/candidato-detalle.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'recruiters', component: RecruiterListComponent },  
    { path: 'recruiters/add', component: RecruiterFormComponent },  
    { path: 'recruiters/edit/:id', component: RecruiterFormComponent },
    {path: 'clientes', component: ClienteListComponent},
    { path: 'clientes/add', component: ClienteFormComponent},
    { path: 'clientes/edit/:id', component: ClienteFormComponent},
    { path: 'procesos', component: ProcesoListComponent},
    { path: 'procesos/add', component: ProcesoFormComponent},
    { path: 'procesos/edit/:id', component: ProcesoFormComponent},
    { path: 'candidatos', component: CandidatoListComponent},
    { path: 'candidatos/add', component: CandidatoFormComponent},
    { path: 'candidatos/edit/:id', component: CandidatoFormComponent},
    { path: 'entrevistas', component: EntrevistaListComponent},
    { path: 'entrevistas/add', component: EntrevistaFormComponent},
    { path: 'entrevistas/edit/:id', component: EntrevistaFormComponent},
    { path: 'recruiter-proceso', component: RecruiterProcesoListComponent },
    { path: 'recruiter-candidato', component: RecruiterCandidatoListComponent},
    { path: 'recruiter-entrevista', component: RecruiterEntrevistaListComponent},
    { path: 'recruiter-cliente', component: RecruiterClienteListComponent},
    { path: 'proceso-candidato', component: ProcesoCandidatoListComponent},
    { path: 'logout', component: LogoutComponent },
    { path: 'perfil', component: PerfilComponent }, 
    { path: 'calendario', component: CalendarioComponent},
    { path: 'candidatos/:id', component: CandidatoDetalleComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // ruta por defecto
    { path: '**', redirectTo: '/login', pathMatch: 'full' } //para rutas no existentes
];
