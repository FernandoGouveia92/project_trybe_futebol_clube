import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import { Response } from 'superagent';

import mockedTLeaderboards from './mocks/mocksLeaderboards'; // - mock de leadeboard
// import Team from '../database/models/Team'; - model leaderboard (?)

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testes das requisições de leaderboards', () => {
  it('Requisições de endpoint /leaderboard/home', async () => {
    const response = await chai.request(app).get('/leaderboard/home').send();

    expect(response.status).to.be.equal(200);
  });
  it('Requisições de enpoint /leaderboard/away', async () => {
    const response = await chai.request(app).get('/leaderboard/away').send();

    expect(response.status).to.be.equal(200);
  });
  it('Requisição de enpoint /leaderboard', async () => {
    const response = await chai.request(app).get('/leaderboard').send();

    expect(response.status).to.be.equal(200);
  });
});
