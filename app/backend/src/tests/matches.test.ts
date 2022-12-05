import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import { Response } from 'superagent';

import Matches from '../database/models/Match';
import { mockedMatchesInProgress, matchForCreation, createdMatch } from '../tests/mocks/mockedMatches';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testes das requisições de MATCHES', () => {
  it('Requisições de /matches, trazendo todas as partidas', async () => {
    const response = await chai.request(app).get('/matches').send();

    expect(response.status).to.be.equal(200);
  });
  it('Requisições de /matches para mudar uma partida para finalizada', async () => {
    const response = await chai.request(app).patch('/matches/41/finish');

    expect(response.status).to.be.equal(200);
  });
  it('Requisições de /matches para alterar uma partida', async () => {
    const response = await chai.request(app).patch('/matches/41');

    expect(response.status).to.be.equal(200);
  });
});
