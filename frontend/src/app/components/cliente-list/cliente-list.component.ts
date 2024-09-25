import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit{
  clientes: any[] =[];

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe((data)=>{
      console.log('Clientes received:', data);  // Log para verificar los datos
      this.clientes =data;
    });
  }

  deleteCliente(id:number): void {
    this.clienteService.deleteCliente(id).subscribe(()=>{
      this.getClientes(); //para actualizar la lista
    })
  }

}
