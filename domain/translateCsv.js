const CODIGO_POSICAO_PARA_NOME_POSICAO = {
  C: 'Central',
  LE: 'Levantador',
  LI: 'Libero',
  O: 'Oposto',
  P: 'Ponteiro'
};

const ACOES = {
  A: 'Ataque',
  B: 'Bloqueio',
  C: 'Cobertura',
  D: 'Defesa',
  G: 'Bola de graça (para o próprio time)',
  P: 'Passe',
  PG: 'Passar de graça (para o outro lado)',
  S: 'Saque'
};

const VARIACAO_ABCN = {
  A: 'A',
  B: 'B',
  C: 'C',
  N: 'Não deu sequência no rally'
};

const VARIACOES = {
  A: {
    CH: 'China',
    CM: 'Chute meio',
    E: 'Extremidade - Explorando o bloqueio',
    L: 'Largada',
    MF: 'Meio fundo',
    P: 'Extremidade - Pancada',
    TC: 'Tempo cabeça',
    TCO: 'Tempo costas',
    TE: 'Tempo esquerda',
    SF: 'Saída fundo'
  },
  B: {
    A: 'Amorteceu para o próprio lado',
    V: 'Voltou para o outro lado'
  },
  C: VARIACAO_ABCN,
  D: VARIACAO_ABCN,
  G: VARIACAO_ABCN,
  P: VARIACAO_ABCN,
  S: {
    C: 'Curto',
    L: 'Longo',
    M: 'Meio da quadra'
  }
};

const RESULTADO_DA_ACAO = {
  E: 'Erro',
  P: 'Ponto'
};

const traduzirEscalacao = (linhaCsv) => {
  const numerosENome = linhaCsv.split(',');
  return numerosENome.map((v) => {
    const [numero, ...nome] = v.split(' ');
    return ({ numero, nome: nome.join(' ') });
  });
};

export const relacaoDeJogadores = (escalacao) => (
  {
    timeA: traduzirEscalacao(escalacao[0]),
    timeB: traduzirEscalacao(escalacao[1])
  }
);

const traduzirLinhaDeEscalacaoInicial = (linhaCsv) => {
  const numerosECodigosDaPosicao = linhaCsv.split(',');
  return numerosECodigosDaPosicao.map((numeroECodigoDaPosicao) => {
    const [numero, codigoDaPosicao] = numeroECodigoDaPosicao.split(' ');
    return { numero, posicao: CODIGO_POSICAO_PARA_NOME_POSICAO[codigoDaPosicao] };
  });
};

export const escalacoesIniciais = (sets) => (sets.map(set => {
  const [escalacaoInicialTimeA, escalacaoInicialTimeB] = set;
  return ({
    timeA: traduzirLinhaDeEscalacaoInicial(escalacaoInicialTimeA),
    timeB: traduzirLinhaDeEscalacaoInicial(escalacaoInicialTimeB)
  });
}));

const transformarParaInteiro = (string) => {
  try {
    return (parseInt(string, 10));
  } catch (_) {
    return false;
  }
};

export const traduzirAcao = (acaoCodificada) => {
  const [
    time,
    numero,
    codigoAcao,
    codigoVariacao,
    direcao,
    codigoResultado
  ] = acaoCodificada.split(' ');

  if (time !== 'A' && time !== 'B') {
    throw new TypeError(`${time} não é um código de time válido`);
  }

  if (numero !== '_' && !transformarParaInteiro(numero)) {
    throw new TypeError(`${numero} deve ser um número ou _`);
  }

  const acaoDecodificada = (codigoAcao === '_') ? '_' : ACOES[codigoAcao];

  if (!acaoDecodificada) {
    throw new TypeError(`${codigoAcao} não é um código de ação válido`);
  }

  const variacaoDecodificada = (codigoVariacao === '_') ? '_' : VARIACOES[codigoAcao][codigoVariacao];

  if (!variacaoDecodificada) {
    throw new TypeError(`${codigoVariacao} não é um código de variação válido para a ação de ${acaoDecodificada}`);
  }

  if (!['1', '2', '3', '4', '5', '6', '_'].includes(direcao)) {
    throw new TypeError('A direção deve ser uma posição da quadra ou _');
  }

  return ({
    time,
    numero,
    acao: acaoDecodificada,
    variacao: variacaoDecodificada,
    direcao,
    resultado: RESULTADO_DA_ACAO[codigoResultado] || 'Seguiu o rally'
  });
};

const traduzirAcaoDeSubstituicao = (linhaCsv) => {
  const [time, quemSai, quemEntra, posicaoDeQuemEntra] = linhaCsv.split(' ').slice(1);

  if (time !== 'A' && time !== 'B') {
    throw new TypeError(`${time} não é um código de time válido`);
  }

  if (!transformarParaInteiro(quemSai)) {
    throw new TypeError('A número de quem sai deve ser um número');
  }

  if (!transformarParaInteiro(quemEntra)) {
    throw new TypeError('A número de quem entra deve ser um número');
  }

  if (!CODIGO_POSICAO_PARA_NOME_POSICAO[posicaoDeQuemEntra]) {
    throw new TypeError(`${posicaoDeQuemEntra} não é um código de posição válido`);
  }

  return {
    time,
    acao: 'Substituição',
    quemSai,
    quemEntra,
    posicaoDeQuemEntra: CODIGO_POSICAO_PARA_NOME_POSICAO[posicaoDeQuemEntra]
  };
};

export const traduzirLinhaDoPonto = (linhaCsv) => {
  if (linhaCsv.startsWith('SUBS')) {
    return [traduzirAcaoDeSubstituicao(linhaCsv)];
  } else {
    const descricoesDasAcoes = linhaCsv.split(',');
    const acoesTraduzidas = descricoesDasAcoes.map(v => {
      try {
        return traduzirAcao(v);
      } catch ({ message }) {
        throw new TypeError(`${message} | Ação [${v}] | Linha [${linhaCsv}]`);
      }
    });

    if (acoesTraduzidas[0].acao !== 'Saque') {
      throw new TypeError(`A sequência de ações deve começar por um saque | Linha [${linhaCsv}]`);
    }

    if (acoesTraduzidas[acoesTraduzidas.length - 1].resultado !== 'Erro' && acoesTraduzidas[acoesTraduzidas.length - 1].resultado !== 'Ponto') {
      throw new TypeError(`A sequência de ações deve terminar num ponto ou num erro | Linha [${linhaCsv}]`);
    }

    return acoesTraduzidas;
  }
};

export const traduzirSequenciaDePontos = (set) => {
  const pontos = set.slice(2);
  return pontos.map(v => traduzirLinhaDoPonto(v));
};
