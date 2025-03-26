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

  // Lista de estados brasileiros
  estadosBrasileiros = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      estado: ['', Validators.required],
      genero: ['', Validators.required],
      aceitaTermos: [false, Validators.requiredTrue] // Novo campo checkbox
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const novoCliente = {
        name: this.itemForm.value.name,
        age: this.itemForm.value.age,
        estado: this.itemForm.value.estado,
        genero: this.itemForm.value.genero,
        aceitaTermos: this.itemForm.value.aceitaTermos // Incluindo no objeto do cliente
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
