# stock-frontend
Uma aplicação utilizando React/Webpack/Redux/TypeScript/Semantic-UI... que tem o objetivo de consumir a API REST (stock-challenge) desenvolvida como desafio no processo seletivo.


###Instruções de uso:
Tenha Node.js e NPM instalados

Na raiz do projeto crie um arquivo chamado '.env' e insira a URL da API. Por exemplo:
```
URL = http://localhost:8080/stock_challenge_war_exploded/
```


Para instalar as dependências utilize:
```
yarn install
```

Para instalar globalmente a ferramenta gulp (necessária para build do Semantic-UI):
```
yarn global add gulp gulp-cli
```

Para o build do Semantic UI utilize:
```
cd semantic && gulp build
```

Para voltar para a raiz do projeto utilize:
```
cd ..
```

Para (finalmente) executar o projeto:
```
yarn run dev
```
