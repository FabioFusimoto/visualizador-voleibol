import jogos from '../../games/index';
import { relacaoDeJogadores, escalacoesIniciais } from '../translateCsv';

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
