'use client';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import jogos from '../../games/index';
import {
  aproveitamentoGeralDeAtaque,
  aproveitamentoGeralDeBloqueio,
  aproveitamentoGeralDeDefesa,
  aproveitamentoGeralDePasse,
  resumo
} from '../../domain/statistics';
import { traduzirSequenciaDePontos } from '../../domain/translateCsv';
import TabelasEstatistica from '@/components/Estatisticas';

const SelectComNome = ({ nome, value, onChange, items, chaveValue, chaveNome }) => (
  <div>
    <Typography>
      {nome}
    </Typography>
    <Select
      value={value}
      onChange={onChange}
    >
      {items.map(item =>
        <MenuItem key={item.id} value={item[chaveValue]}>
          {item[chaveNome]}
        </MenuItem>
      )}
    </Select>
  </div>
);

export default function Estatisticas () {
  const estatisticasDisponiveis = [
    {
      nome: 'visao-geral',
      label: 'Visão geral'
    }
  ];

  const [idJogoSelecionado, setIdJogoSelecionado] = useState(0);
  const [jogoSelecionado, setJogoSelecionado] = useState(jogos[0]);
  const [setSelecionado, setSetSelecionado] = useState(0);
  const [estatisticaSelecionada, setEstatisticaSelecionada] = useState(estatisticasDisponiveis[0].nome);
  const [dadosEstatisticos, setDadoEstatisticos] = useState();

  const onIdJogoSelecionadoChanged = (e) => {
    setIdJogoSelecionado(e.target.value);
    setSetSelecionado(0);
  };

  useEffect(() => {
    const jogo = jogos.find(j => j.id === idJogoSelecionado);
    setJogoSelecionado(jogo);
  }, [idJogoSelecionado, jogos]);

  const onSetSelecionadoChanged = (e) => {
    setSetSelecionado(e.target.value);
  };

  const onEstatisticaSelecionadaChanged = (e) => {
    setEstatisticaSelecionada(e.target.value);
  };

  const onExibirEstatisticasClicked = () => {
    const sequenciaDePontos = traduzirSequenciaDePontos(jogoSelecionado.sets[setSelecionado]);
    switch (estatisticaSelecionada) {
      case 'visao-geral':
        setDadoEstatisticos({
          resumo: resumo(sequenciaDePontos),
          aproveitamentoGeralDeAtaque: aproveitamentoGeralDeAtaque(sequenciaDePontos),
          aproveitamentoGeralDeBloqueio: aproveitamentoGeralDeBloqueio(sequenciaDePontos),
          aproveitamentoGeralDeDefesa: aproveitamentoGeralDeDefesa(sequenciaDePontos),
          aproveitamentoGeralDePasse: aproveitamentoGeralDePasse(sequenciaDePontos)
        });
    }
  };

  return (
    <Box>
      <Typography variant='h2'>Estatísticas</Typography>
      <Paper>
        <Box alignContent='center' p={4} display='flex'>
          <SelectComNome
            nome='Jogo'
            value={idJogoSelecionado}
            onChange={onIdJogoSelecionadoChanged}
            items={jogos}
            chaveValue='id'
            chaveNome='nome'
          />
          <Box pl={2}>
            <SelectComNome
              nome='Set'
              value={setSelecionado}
              onChange={onSetSelecionadoChanged}
              items={jogoSelecionado?.sets.map((_, indice) => ({ indice, texto: `Set ${indice + 1}` }))}
              chaveValue='indice'
              chaveNome='texto'
            />
          </Box>
          <Box pl={2}>
            <SelectComNome
              nome='Estatísticas para visualizar'
              value={estatisticaSelecionada}
              onChange={onEstatisticaSelecionadaChanged}
              items={estatisticasDisponiveis}
              chaveValue='nome'
              chaveNome='label'
            />
          </Box>
          <Box alignContent='flex-end' pl={2}>
            <Button variant='contained' size='large' onClick={onExibirEstatisticasClicked}>
              Exibir
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box p={4}>
          <TabelasEstatistica dadosEstatisticos={dadosEstatisticos} />
        </Box>
      </Paper>
    </Box>
  );
}
