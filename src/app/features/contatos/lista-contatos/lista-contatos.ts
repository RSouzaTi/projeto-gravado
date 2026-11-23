// lista-contatos.ts - COMPONENTE PAI (smart): fala com o service e repassa dados para os cards.
// Criado com: ng generate component features/contatos/lista-contatos
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { ContatoService } from '../../../core/services/contato-service';
import { SharedModule } from '../../../shared/shared-module';

@Component({
  selector: 'app-lista-contatos',
  imports: [SharedModule],
  templateUrl: './lista-contatos.html',
  styleUrl: './lista-contatos.scss',
})
export class ListaContatos {
  private readonly contatoService = inject(ContatoService);
  private readonly snackBar = inject(MatSnackBar);
  readonly busca = new FormControl('', { nonNullable: true });
  private readonly termo$ = this.busca.valueChanges.pipe(
    debounceTime(300),
    startWith(''),
    map((texto) => texto.trim().toLowerCase()),
    distinctUntilChanged(),
  );

  readonly contatosFiltrados$ = combineLatest([this.contatoService.contatos$, this.termo$]).pipe(
    map(([lista, termo]) =>
      lista.filter(
        (contato: { nome: string; email: string }) =>
          contato.nome.toLowerCase().includes(termo) || contato.email.toLowerCase().includes(termo),
      ),
    ),
  );

  aoFavoritar(id: number): void {
    this.contatoService.alternarFavorito(id);
  }

  aoRemover(id: number): void {
    this.contatoService.remover(id);
    this.snackBar.open('Contato removido.', 'OK', { duration: 2500 });
  }
}
