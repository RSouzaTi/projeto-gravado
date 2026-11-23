// card-contato.ts - COMPONENTE FILHO com INPUT e OUTPUT.
// Criado com: ng generate component shared/components/card-contato
//
//   PAI (lista-contatos)  --[contato]-->  FILHO (card)      INPUT: dado DESCE do pai para o filho
//   PAI (lista-contatos)  <--(favoritar)-- FILHO (card)     OUTPUT: evento SOBE do filho para o pai
//
// O card NÃO conhece o service: ele só mostra e AVISA. Quem decide o que fazer é o pai.
import { TitleCasePipe } from '@angular/common';
import { TelefonePipe } from '../../pipes/telefone-pipe';
import { Destaque } from '../../directives/destaque';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../material/material-module';
import { Contato } from '../../models/contato';

@Component({
  selector: 'app-card-contato',
  // TODO 11 (parte 1) - IMPORTS DO COMPONENTE STANDALONE
  // O HTML do card vai usar o pipe "titlecase", o NOSSO pipe "telefone" e a NOSSA diretiva appDestaque.
  // Importe e adicione aqui: TitleCasePipe ('@angular/common'), TelefonePipe ('../../pipes/telefone-pipe')
  // e Destaque ('../../directives/destaque').
  imports: [MaterialModule, RouterLink, TitleCasePipe, TelefonePipe, Destaque],
  templateUrl: './card-contato.html',
  styleUrl: './card-contato.scss',
})
export class CardContato {
readonly contato = input.required<Contato>();
readonly favoritar = output<number>();
readonly remover = output<number>();

readonly foto = computed(
  () => this.contato().foto || `https://i.pravatar.cc/300?u=${this.contato().email}`,
);
}