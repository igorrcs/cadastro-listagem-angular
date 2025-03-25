import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesSubject = new BehaviorSubject<any[]>([]);
  clientes$ = this.clientesSubject.asObservable();
  private storageKey = 'clientesCadastrados'; // Chave para o localStorage

  constructor() {
    // 1. CARREGAR DADOS DO LOCALSTORAGE AO INICIAR
    this.carregarDadosIniciais();

    // 2. SALVAR AUTOMATICAMENTE QUANDO HOUVER MUDANÇAS
    this.configurarAutoSave();
  }

  private carregarDadosIniciais(): void {
    const clientesSalvos = localStorage.getItem(this.storageKey);
    if (clientesSalvos) {
      try {
        const clientes = JSON.parse(clientesSalvos);
        this.clientesSubject.next(clientes);
      } catch (e) {
        console.error('Erro ao ler clientes do localStorage', e);
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  private configurarAutoSave(): void {
    this.clientes$.subscribe(clientes => {
      localStorage.setItem(this.storageKey, JSON.stringify(clientes));
    });
  }

  adicionarCliente(cliente: any): void {
    const clientesAtuais = this.clientesSubject.value;
    this.clientesSubject.next([...clientesAtuais, cliente]);
  }

  obterClientes(): any[] {
    return this.clientesSubject.value;
  }

  // Método opcional para limpar o storage (para testes)
  limparDados(): void {
    localStorage.removeItem(this.storageKey);
    this.clientesSubject.next([]);
  }
}
