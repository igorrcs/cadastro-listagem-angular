import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const novoCliente = {
        name: this.itemForm.value.name,
        age: this.itemForm.value.age
      };

      // Adiciona o cliente através do serviço
      this.clienteService.adicionarCliente(novoCliente);

      // Feedback visual
      this.snackBar.open('Cliente salvo com sucesso!', 'Fechar', {
        duration: 3000
      });

      // Redireciona para a lista
      this.router.navigate(['/list']);
    }
  }

  onCancel() {
    this.router.navigate(['/list']);
  }
}
