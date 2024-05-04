import jogos from '../../games/index';
import { traduzirSequenciaDePontos } from '../translateCsv';
import {
  aproveitamentoGeralDeAtaque,
  aproveitamentoGeralDeBloqueio,
  aproveitamentoGeralDeDefesa,
  aproveitamentoGeralDePasse,
  resumo
} from '../statistics';

test('resumo deve indicar a quantidade de pontos e erros de cada equipe', () => {
  const jogoMedTeste = jogos.find(v => v.nome === '[Teste][2023-04-28] Poli x Med USP (NDU)');
  const sequenciaDePontosTraduzida = traduzirSequenciaDePontos(jogoMedTeste.sets[0]);
  expect(resumo(sequenciaDePontosTraduzida)).toEqual({
    A: {
      PA: 11,
      PB: 3,
      PS: 1,
      PO: 0,
      EA: 5,
      EB: 2,
      ES: 3,
      EO: 0,
      Pontuação: 23
    },
    B: {
      PA: 15,
      PB: 0,
      PS: 0,
      PO: 0,
      EA: 4,
      EB: 1,
      ES: 3,
      EO: 0,
      Pontuação: 25
    }
  });
});

test('aproveitamentoGeralDeAtaque deve indicar estatísticas gerais sobre o ataque de cada equipe', () => {
  const jogoMedTeste = jogos.find(v => v.nome === '[Teste][2023-04-28] Poli x Med USP (NDU)');
  const sequenciaDePontosTraduzida = traduzirSequenciaDePontos(jogoMedTeste.sets[0]);
  expect(aproveitamentoGeralDeAtaque(sequenciaDePontosTraduzida)).toEqual({
    A: {
      Erro: 4,
      Ponto: 11,
      'Seguiu o rally': 12
    },
    B: {
      Erro: 4,
      Ponto: 15,
      'Seguiu o rally': 12
    }
  });
});

test('aproveitamentoGeralDeBloqueio deve indicar estatísticas gerais sobre o bloqueio de cada equipe', () => {
  const jogoMedTeste = jogos.find(v => v.nome === '[Teste][2023-04-28] Poli x Med USP (NDU)');
  const sequenciaDePontosTraduzida = traduzirSequenciaDePontos(jogoMedTeste.sets[0]);
  expect(aproveitamentoGeralDeBloqueio(sequenciaDePontosTraduzida)).toEqual({
    A: {
      'Amorteceu para o próprio lado': 1,
      Erro: 2,
      'Não encostou na bola': 19,
      'Não especificado': 0,
      Ponto: 3,
      'Voltou para o outro lado': 1
    },
    B: {
      'Amorteceu para o próprio lado': 0,
      Erro: 1,
      'Não encostou na bola': 14,
      'Não especificado': 0,
      Ponto: 0,
      'Voltou para o outro lado': 4
    }
  });
});

test('aproveitamentoGeralDePasse deve indicar estatísticas gerais sobre a recepcao de cada equipe', () => {
  const jogoMedTeste = jogos.find(v => v.nome === '[Teste][2023-04-28] Poli x Med USP (NDU)');
  const sequenciaDePontosTraduzida = traduzirSequenciaDePontos(jogoMedTeste.sets[0]);
  expect(aproveitamentoGeralDePasse(sequenciaDePontosTraduzida)).toEqual({
    A: {
      A: 13,
      B: 3,
      C: 1,
      'De graça pro outro lado': 2,
      'Erro ou ace do adversário': 0
    },
    B: {
      A: 11,
      B: 6,
      C: 3,
      'De graça pro outro lado': 0,
      'Erro ou ace do adversário': 1
    }
  });
});

test('aproveitamentoGeralDeDefesa deve indicar estatísticas gerais sobre a defesa de cada equipe', () => {
  const jogoMedTeste = jogos.find(v => v.nome === '[Teste][2023-04-28] Poli x Med USP (NDU)');
  const sequenciaDePontosTraduzida = traduzirSequenciaDePontos(jogoMedTeste.sets[0]);
  expect(aproveitamentoGeralDeDefesa(sequenciaDePontosTraduzida)).toEqual({
    A: {
      A: 1,
      B: 2,
      C: 1,
      'De graça pro outro lado': 1,
      Erro: 0
    },
    B: {
      A: 1,
      B: 5,
      C: 3,
      'De graça pro outro lado': 0,
      Erro: 0
    }
  });
});
