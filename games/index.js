import { escalacao as escalacaoEniac, sets as setsEniac } from './2024-03-03-poli-eniac-teste';
import { escalacao as escalacaoMedUsp, sets as setsMedUsp } from './2024-04-28-poli-med-teste';

const jogos = [
  {
    escalacao: escalacaoEniac,
    nome: '[Teste][2023-03-03] Poli x Eniac (CPU)',
    sets: setsEniac,
    id: 0
  },
  {
    escalacao: escalacaoMedUsp,
    nome: '[Teste][2023-04-28] Poli x Med USP (NDU)',
    sets: setsMedUsp,
    id: 1
  }
];

export default jogos;
