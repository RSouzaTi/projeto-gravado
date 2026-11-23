// cep-service.ts - SERVICE que CONSOME UMA API externa (viaCEP).
// Criado com: ng generate service core/services/cep-service
import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../shared/models/endereco';
import { inject } from '@angular/core';

@Service()
export class CepService {
  private readonly http = inject(HttpClient);
  private readonly urlBase = 'https://viacep.com.br/ws';
  buscar(cep: string): Observable<Endereco> {
  const somenteNumeros = cep.replace(/\D/g, '');
    return this.http.get<Endereco>(`${this.urlBase}/${somenteNumeros}/json/`);  
  }

  // EXEMPLO (RapidAPI): APIs com chave mandam a chave no CABEÇALHO (headers) da requisição.
  // buscarClima(cidade: string) {
  //   return this.http.get('https://open-weather13.p.rapidapi.com/city', {
  //     params: { city: cidade, lang: 'PT' },
  //     headers: {
  //       'x-rapidapi-key': 'SUA_CHAVE_AQUI',
  //       'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
  //     },
  //   });
  // }
}
