## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma IDE, como o [VSCode](https://code.visualstudio.com/)

## Passo a passo

Pelo terminal:

- Faça o clone do projeto em algum local da sua máquina. Exemplo: `user/projetos`
- Vá até a pasta que você acabou de clonar. Exemplo: `cd user/projetos/my-finances`
- Utilizando **npm** ou **yarn**, instale as dependências do projeto. Exemplo: execute o comando `yarn` ou `npm i`

## Configurando o banco de dados

- Crie sua conta gratuitamente no Mongo DB: https://www.mongodb.com/pt-br/cloud/atlas/register
- Crie um cluster
- Clique em drivers e copie a string de conexão
- Substitua a string de conexão no arquivo conn.js presente na pasta db, dentro do projeto, pela string copiada do Mongo DB, lembrando de manter o "${DB_USER}:${DB_PASS}"

## Variáveis de Ambiente - ENVS

- Copie o arquivo .env.exemple presente na pasta `configs`, cole na pasta `src`, renomeie para .env e substitua as informaçãoes.

## Agora, basta executar `yarn start` ou `npm start` e o projeto vai iniciar o sistema no seu navegador.
