const filtrarAcoesPorTipo = (acoes, tipo) => acoes.filter(({ acao }) => acao === tipo);

const agruparPorTime = (dados) => Object.groupBy(dados, ({ time }) => time);

export const resumo = (sequenciaDePontos) => {
  const accInicial = {
    A: {
      PA: 0,
      PB: 0,
      PS: 0,
      PO: 0,
      EA: 0,
      EB: 0,
      ES: 0,
      EO: 0,
      Pontuação: 0
    },
    B: {
      PA: 0,
      PB: 0,
      PS: 0,
      PO: 0,
      EA: 0,
      EB: 0,
      ES: 0,
      EO: 0,
      Pontuação: 0
    }
  };

  const MAPEAMENTO = {
    Ponto: {
      Ataque: 'PA',
      Bloqueio: 'PB',
      Saque: 'PS',
      Xeque: 'PA',
      Outros: 'PO'
    },
    Erro: {
      Ataque: 'EA',
      Bloqueio: 'EB',
      Saque: 'ES',
      Xeque: 'EA',
      Outros: 'EO'
    }
  };

  const ultimaAcaoDeCadaPonto = sequenciaDePontos.map(v => v.slice(-1)[0]);

  return ultimaAcaoDeCadaPonto.reduce((acc, { acao, resultado, time }) => {
    if (acao === 'Substituição') {
      return acc;
    }

    const accClone = { ...acc };
    acao = acao || 'Outros';

    accClone[time][MAPEAMENTO[resultado][acao]] = accClone[time][MAPEAMENTO[resultado][acao]] + 1;

    if (resultado === 'Ponto') {
      accClone[time].Pontuação = accClone[time].Pontuação + 1;
    } else {
      const outroTime = time === 'A' ? 'B' : 'A';
      accClone[outroTime].Pontuação = accClone[outroTime].Pontuação + 1;
    }

    return accClone;
  }, accInicial);
};

const aproveitamentoGeralDeAtaqueDoTime = (acoesDeAtaqueDoTime) => {
  const histogramaAtaques = acoesDeAtaqueDoTime.reduce((acc, { resultado }) => {
    const accClone = { ...acc };
    accClone[resultado] = accClone[resultado] + 1;
    return accClone;
  }, { Erro: 0, Ponto: 0, 'Seguiu o rally': 0 });

  const eficiencia = 100 * (histogramaAtaques.Ponto / acoesDeAtaqueDoTime.length);

  return ({
    ...histogramaAtaques,
    ...{ Eficiência: `${eficiencia.toFixed(0)}%` }
  });
};

export const aproveitamentoGeralDeAtaque = (sequenciaDePontos) => {
  const acoesConcatenadas = sequenciaDePontos.reduce((acc, acoes) => acc.concat(acoes), []);
  const acoesDeAtaque = filtrarAcoesPorTipo(acoesConcatenadas, 'Ataque');

  const acoesDeAtaquePorTime = agruparPorTime(acoesDeAtaque);

  const A = aproveitamentoGeralDeAtaqueDoTime(acoesDeAtaquePorTime.A || []);
  const B = aproveitamentoGeralDeAtaqueDoTime(acoesDeAtaquePorTime.B || []);

  return ({ A, B });
};

const aproveitamentoGeralDeBloqueioDoTime = (bloqueios, ataquesAdversarios) => {
  const accInicial = {
    'Amorteceu para o próprio lado': 0,
    Erro: 0,
    'Não encostou na bola': 0,
    'Não especificado': 0,
    Ponto: 0,
    'Voltou para o outro lado': 0
  };
  const resultadoParcial = bloqueios.reduce((acc, { variacao, resultado }) => {
    const accClone = { ...acc };

    if (resultado === 'Erro' || resultado === 'Ponto') {
      accClone[resultado] = accClone[resultado] + 1;
    } else if (variacao === 'Amorteceu para o próprio lado' || variacao === 'Voltou para o outro lado') {
      accClone[variacao] = accClone[variacao] + 1;
    } else {
      accClone['Não especificado'] = accClone['Não especificado'] + 1;
    }

    return accClone;
  }, accInicial);

  const quantidadeDeAtaquesFortesDoAdversario = ataquesAdversarios.filter(({ variacao }) =>
    (variacao !== 'Caixinha' && variacao !== 'Largada' && variacao !== 'Largada')).length;

  resultadoParcial['Não encostou na bola'] = quantidadeDeAtaquesFortesDoAdversario - bloqueios.length;
  return resultadoParcial;
};

