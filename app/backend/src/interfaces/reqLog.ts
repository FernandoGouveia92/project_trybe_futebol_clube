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
