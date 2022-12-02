export interface ReqLog {
  email: string,
  password: string,
}

export interface Progress {
  inProgress: string,
}

export interface NewMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface AlterMatch {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface leaderboard {
  name?: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}
