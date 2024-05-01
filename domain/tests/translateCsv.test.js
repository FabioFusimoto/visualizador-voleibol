import jogos from '../../games/index';
import { escalacoesIniciais, relacaoDeJogadores, traduzirSequenciaDePontos } from '../translateCsv';

test('relacaoDeJogadores deve criar um objeto que relaciona nomes e número da camisa', () => {
  const jogoEniacCPU = jogos.find(v => v.nome === '[Teste][2023-03-03] Poli x Eniac (CPU)');
  expect(relacaoDeJogadores(jogoEniacCPU.escalacao)).toEqual(
    {
      timeA: [
        {
          numero: '2',
          nome: 'Vini'
        },
        {
          numero: '3',
          nome: 'Cavalo'
        },
        {
          numero: '4',
          nome: 'Moana'
        },
        {
          numero: '5',
          nome: 'Tetê'
        },
        {
          numero: '10',
          nome: 'Fratti'
        },
        {
          numero: '19',
          nome: 'Balulinha'
        },
        {
          numero: '20',
          nome: 'Kike'
        }
      ],
      timeB: [
        {
          numero: '11',
          nome: 'Cen. 3'
        },
        {
          numero: '13',
          nome: 'Op.'
        },
        {
          numero: '1',
          nome: 'Lev.'
        },
        {
          numero: '10',
          nome: 'Líb.'
        },
        {
          numero: '17',
          nome: 'Pon. 3'
        },
        {
          numero: '15',
          nome: 'Cen. 2'
        },
        {
          numero: '8',
          nome: 'Pon. 2'
        }
      ]
    }
  );
});

test('escalacoesIniciais deve relacionar o número das camisas, rotação e posição de cada jogador', () => {
  const jogoEniacCPU = jogos.find(v => v.nome === '[Teste][2023-03-03] Poli x Eniac (CPU)');
  expect(escalacoesIniciais(jogoEniacCPU.sets)).toEqual(
    [
      {
        timeA: [
          {
            numero: '19',
            posicao: 'Ponteiro'
          },
          {
            numero: '3',
            posicao: 'Central'
          },
          {
            numero: '20',
            posicao: 'Levantador'
          },
          {
            numero: '5',
            posicao: 'Ponteiro'
          },
          {
            numero: '10',
            posicao: 'Central'
          },
          {
            numero: '2',
            posicao: 'Oposto'
          },
          {
            numero: '4',
            posicao: 'Libero'
          }
        ],
        timeB: [
          {
            numero: '1',
            posicao: 'Levantador'
          },
          {
            numero: '8',
            posicao: 'Ponteiro'
          },
          {
            numero: '11',
            posicao: 'Central'
          },
          {
            numero: '13',
            posicao: 'Oposto'
          },
          {
            numero: '17',
            posicao: 'Ponteiro'
          },
          {
            numero: '15',
            posicao: 'Central'
          },
          {
            numero: '10',
            posicao: 'Libero'
          }
        ]
      }
    ]
  );
});

