import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import { Response } from 'superagent';

import teams from './mocks/mockedTeams'; // - mock de leadeboard
import Team from '../database/models/Teams'; //- model leaderboard (?)
import mockedTeams from './mocks/mockedTeams';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testes das requisições de TEAMS', () => {
  it('Requisições de /teams, trazendo todas as teams', async () => {
    const response = await chai.request(app).get('/teams').send();

    expect(response.status).to.be.equal(200);
  });
  it('Requisições de /teams/:id trazendo time por ID', async () => {
    const response = await chai.request(app).get('/teams/:id').send(
      {
      id: 1,
    },
    )

    expect(response.status).to.be.equal(200)
  });
  // it('', async () => {
    
  // });
});
