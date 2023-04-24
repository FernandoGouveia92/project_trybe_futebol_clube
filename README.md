# PROJETO TRYBE FUTEBOL CLUBE

Este projeto foi realizado durante o curso da Trybe, onde foi desenvolvido uma API rest para gerenciamento de um banco de dados de uma aplicação de acompanhamento de resultados de jogos de futebol. Neste projeto, o objetivo era desenvolver o back-end, pois o front-end foi providenciado pela Trybe. 

No back-end, em Typescript, foi estruturada API Rest, para realizar um CRUD completo, seguindo a arquitetura MSC (Model Service Controller) para melhor estruturar o fluxo das requisições. A camada do Controller é responsável apenas por receber as requests e enviar de volta as respostas, providas pelo Service, com status da resposta (Ex.: 404, 200, 201, 202). A camada do Service é responsável pelas regras de negócios, onde, caso hajam erros nos dados enviados, retorna um erro para a Controller, e caso não, envia a requisição para a Model. A Model, por sua vez, é responsável apenas por interagir com o DB, fazendo o CRUD propriamente dito, enviando dados de volta para a Service. 

A API conta, também com middlewares e com a ferramente de geração de token e autenticação, JWT.

---

#### O QUE FOI DESENVOLVIDO POR MIM

Todos os arquivos dentro da pasta /backend foram criados e desenvolvidos por mim. Todos os arquivos na parte de Front-end foram feitos pela Trybe.

---

#### O QUE FAZER PARA RODAR A API

Instalar dependências:
npm install

Inicializar servidor:
npm run dev

Para efetuar requests pode utilizar Postman ou Thunderclient (esta acessada direto pela IDE) ou, apenas inicializar a aplicação, e realizar as requisições, interagindo com a página.

---

#### ARQUIVOS E/OU DIRETÓRIOS FEITOS PELA TRYBE

Quaisquer outros arquivos/diretórios que fazem parte do projeto, foram providenciados pela Trybe School.

---

#### TECNOLOGIAS

NodeJS, Express, Typescript, JWT

#### BREVE DESCRIÇÃO

Neste projeto, foram aplicados conhecimentos sobre NodeJS, Express, Arquitetura Software MSC, Typescript e Docker
