import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'estado', 'genero']; // Adicionei estado e genero
  dataSource: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.dataSource = this.clienteService.obterClientes();
  }
}
