import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}
Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

// Match.belongsTo(Team, { foreignKey: 'home_team', as: 'homeTeam' });
// Match.belongsTo(Team, { foreignKey: 'away_team', as: 'awayTeam' });

// Team.hasMany(Match, { foreignKey: 'home_team', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'away_team', as: 'awayTeam' });

export default Teams;