test('traduzirSequenciaDePontos deve retornar uma descrição do andamento dos pontos', () => {
  const jogoEniacCPU = jogos.find(v => v.nome === '[Teste][2023-03-03] Poli x Eniac (CPU)');
  expect(traduzirSequenciaDePontos(jogoEniacCPU.sets[0])).toEqual([
    [
      {
        time: 'A',
        numero: '19',
        acao: 'Saque',
        variacao: 'Meio da quadra',
        direcao: '2',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '8',
        acao: 'Passe',
        variacao: 'A',
        direcao: '_',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '8',
        acao: 'Ataque',
        variacao: 'Extremidade - Pancada',
        direcao: '6',
        resultado: 'Ponto'
      }
    ],
    [
      {
        time: 'B',
        numero: '8',
        acao: 'Saque',
        variacao: 'Meio da quadra',
        direcao: '4',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'A',
        numero: '5',
        acao: 'Passe',
        variacao: 'A',
        direcao: '_',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'A',
        numero: '5',
        acao: 'Ataque',
        variacao: 'Extremidade - Pancada',
        direcao: '5',
        resultado: 'Ponto'
      }
    ],
    [
      {
        time: 'A',
        numero: '3',
        acao: 'Saque',
        variacao: 'Longo',
        direcao: '5',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '17',
        acao: 'Passe',
        variacao: 'A',
        direcao: '_',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '13',
        acao: 'Ataque',
        variacao: 'Extremidade - Pancada',
        direcao: '1',
        resultado: 'Ponto'
      }
    ],
    [
      {
        time: 'B',
        numero: '11',
        acao: 'Saque',
        variacao: 'Meio da quadra',
        direcao: '2',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'A',
        numero: '4',
        acao: 'Passe',
        variacao: 'A',
        direcao: '_',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'A',
        numero: '5',
        acao: 'Ataque',
        variacao: 'Extremidade - Explorando o bloqueio',
        direcao: '_',
        resultado: 'Ponto'
      }
    ],
    [
      {
        time: 'A',
        numero: '20',
        acao: 'Saque',
        variacao: 'Longo',
        direcao: '1',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '10',
        acao: 'Passe',
        variacao: 'A',
        direcao: '_',
        resultado: 'Seguiu o rally'
      },
      {
        time: 'B',
        numero: '17',
        acao: 'Ataque',
        variacao: 'Extremidade - Pancada',
        direcao: '6',
        resultado: 'Ponto'
      }
    ],
    [
      {
        time: 'A',
        acao: 'Substituição',
        quemSai: '20',
        quemEntra: '66',
        posicaoDeQuemEntra: 'Oposto'
      }
    ],
    [
      {
        time: 'A',
        acao: 'Substituição',
        quemSai: '2',
        quemEntra: '17',
        posicaoDeQuemEntra: 'Levantador'
      }
    ]
  ]);
});

test('traduzirSequenciaDePontos deve gerar uma exception se uma das ações não puder ser traduzida', () => {
  const sequencia1 = [
    ' ',
    ' ',
    'C 19 S M 2,B 8 P A _,B 8 A P 6 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia1); }).toThrow('C não é um código de time válido | Ação [C 19 S M 2] | Linha [C 19 S M 2,B 8 P A _,B 8 A P 6 P]');

  const sequencia2 = [
    ' ',
    ' ',
    'A num#19 S M 2,B 8 P A _,B 8 A P 6 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia2); }).toThrow('num#19 deve ser um número ou _ | Ação [A num#19 S M 2] | Linha [A num#19 S M 2,B 8 P A _,B 8 A P 6 P]');

  const sequencia3 = [
    ' ',
    ' ',
    'A 19 S M 2,B 8 ATK A _,B 8 A P 6 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia3); }).toThrow('ATK não é um código de ação válido | Ação [B 8 ATK A _] | Linha [A 19 S M 2,B 8 ATK A _,B 8 A P 6 P]');

  const sequencia4 = [
    ' ',
    ' ',
    'B 8 S M 4,A 5 P Q _,A 5 A P 5 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia4); }).toThrow('Q não é um código de variação válido para a ação de Passe | Ação [A 5 P Q _] | Linha [B 8 S M 4,A 5 P Q _,A 5 A P 5 P]');

  const sequencia5 = [
    ' ',
    ' ',
    'B 8 S M 7,A 5 P Q _,A 5 A P 5 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia5); }).toThrow('A direção deve ser uma posição da quadra ou _ | Ação [B 8 S M 7] | Linha [B 8 S M 7,A 5 P Q _,A 5 A P 5 P]');
});

test('traduzirSequenciaDePontos deve gerar uma exception se uma sequência de ações não iniciar num saque ou não finalizar num ponto ou erro', () => {
  const sequencia1 = [
    ' ',
    ' ',
    'B 8 A P 4,A 5 P A _,A 5 A P 5 P'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia1); }).toThrow('A sequência de ações deve começar por um saque | Linha [B 8 A P 4,A 5 P A _,A 5 A P 5 P]');

  const sequencia2 = [
    ' ',
    ' ',
    'B 8 S C 4,A 5 P A _'
  ];
  expect(() => { traduzirSequenciaDePontos(sequencia2); }).toThrow('A sequência de ações deve terminar num ponto ou num erro | Linha [B 8 S C 4,A 5 P A _]');
});
