const CODIGO_POSICAO_PARA_NOME_POSICAO = {
  C: 'Central',
  LE: 'Levantador',
  LI: 'Libero',
  O: 'Oposto',
  P: 'Ponteiro'
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

export const escalacoesIniciais = (descricaoDoSet) => (descricaoDoSet.map(set => {
  const [escalacaoInicialTimeA, escalacaoInicialTimeB] = set;
  return ({
    timeA: traduzirLinhaDeEscalacaoInicial(escalacaoInicialTimeA),
    timeB: traduzirLinhaDeEscalacaoInicial(escalacaoInicialTimeB)
  });
}));