export const aproveitamentoGeralDeBloqueio = (sequenciaDePontos) => {
  const acoesConcatenadas = sequenciaDePontos.reduce((acc, acoes) => acc.concat(acoes), []);
  const acoesDeAtaque = filtrarAcoesPorTipo(acoesConcatenadas, 'Ataque');
  const acoesDeBloqueio = filtrarAcoesPorTipo(acoesConcatenadas, 'Bloqueio');
  const { A: acoesDeAtaqueA, B: acoesDeAtaqueB } = agruparPorTime(acoesDeAtaque);
  const { A: acoesDeBloqueioA, B: acoesDeBloqueioB } = agruparPorTime(acoesDeBloqueio);

  return ({
    A: aproveitamentoGeralDeBloqueioDoTime(acoesDeBloqueioA || [], acoesDeAtaqueB || []),
    B: aproveitamentoGeralDeBloqueioDoTime(acoesDeBloqueioB || [], acoesDeAtaqueA || [])
  });
};

const aproveitamentoGeralDePasseDoTime = (passes, saquesDoAdversario) => {
  const accInicial = {
    A: 0,
    B: 0,
    C: 0,
    'De graça pro outro lado': 0,
    'Erro ou ace do adversário': 0
  };

  const resultadoParcial = passes.reduce((acc, { variacao, resultado }) => {
    const accClone = { ...acc };

    if (resultado === 'erro') {
      accClone['Erro ou ace do adversário'] = accClone['Erro ou ace do adversário'] + 1;
    } else {
      accClone[variacao] = accClone[variacao] + 1;
    }

    return accClone;
  }, accInicial);

  const quantidadeDeAcesDoAdversario = saquesDoAdversario.filter(({ resultado }) => resultado === 'Ponto').length;

  resultadoParcial['Erro ou ace do adversário'] = resultadoParcial['Erro ou ace do adversário'] + quantidadeDeAcesDoAdversario;

  return resultadoParcial;
};

export const aproveitamentoGeralDePasse = (sequenciaDePontos) => {
  const acoesConcatenadas = sequenciaDePontos.reduce((acc, acoes) => acc.concat(acoes), []);
  const acoesDeSaque = filtrarAcoesPorTipo(acoesConcatenadas, 'Saque');
  const acoesDePasse = filtrarAcoesPorTipo(acoesConcatenadas, 'Passe');
  const { A: acoesDeSaqueA, B: acoesDeASaqueB } = agruparPorTime(acoesDeSaque);
  const { A: acoesDePasseA, B: acoesDePasseB } = agruparPorTime(acoesDePasse);

  return ({
    A: aproveitamentoGeralDePasseDoTime(acoesDePasseA || [], acoesDeASaqueB || []),
    B: aproveitamentoGeralDePasseDoTime(acoesDePasseB || [], acoesDeSaqueA || [])
  });
};

const aproveitamentoGeralDeDefesaPorTime = (defesas) => {
  const accInicial = {
    A: 0,
    B: 0,
    C: 0,
    'De graça pro outro lado': 0,
    Erro: 0
  };

  return defesas.reduce((acc, { variacao, resultado }) => {
    const accClone = { ...acc };

    if (resultado === 'erro') {
      accClone.Erro = accClone.Erro + 1;
    } else {
      accClone[variacao] = accClone[variacao] + 1;
    }

    return accClone;
  }, accInicial);
};

export const aproveitamentoGeralDeDefesa = (sequenciaDePontos) => {
  const acoesConcatenadas = sequenciaDePontos.reduce((acc, acoes) => acc.concat(acoes), []);
  const acoesDeDefesa = filtrarAcoesPorTipo(acoesConcatenadas, 'Defesa');
  const { A: acoesDeDefesaA, B: acoesDeDefesaB } = agruparPorTime(acoesDeDefesa);

  return ({
    A: aproveitamentoGeralDeDefesaPorTime(acoesDeDefesaA || []),
    B: aproveitamentoGeralDeDefesaPorTime(acoesDeDefesaB || [])
  });
};
