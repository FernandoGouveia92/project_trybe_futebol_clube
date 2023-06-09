// ESTRUTURA DO RETORNO ESPERADO
/*
A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS!

vitoria = 3 pontos
derrota = 0 pontos
empate = 1 ponto

P = Total de Pontos
J = Total de Jogos

efficiency (%) formula = [P / (J * 3)] * 100
(com somente 2 casas depois da virgula)

Saldo de Gols (goalsBalance) com a formula = Gols marcados - Gols sofridos

Organizado de forma decrescente da quantidade de pontos

!! caso de empate desempatar com essas condições em ordem de prioridade:

1º Total de Vitórias;
2º Saldo de gols;
3º Gols a favor;
4º Gols sofridos;

-----------------------------------------------------------------------------

{
  "name": "Palmeiras",
  "totalPoints": 13,
  "totalGames": 5,
  "totalVictories": 4,
  "totalDraws": 1,
  "totalLosses": 0,
  "goalsFavor": 17,
  "goalsOwn": 5,
  "goalsBalance": 12,
  "efficiency": 86.67
}

-----------------------------------------------------------------------------

- `Classificação`: Posição na classificação;
- `Time`: Nome do time;
- `P`: Total de Pontos;
- `J`: Total de Jogos;
- `V`: Total de Vitórias;
- `E`: Total de Empates;
- `D`: Total de Derrotas;
- `GP`: Gols marcados a favor;
- `GC`: Gols sofridos;
- `SG`: Saldo total de gols;
- `%`: Aproveitamento do time.

*/

// PROCESSOS MENTAIS
// FAZENDO APENAS PARA --- HOME TEAMS ---

// BUSCAR DADOS DA TABELA DE TIMES (TEAMS) E DA TABELA DE PARTIDAS (MATCHES - ONDE --- inProgress = false ---) - TO DO - OK

// FAZER O UM FOREACH PARA TRAZER AS PARTIDAS DO TIME EM QUESTÃO ONDE, O ID ERA COMPATÍVEL COM O VALOR DE HOMETEAM - ASSIM TEMOS TODOS OS JOGOS QUE O TIME JOGOU - TO DO

// TENDO O ARRAY DE OBJECTOS DE CADA TIME, ENTÃO, EXTRAIR DADOS PARA REALIZAR OPERAÇÕES PARA MONTAR O OBJ QUE DEVE SER RETORNADO NO FINAL - CONTENDO OS DADOS QUE IRÃO COMPOR A LEADERBOARD

// GOALS HOME E GOALS AWAY SÃO AS INFORMAÇÕES MAIS IMPORTAJNTES - keep in mind

import Match from '../database/models/Match';
import Teams from '../database/models/Teams';
import { leaderboard } from '../interfaces';

export default class HomeLeaderboardService {
  private matchModel: Match;
  private teamsModel: Teams;
  private result: leaderboard[];
  constructor() {
    this.matchModel = new Match();
    this.teamsModel = new Teams();
    this.result = [];
  }

  filteredGamesHome = async (): Promise<leaderboard[]> => {
    const result = await this.findGamesHome();
    // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
    const filter = result.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) {
        return 1;
      } if (a.totalPoints > b.totalPoints) {
        return -1;
      }
      return this.firstFilter(a, b);
    });
    return filter;
  };

  firstFilter = (a:leaderboard, b: leaderboard) => {
    if (a.totalVictories < b.totalVictories) {
      return 1;
    } if (a.totalVictories > b.totalVictories) {
      return -1;
    }
    return this.secondFilter(a, b);
  };

  secondFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsBalance < b.goalsBalance) {
      return 1;
    } if (a.goalsBalance > b.goalsBalance) {
      return -1;
    }
    return this.thirdFilter(a, b);
  };

  thirdFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsFavor < b.goalsFavor) {
      return 1;
    } if (a.goalsFavor > b.goalsFavor) {
      return -1;
    }
    return this.finalFilter(a, b);
  };

  finalFilter = (a: leaderboard, b: leaderboard) => {
    if (a.goalsOwn < b.goalsOwn) {
      return 1;
    } if (a.goalsOwn > b.goalsOwn) {
      return -1;
    }
    return 0;
  };

  findGamesHome = async () => {
    // Detém todas as partidas finalizadas
    const finishedOnes = await Match.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    teams.forEach((team) => {
      // Essa constante (homeGame.length) detém o valor para ---TOTALGAMES---
      const homeGames = finishedOnes.filter((match) => match.homeTeam === team.id);
      // console.log(homeGame)
      // resto pode armazenar as regras de negócio - resto de resto dos dados que são necessários para retornar para o usuário
      const data = this.totalPoints(homeGames);
      const obj: leaderboard = { name: team.teamName, ...data };
      this.result.push(obj);
    });
    const finalResult = this.result;
    this.result = [];
    return finalResult;
  };

  totalPoints = (homeGames: Match[]): leaderboard => {
    // console.log(finishedOnes);
    // realocated to --- matchesOutcomeManager--- function, part of refactoring process
    // let totalVictories = 0;
    // let totalDraws = 0;
    // let totalLosses = 0;
    // realocated to ---goalsManager---  function, part of refactoring process
    // let goalsFavor = 0;
    // let goalsOwn = 0;

    // ===============================
    // realocated to --- matchesOutcomeManager--- function, part of refactoring process
    // homeGames.forEach((game) => {
    //   // realocated to ---goalsManager---  function, part of refactoring process
    //   // goalsFavor += game.homeTeamGoals;
    //   // goalsOwn += game.awayTeamGoals;
    //   if (game.homeTeamGoals > game.awayTeamGoals) {
    //     totalVictories += 1;
    //   } else if (game.awayTeamGoals > game.homeTeamGoals) {
    //     totalLosses += 1;
    //   } else {
    //     totalDraws += 1;
    //   }
    // });
    // ===============================

    // realocated to ---goalsManager---  function, part of refactoring process
    // const goalsBalance = goalsFavor - goalsOwn;
    // [P / (J * 3)] * 100
    const { goalsFavor, goalsOwn, goalsBalance } = this.goalsManager(homeGames);
    const { totalVictories, totalDraws, totalLosses } = this.matchesOutcomeManager(homeGames);
    const totalGames = homeGames.length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return {
      totalPoints,
      efficiency,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      // ============================
      // realocated to --- matchesOutcomeManager--- function, part of refactoring process
      // ===============================
      // realocated to ---goalsManager---  function, part of refactoring process
      // ================================

    };
  };

  goalsManager = (homeGames: Match[]) => {
    let goalsFavor = 0;
    let goalsOwn = 0;

    homeGames.forEach((game) => {
      goalsFavor += game.homeTeamGoals;
      goalsOwn += game.awayTeamGoals;
    });
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  };

  matchesOutcomeManager = (homeGames: Match[]) => {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    homeGames.forEach((game) => {
      if (game.homeTeamGoals > game.awayTeamGoals) {
        totalVictories += 1;
      } else if (game.awayTeamGoals > game.homeTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
      }
    });

    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  };
}
