import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit{

  cliente: any = {
    nombre: '',
    descripcion: '',
    beneficios: '',
    telefono: '',
    email: '',
  };

  isEditMode = false;
  clienteId: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteId = params['id'];
      if (this.clienteId) {
        this.isEditMode = true;
        this.clienteService.getCliente(this.clienteId).subscribe(data => {
          this.cliente = data;
        });
      }
    });
  }

  saveCliente(): void {
    if (!this.cliente.nombre || !this.cliente.descripcion || !this.cliente.telefono || !this.cliente.email) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return;
    }
    if (this.isEditMode) {
      this.clienteService.updateCliente(this.clienteId!, this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    } else {
      this.clienteService.createCliente(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }

}
