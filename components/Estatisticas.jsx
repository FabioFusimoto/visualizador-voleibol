import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

const TabelaVisaoGeral = ({ nomeTabela, cabecalho, linhas, dados }) => (
  <Box py={2}>
    <Typography variant='h6'>{nomeTabela}</Typography>
    <Box mt={2}>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              {cabecalho.map(nomeColuna => (
                <TableCell key={nomeColuna}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {nomeColuna}
                  </Typography>
                </TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {linhas.map(linha => (
              <TableRow key={linha}>
                <TableCell>{linha}</TableCell>
                <TableCell>{dados.A[linha]}</TableCell>
                <TableCell>{dados.B[linha]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>

);

const Estatisticas = ({ dadosEstatisticos }) => {
  const cabecalhoPadrao = ['Competência', 'Time A', 'Time B'];

  const resumoLinhas = [
    'PA',
    'PB',
    'PS',
    'PO',
    'EA',
    'EB',
    'ES',
    'EO',
    'Pontuação'
  ];

  const aproveitamentoGeralDeAtaqueLinhas = [
    'Ponto',
    'Erro',
    'Seguiu o rally'
  ];

  const aproveitamentoGeralDeBloqueioLinhas = [
    'Ponto',
    'Erro',
    'Amorteceu para o próprio lado',
    'Voltou para o outro lado',
    'Não encostou na bola',
    'Não especificado'
  ];

  const aproveitamentoGeralDePasseLinhas = [
    'A',
    'B',
    'C',
    'De graça pro outro lado',
    'Erro ou ace do adversário'
  ];

  const aproveitamentoGeralDeDefesaLinhas = [
    'A',
    'B',
    'C',
    'De graça pro outro lado',
    'Erro'
  ];

  if (!dadosEstatisticos) {
    return (<Typography variant='h4'>Nenhuma estatística para exibir</Typography>);
  }

  return (
    (dadosEstatisticos.resumo &&
        dadosEstatisticos.aproveitamentoGeralDeAtaque &&
        dadosEstatisticos.aproveitamentoGeralDeBloqueio &&
          <Box display='flex' justifyContent='space-between'>
            <Box mr={4}>
              <TabelaVisaoGeral
                nomeTabela='Pontos & Erros'
                cabecalho={cabecalhoPadrao}
                linhas={resumoLinhas}
                dados={dadosEstatisticos.resumo}
              />
            </Box>
            <Box mr={4}>
              <TabelaVisaoGeral
                nomeTabela='Ataques'
                cabecalho={cabecalhoPadrao}
                linhas={aproveitamentoGeralDeAtaqueLinhas}
                dados={dadosEstatisticos.aproveitamentoGeralDeAtaque}
              />
            </Box>
            <Box mr={4}>
              <TabelaVisaoGeral
                nomeTabela='Bloqueios'
                cabecalho={cabecalhoPadrao}
                linhas={aproveitamentoGeralDeBloqueioLinhas}
                dados={dadosEstatisticos.aproveitamentoGeralDeBloqueio}
              />
            </Box>
            <Box mr={4}>
              <TabelaVisaoGeral
                nomeTabela='Passes'
                cabecalho={cabecalhoPadrao}
                linhas={aproveitamentoGeralDePasseLinhas}
                dados={dadosEstatisticos.aproveitamentoGeralDePasse}
              />
            </Box>
            <Box mr={4}>
              <TabelaVisaoGeral
                nomeTabela='Defesas'
                cabecalho={cabecalhoPadrao}
                linhas={aproveitamentoGeralDeDefesaLinhas}
                dados={dadosEstatisticos.aproveitamentoGeralDeDefesa}
              />
            </Box>
          </Box>

    )
  );
};

export default Estatisticas;
